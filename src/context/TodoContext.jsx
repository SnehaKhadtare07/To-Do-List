// src/context/TodoContext.jsx
import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [uid, setUid] = useState(null);

  // lists: [{id, title, background}]
  const [lists, setLists] = useState([]);
  const [activeListIndex, setActiveListIndex] = useState(0);
  const [sortMode, setSortMode] = useState("created"); // "created" | "priority"

  // tasks for the active list only, injected into lists[activeListIndex].tasks
  const [activeTasks, setActiveTasks] = useState([]);

  // watch auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUid(u ? u.uid : null);
      setLists([]);
      setActiveTasks([]);
      setActiveListIndex(0);
    });
    return () => unsub();
  }, []);

  // subscribe to lists
  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, "users", uid, "lists"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => ({
        id: d.id,
        title: d.data().title || "Untitled",
        background: d.data().background || "default",
      }));
      setLists(arr);
      // keep active index in bounds
      setActiveListIndex((prev) => Math.min(prev, Math.max(0, arr.length - 1)));
    });
    return () => unsub();
  }, [uid]);

  // subscribe to tasks of the active list
  useEffect(() => {
    if (!uid || !lists.length) {
      setActiveTasks([]);
      return;
    }
    const list = lists[activeListIndex];
    if (!list) {
      setActiveTasks([]);
      return;
    }
    const tq = query(collection(db, "users", uid, "lists", list.id, "tasks"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(tq, (snap) => {
      const arr = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setActiveTasks(arr);
    });
    return () => unsub();
  }, [uid, lists, activeListIndex]);

  // helpers to read active list safely
  const activeListId = useMemo(() => lists[activeListIndex]?.id || null, [lists, activeListIndex]);

  // write ops
  const addList = async (title) => {
    if (!uid || !title.trim()) return;
    const ref = collection(db, "users", uid, "lists");
    const res = await addDoc(ref, {
      title,
      background: "default",
      createdAt: serverTimestamp(),
    });
    // move to the newly created list
    setActiveListIndex(lists.length);
    return res.id;
  };

  const deleteList = async (index) => {
    if (!uid) return;
    const list = lists[index];
    if (!list) return;

    // delete tasks first (client-side simple sweep)
    const tasksRef = collection(db, "users", uid, "lists", list.id, "tasks");
    const existing = await getDocs(tasksRef);
    await Promise.all(existing.docs.map((d) => deleteDoc(doc(db, "users", uid, "lists", list.id, "tasks", d.id))));

    await deleteDoc(doc(db, "users", uid, "lists", list.id));
    // local state will be updated by listener; adjust index
    setActiveListIndex((prev) => (index === prev && prev > 0 ? prev - 1 : 0));
  };

  const addTask = async (text, priority = "Medium") => {
    if (!uid || !activeListId || !text.trim()) return;
    const ref = collection(db, "users", uid, "lists", activeListId, "tasks");
    await addDoc(ref, {
      text,
      completed: false,
      priority,
      createdAt: serverTimestamp(),
    });
  };

  const toggleTask = async (taskIndex) => {
    if (!uid || !activeListId) return;
    const t = activeTasks[taskIndex];
    if (!t) return;
    await updateDoc(doc(db, "users", uid, "lists", activeListId, "tasks", t.id), {
      completed: !t.completed,
    });
  };

  const deleteTask = async (taskIndex) => {
    if (!uid || !activeListId) return;
    const t = activeTasks[taskIndex];
    if (!t) return;
    await deleteDoc(doc(db, "users", uid, "lists", activeListId, "tasks", t.id));
  };

  const editTask = async (taskIndex, newText) => {
    if (!uid || !activeListId) return;
    const t = activeTasks[taskIndex];
    if (!t) return;
    await updateDoc(doc(db, "users", uid, "lists", activeListId, "tasks", t.id), {
      text: newText,
    });
  };

  const changeSortMode = (mode) => setSortMode(mode);

  const changeBackground = async (background) => {
    if (!uid || !activeListId) return;
    await updateDoc(doc(db, "users", uid, "lists", activeListId), { background });
  };

  // stitch activeTasks back onto the active list for your existing UI
  const stitchedLists = useMemo(() => {
    if (!lists.length) return [];
    return lists.map((l, i) => (i === activeListIndex ? { ...l, tasks: activeTasks } : { ...l, tasks: [] }));
  }, [lists, activeListIndex, activeTasks]);

  return (
    <TodoContext.Provider
      value={{
        lists: stitchedLists,
        setLists: () => {}, // no-op; writes go through Firestore
        activeListIndex,
        setActiveListIndex,
        addList,
        deleteList,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        sortMode,
        changeSortMode,
        changeBackground,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

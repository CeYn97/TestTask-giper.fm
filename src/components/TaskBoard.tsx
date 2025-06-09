import React, { useEffect, useState } from "react";
import type { Task } from "../types/models";
import styles from "../styles/TaskBoard.module.css";
import { Button } from "./UI/Button";
import { Input } from "./UI/Input";

const storageKey = "tasks";

export const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) setTasks(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = () => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: text.trim(),
      done: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setText("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <section className={styles.taskSection}>
      <h2>Список дел</h2>
      <div className={styles.controls}>
        <Input
          placeholder="Новая задача"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && createTask()}
        />
        <Button label="Добавить" onClick={createTask} />
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? styles.done : ""}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              {task.title}
            </label>
            <button onClick={() => removeTask(task.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

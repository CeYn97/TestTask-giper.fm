import React, { useState } from "react";
import { TaskBoard } from "./components/TaskBoard";
import { PostsViewer } from "./components/PostsViewer";
import styles from "./styles/AppTabs.module.css";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"todo" | "posts">("todo");

  return (
    <main className={styles.container}>
      <h1>Тестовое задание для giper.fm</h1>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "todo" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("todo")}
        >
          Задачи
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "posts" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Посты
        </button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === "todo" ? <TaskBoard /> : <PostsViewer />}
      </div>
    </main>
  );
};

export default App;

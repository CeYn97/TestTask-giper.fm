import React, { useEffect, useState } from "react";
import type { Article } from "../types/models";
import styles from "../styles/PostsViewer.module.css";
import { Button } from "./UI/Button";

const postPerPage = 5;
const totalPosts = 100;
const totalPages = totalPosts / postPerPage;

export const PostsViewer: React.FC = () => {
  const [posts, setPosts] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);

  const postFetch = async (pageToLoad: number, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${postPerPage}&_page=${pageToLoad}`
      );
      if (!res.ok) throw new Error("Ошибка загрузки постов");

      const data: Article[] = await res.json();

      setPosts((prev) => (append ? [...prev, ...data] : data));

      if (append) {
        setLoadedPages((prev) => [...prev, pageToLoad]);
      } else {
        setLoadedPages([pageToLoad]);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    postFetch(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = Math.max(...loadedPages) + 1;
    if (nextPage <= totalPages) {
      postFetch(nextPage, true);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    postFetch(pageNumber, false);
  };

  return (
    <section className={styles.postsSection}>
      <h2>Посты пользователей</h2>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.table}>
        <div className={styles.rowHeader}>
          <span>User ID</span>
          <span>ID</span>
          <span>Заголовок</span>
          <span>Содержание</span>
        </div>

        {posts.map((post) => (
          <div key={post.id} className={styles.row}>
            <span>{post.userId}</span>
            <span>{post.id}</span>
            <span>{post.title}</span>
            <span>{post.body}</span>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        {Math.max(...loadedPages) < totalPages && (
          <Button
            label={loading ? "Загрузка..." : "Загрузить ещё"}
            onClick={handleLoadMore}
          />
        )}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handlePageClick(num)}
            className={`${styles.pageBtn} ${num === page ? styles.active : ""}`}
          >
            {num}
          </button>
        ))}
      </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { Post, fetchPosts } from "../services/api";

export function usePosts(perPage: number = 10) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function loadPosts(isRefreshing = false) {
    if (loading || (!isRefreshing && !hasMore)) {
      return;
    }

    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const targetPage = isRefreshing ? 1 : page;
      const fetchedPosts = await fetchPosts(targetPage, perPage);

      if (fetchedPosts.length < perPage) {
        setHasMore(false);
      }

      setPosts((prevPosts) => {
        if (isRefreshing) {
          return fetchedPosts;
        }
        return [...prevPosts, ...fetchedPosts];
      });

      if (isRefreshing) {
        setPage(2);
        setHasMore(true);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return {
    posts,
    loading,
    refreshing,
    error,
    loadMore: () => loadPosts(false),
    refresh: () => loadPosts(true),
  };
}

import { useEffect, useState } from "react";
import { User, fetchUserDetails } from "../services/api";

export function useUser(user_id: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      setError(null);
      try {
        const userData = await fetchUserDetails(user_id);
        setUser(userData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [user_id]);
  return { user, loading, error };
}

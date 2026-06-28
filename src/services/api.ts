const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}
export interface comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}
export async function fetchPosts(
  page: number = 1,
  perPage: number = 10,
): Promise<Post[]> {
  const response = await fetch(
    `${BASE_URL}/posts?page=${page}&per_page=${perPage}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}
export async function fetchPostDetails(postId: number): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post details");
  }
  return response.json();
}
const userCache = new Map<number, User>();

export async function fetchUserDetails(userId: number): Promise<User> {
  // Check cache first
  if (userCache.has(userId)) {
    return userCache.get(userId)!;
  }

  const response = await fetch(`${BASE_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  
  const data: User = await response.json();
  // Save to cache
  userCache.set(userId, data);
  
  return data;
}
export async function fetchComments(postId: number): Promise<comment[]> {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json();
}

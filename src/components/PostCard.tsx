import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useUser } from "../hooks/useUser";
import { Post } from "../services/api";
import Avatar from "./Avatar";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const { user, loading } = useUser(post.user_id);

  const handlePress = () => {
    router.push({
      pathname: "/PostDetails",
      params: {
        id: post.id.toString(),
        title: post.title,
        body: post.body,
        user_id: post.user_id.toString(),
      },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      // Adds a nice pressing animation: opacity becomes 0.95 when tapped
      className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-800/40 shadow-sm mb-4 active:opacity-95"
    >
      {/* 1. Header Row: Avatar + User Name */}
      <View className="flex-row items-center gap-3 mb-3">
        {loading ? (
          // Loading Skeleton: A gray circle and a gray text box
          <>
            <View className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full" />
            <View className="w-24 h-4 bg-slate-100 dark:bg-slate-700 rounded-md" />
          </>
        ) : (
          // Loaded State: Show real avatar and user name
          <>
            <Avatar name={user?.name || "User"} size={40} />
            <Text className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              {user?.name || "Anonymous"}
            </Text>
          </>
        )}
      </View>
      
      {/* 2. Post Title */}
      <Text className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1 leading-snug">
        {post.title}
      </Text>
      
      {/* 3. Post Body (preview, cut off at 3 lines) */}
      <Text className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4" numberOfLines={3}>
        {post.body}
      </Text>

      {/* 4. Action Row Footer */}
      <View className="flex-row items-center justify-between border-t border-slate-50 dark:border-slate-700/30 pt-3">
        <Text className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wider uppercase">
          Read Post
        </Text>
        <Text className="text-slate-400 dark:text-slate-500 text-sm">
          →
        </Text>
      </View>
    </Pressable>
  );
}

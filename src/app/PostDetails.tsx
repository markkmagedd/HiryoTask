import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { Comment, fetchComments } from "../services/api";
import { useUser } from "../hooks/useUser";
import Avatar from "../components/Avatar";
import CommentCard, { CommentSkeleton } from "../components/CommentCard";

export default function PostDetailsScreen() {
  // 1. Retrieve the post details passed from the Home screen
  const { id, title, body, user_id } = useLocalSearchParams<{
    id: string;
    title: string;
    body: string;
    user_id: string;
  }>();

  const postId = Number(id);
  const userId = Number(user_id);

  // 2. Fetch the author details of the post
  const { user: author, loading: authorLoading } = useUser(userId);

  // Theme settings
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // 3. States to fetch comments
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(true);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  // 4. Fetch the comments when the details page opens
  useEffect(() => {
    async function loadComments() {
      setCommentsLoading(true);
      setCommentsError(null);
      try {
        const data = await fetchComments(postId);
        setComments(data);
      } catch (err) {
        setCommentsError((err as Error).message);
      } finally {
        setCommentsLoading(false);
      }
    }

    loadComments();
  }, [postId]);

  // 5. This component renders the main post at the top of the comment list
  const renderPostHeader = () => (
    <View className="mb-6">
      {/* Post container */}
      <View className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/40 shadow-sm mb-6">
        {/* Author Header */}
        <View className="flex-row items-center gap-3 mb-4">
          {authorLoading ? (
            <>
              <View className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full" />
              <View className="w-24 h-4 bg-slate-100 dark:bg-slate-700 rounded-md" />
            </>
          ) : (
            <>
              <Avatar name={author?.name || "User"} size={48} />
              <View>
                <Text className="font-bold text-slate-800 dark:text-slate-100 text-base">
                  {author?.name || "Anonymous"}
                </Text>
                <Text className="text-slate-400 dark:text-slate-500 text-xs font-medium">
                  Author
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Post title and text */}
        <Text className="font-extrabold text-slate-900 dark:text-slate-50 text-xl mb-3 leading-snug">
          {title}
        </Text>
        <Text className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">{body}</Text>
      </View>

      {/* Section Divider/Header for comments */}
      <Text className="text-lg font-black text-slate-800 dark:text-slate-200 px-1 mb-3">
        Comments ({comments.length})
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-slate-50 dark:bg-slate-900"
      edges={["bottom", "left", "right"]}
    >
      <Stack.Screen 
        options={{
          headerStyle: {
            backgroundColor: isDark ? '#0f172a' : '#f8fafc',
          },
          headerTitleStyle: {
            color: isDark ? '#f8fafc' : '#0f172a',
          }
        }}
      />
      <FlatList
        data={commentsLoading ? [1, 2, 3] : comments}
        renderItem={({ item }) =>
          commentsLoading ? <CommentSkeleton /> : <CommentCard comment={item} />
        }
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        ListHeaderComponent={renderPostHeader}
        // Loader shown when comments are loading
        ListFooterComponent={null}
        // Empty state shown if a post has no comments
        ListEmptyComponent={
          !commentsLoading ? (
            <View className="py-8 justify-center items-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800/40 rounded-2xl p-6">
              <Text className="text-slate-400 dark:text-slate-500 text-sm font-semibold">
                No comments yet
              </Text>
              <Text className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                Be the first to start the discussion!
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

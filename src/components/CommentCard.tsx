import { Text, View } from "react-native";
import { Comment } from "../services/api";
import Avatar from "./Avatar";

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    // A nice padded container with a gray border to separate comments
    <View className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-800/40 mb-3">
      {/* Header: Avatar and Name */}
      <View className="flex-row items-center gap-3 mb-2">
        <Avatar name={comment.name} size={32} />
        {/* Smaller avatar for comments */}
        <View>
          <Text className="font-semibold text-gray-800 dark:text-slate-200 text-sm">
            {comment.name}
          </Text>
          <Text className="text-gray-400 dark:text-slate-400 text-xs">{comment.email}</Text>
        </View>
      </View>

      {/* Comment Body */}
      <Text className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed pl-1">
        {comment.body}
      </Text>
    </View>
  );
}

export function CommentSkeleton() {
  return (
    // Same container as CommentCard, but with a slate loading background
    <View className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-800/40 mb-3 opacity-60">
      {/* Header Skeleton Row */}
      <View className="flex-row items-center gap-3 mb-3">
        {/* Gray Circle for Avatar */}
        <View className="w-8 h-8 bg-slate-200 rounded-full" />

        {/* Gray Rectangles for Name and Email */}
        <View className="gap-1.5">
          <View className="w-24 h-3.5 bg-slate-200 rounded-md" />
          <View className="w-36 h-2.5 bg-slate-100 rounded-md" />
        </View>
      </View>

      {/* Body Skeleton Lines */}
      <View className="gap-1.5 pl-1">
        <View className="w-full h-3 bg-slate-100 rounded-md" />
        <View className="w-5/6 h-3 bg-slate-100 rounded-md" />
      </View>
    </View>
  );
}

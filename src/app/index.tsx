import React from 'react';
import { 
  ActivityIndicator, 
  FlatList, 
  Pressable, 
  Text, 
  View 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/PostCard';

export default function HomeScreen() {
  const { posts, loading, refreshing, error, loadMore, refresh } = usePosts();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Show a full-screen spinner if we are loading the very first page of posts
  if (loading && posts.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50 dark:bg-slate-900">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  // Show a full-screen error if the first fetch fails
  if (error && posts.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50 dark:bg-slate-900 p-4">
        <Text className="text-red-500 font-bold text-lg mb-2">Error loading posts</Text>
        <Text className="text-gray-500 text-center dark:text-slate-400">{error}</Text>
      </View>
    );
  }

  // Welcome Header component at the top of the feed list
  const renderHeader = () => (
    <View className="mb-6 mt-4 px-1">
      <Text className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
        Social Feed
      </Text>
      <Text className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
        See what's happening in your network today.
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900" edges={['bottom', 'left', 'right']}>
      {/* Configure the header dynamic toggle button */}
      <Stack.Screen 
        options={{
          headerRight: () => (
            <Pressable 
              onPress={toggleColorScheme} 
              className="p-2 mr-1 active:opacity-60"
            >
              <Text className="text-xl">
                {isDark ? '☀️' : '🌙'}
              </Text>
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: isDark ? '#0f172a' : '#f8fafc',
          },
          headerTitleStyle: {
            color: isDark ? '#f8fafc' : '#0f172a',
          }
        }}
      />
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        
        // 1. Pull-to-refresh setup
        refreshing={refreshing}
        onRefresh={refresh}
        
        // 2. Infinite scroll setup
        onEndReached={loadMore}
        onEndReachedThreshold={0.5} // Fetch page 2 when scrolled 50% from the bottom
        
        // 3. Small loading spinner at the bottom of the list when fetching next page
        ListFooterComponent={
          loading && posts.length > 0 ? (
            <View className="py-4 justify-center items-center">
              <ActivityIndicator size="small" color="#4f46e5" />
            </View>
          ) : null
        }
        
        // Styling padding inside the list
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

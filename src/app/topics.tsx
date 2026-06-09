import AnimatedCard from "@/src/components/AnimatedCard";
import AppText from "@/src/components/AppText";
import EmptyState from "@/src/components/EmptyState";
import ErrorScreen from "@/src/components/ErrorScreen";
import LoadingScreen from "@/src/components/LoadingScreen";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { goBack } from "expo-router/build/global-state/routing";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, useColorScheme, View } from "react-native";
import BackHeader from "../components/BackHeader";

const API_BASE = "https://notivra-backend.vercel.app/api/subjects";

function TopicCard({
  item,
  index,
  isDark,
  onPress,
}: {
  item: any;
  index: number;
  isDark: boolean;
  onPress: () => void;
}) {
  const iconColor = isDark ? "#7c86ff" : "#6366f1";

  return (
    <AnimatedCard index={index} onPress={onPress}>
      <View className="size-9 rounded-xl border items-center justify-center shrink-0 bg-indigo-50 border-indigo-100 dark:bg-zinc-800 dark:border-zinc-700">
        <AppText
          size="sm"
          weight="500"
          className="text-indigo-500 dark:text-indigo-400"
        >
          {String(index + 1).padStart(2, "0")}
        </AppText>
      </View>

      <View className="flex-1 min-w-0">
        <AppText
          tracking="tight"
          numberOfLines={1}
          className="text-[14px] leading-snug"
        >
          {item.topic}
        </AppText>
      </View>

      <View className="size-7 rounded-full items-center justify-center shrink-0 bg-indigo-50 dark:bg-zinc-800">
        <Ionicons name="arrow-forward" size={13} color={iconColor} />
      </View>
    </AnimatedCard>
  );
}

export default function Topics() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();
  const { subjectId, subjectName } = useLocalSearchParams();

  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayName = Array.isArray(subjectName)
    ? subjectName[0]
    : subjectName || "Topics";

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`${API_BASE}/${subjectId}/topics`);
      setTopics(data.topics);
    } catch {
      setError("Couldn't load topics.");
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) fetchTopics();
  }, [subjectId]);

  const onRefresh = useCallback(fetchTopics, []);

  const goToDetail = (topic: any) =>
    router.push({
      pathname: "/detail",
      params: {
        topicId: topic._id ?? topic.id,
        topicName: topic.topic,
        subjectId,
      },
    });

  if (loading && !topics.length && !error)
    return <LoadingScreen message="Loading topics…" />;
  if (error && !topics.length)
    return <ErrorScreen error={error} onRetry={fetchTopics} />;

  return (
    <ScreenWrapper>
      {/* Header */}
      <BackHeader
        title="Topics"
        name={displayName}
        onBack={goBack}
        topics={`${topics.length} topic${topics.length !== 1 ? "s" : ""}`}
      />

      {/* List or empty */}
      {topics.length === 0 ? (
        <EmptyState message="No topics found." />
      ) : (
        <FlatList
          data={topics}
          keyExtractor={(item, i) => item._id?.toString() ?? String(i)}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 48,
            gap: 10,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              tintColor={isDark ? "#7c86ff" : "#6366f1"}
            />
          }
          renderItem={({ item, index }) => (
            <TopicCard
              item={item}
              index={index}
              isDark={isDark}
              onPress={() => goToDetail(item)}
            />
          )}
        />
      )}
    </ScreenWrapper>
  );
}

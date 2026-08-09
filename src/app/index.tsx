import AnimatedCard from "@/src/components/AnimatedCard";
import AppText from "@/src/components/AppText";
import EmptyState from "@/src/components/EmptyState";
import ErrorScreen from "@/src/components/ErrorScreen";
import LoadingScreen from "@/src/components/LoadingScreen";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  useColorScheme,
  View,
} from "react-native";
import SearchBar from "../components/SearchBar";

const API_BASE = "https://notivra-backend.vercel.app/api/subjects";

function SubjectCard({
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
  const topicCount = item.document?.length ?? 0;
  const iconColor = isDark ? "#7c86ff" : "#6366f1";

  return (
    <AnimatedCard index={index} onPress={onPress}>
      <View className="size-10 rounded-xl border items-center justify-center shrink-0 bg-indigo-50 border-indigo-100 dark:bg-zinc-800 dark:border-zinc-700">
        <Ionicons name="layers-outline" size={18} color={iconColor} />
      </View>

      <View className="flex-1 min-w-0 pr-5">
        <AppText
          size="sm"
          weight="500"
          tracking="tight"
          numberOfLines={1}
          className="text-[14.5px]"
        >
          {item.subject}
        </AppText>
        <AppText color="secondary" className="text-[11.5px] mt-0.5">
          {topicCount} topic{topicCount !== 1 ? "s" : ""}
          {item.category ? ` · ${item.category}` : ""}
        </AppText>
      </View>

      <View className="size-7 rounded-full items-center justify-center shrink-0 bg-indigo-50 dark:bg-zinc-800">
        <Ionicons name="arrow-forward" size={13} color={iconColor} />
      </View>
    </AnimatedCard>
  );
}

export default function Index() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();

  const [subjects, setSubjects] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(API_BASE);
      setSubjects(data.subjects);
      setFiltered(data.subjects);
    } catch {
      setError("Couldn't reach the server.");
      setSubjects([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    setFiltered(
      q
        ? subjects.filter((s) => s.subject?.toLowerCase().includes(q))
        : subjects,
    );
  }, [query, subjects]);

  const goToTopics = (subject: any) =>
    router.push({
      pathname: "/topics",
      params: {
        subjectId: subject._id ?? subject.id,
        subjectName: subject.subject,
      },
    });

  if (loading && !subjects.length && !error)
    return <LoadingScreen message="Loading subjects…" />;
  if (error && !subjects.length)
    return <ErrorScreen error={error} onRetry={fetchSubjects} />;

  return (
    <ScreenWrapper>
      {/* Header */}
      <View className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 pt-14 px-5 pb-3">
        <View className="pb-3">
          <AppText
            color="primary"
            size="xs"
            weight="500"
            tracking="wide"
            uppercase
          >
            Notivra
          </AppText>

          <View className="flex-row items-center justify-between mb-1">
            <AppText size="lg" weight="600" tracking="tight">
              Your Subjects
            </AppText>
            <Pressable
              onPress={() => router.push("/info")}
              className="size-9 rounded-full items-center justify-center active:opacity-60 bg-indigo-50 dark:bg-zinc-800"
            >
              <Ionicons
                name="information-circle-outline"
                size={21}
                color={isDark ? "#7c86ff" : "#6366f1"}
              />
            </Pressable>
          </View>

          <AppText color="secondary" size="sm">
            Browse and explore your study materials
          </AppText>
        </View>

        {/* Search */}
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search subject"
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
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
            onRefresh={fetchSubjects}
            tintColor={isDark ? "#7c86ff" : "#6366f1"}
          />
        }
        ListEmptyComponent={
          <EmptyState
            message={
              query ? "No subjects match your search." : "No subjects found."
            }
          />
        }
        renderItem={({ item, index }) => (
          <SubjectCard
            item={item}
            index={index}
            isDark={isDark}
            onPress={() => goToTopics(item)}
          />
        )}
      />
    </ScreenWrapper>
  );
}

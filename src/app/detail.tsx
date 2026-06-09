import BackHeader from "@/src/components/BackHeader";
import DocView from "@/src/components/DocView";
import EmptyState from "@/src/components/EmptyState";
import ErrorScreen from "@/src/components/ErrorScreen";
import LoadingScreen from "@/src/components/LoadingScreen";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

const API_BASE = "https://notivra-backend.vercel.app/api/subjects";

export default function ShowDetail() {
  const router = useRouter();
  const { topicId, topicName, subjectId } = useLocalSearchParams();

  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayName = Array.isArray(topicName)
    ? topicName[0]
    : topicName || "Detail";
  const goBack = () => router.back();

  const fetchDoc = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(
        `${API_BASE}/${subjectId}/topics/${topicId}`,
      );
      setDoc(data.topic);
    } catch {
      setError("Couldn't load this topic.");
      setDoc(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (topicId && subjectId) fetchDoc();
  }, [topicId, subjectId]);

  if (loading && !error) {
    return (
      <ScreenWrapper>
        <BackHeader title={displayName} onBack={goBack} />
        <LoadingScreen message="Loading document…" />
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <BackHeader title={displayName} onBack={goBack} />
        <ErrorScreen error={error} onRetry={fetchDoc} />
      </ScreenWrapper>
    );
  }

  if (!doc?.url) {
    return (
      <ScreenWrapper>
        <BackHeader title={displayName} onBack={goBack} />
        <EmptyState
          message="This topic doesn't have a document attached yet."
          icon="document-outline"
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <BackHeader title={displayName} onBack={goBack} />
      <View className="h-px bg-indigo-500 opacity-60 rounded-full" />
      <View className="flex-1">
        <DocView file={doc.url} />
      </View>
    </ScreenWrapper>
  );
}

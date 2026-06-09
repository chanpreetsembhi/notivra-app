import { Ionicons } from "@expo/vector-icons";
import { Pressable, useColorScheme, View } from "react-native";
import AppText from "./AppText";

export default function ErrorScreen({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  const isDark = useColorScheme() === "dark";

  return (
    <View className="flex-1 items-center justify-center gap-3 p-8 bg-zinc-50 dark:bg-zinc-950">
      <View className="size-16 rounded-2xl border items-center justify-center mb-1 bg-red-50 border-red-200 dark:bg-zinc-800 dark:border-zinc-700">
        <Ionicons
          name="warning-outline"
          size={28}
          color={isDark ? "#f87171" : "#ef4444"}
        />
      </View>
      <AppText weight="500">Something went wrong</AppText>
      <AppText size="sm" color="secondary" center className="mt-1">
        {error}
      </AppText>
      <Pressable
        onPress={onRetry}
        className="mt-5 bg-indigo-600 rounded-xl py-3 px-8 active:bg-indigo-700"
      >
        <AppText size="sm" weight="600" tracking="wide" className="text-white">
          Try again
        </AppText>
      </Pressable>
    </View>
  );
}

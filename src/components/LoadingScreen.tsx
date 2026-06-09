import { ActivityIndicator, useColorScheme, View } from "react-native";
import AppText from "./AppText";

export default function LoadingScreen({
  message = "Loading…",
}: {
  message?: string;
}) {
  const isDark = useColorScheme() === "dark";

  return (
    <View className="flex-1 items-center justify-center gap-4 p-8 bg-zinc-50 dark:bg-zinc-950">
      <View className="size-16 rounded-2xl items-center justify-center bg-indigo-50 dark:bg-zinc-800">
        <ActivityIndicator
          size="large"
          color={isDark ? "#a5b4fc" : "#6366f1"}
        />
      </View>
      <AppText size="sm" color="secondary" className="mt-1">
        {message}
      </AppText>
    </View>
  );
}

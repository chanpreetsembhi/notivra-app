import { Ionicons } from "@expo/vector-icons";
import { Pressable, useColorScheme, View } from "react-native";
import AppText from "./AppText";

export default function BackHeader({
  title,
  name,
  topics,
  onBack,
}: {
  title: string;
  name?: string;
  topics?: string;
  onBack: () => void;
}) {
  const isDark = useColorScheme() === "dark";

  if (name) {
    return (
      <View className="px-5 pb-4 pt-14 flex-row items-center gap-3 bg-white border-b border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
        <Pressable
          onPress={onBack}
          className="size-9 rounded-full items-center justify-center active:opacity-60 bg-zinc-100 border border-zinc-200/50 dark:bg-zinc-800 dark:border-zinc-700"
        >
          <Ionicons
            name="chevron-back"
            size={19}
            color={isDark ? "#7c86ff" : "#6366f1"}
          />
        </Pressable>
        <View className="flex-1 flex-row items-center gap-2">
          <View className="flex-1 min-w-0 flex-col">
            <AppText
              size="xs"
              weight="500"
              color="secondary"
              tracking="wide"
              uppercase
              className="pt-0.5"
            >
              {title}
            </AppText>
            <AppText
              color="default"
              weight="500"
              tracking="tight"
              numberOfLines={1}
            >
              {name}
            </AppText>
          </View>
          <View className="shrink-0 flex-row items-center border rounded-full px-3 py-1.5 gap-1.5 bg-indigo-50 border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900">
            <View className="size-1.5 rounded-full bg-indigo-500" />
            <AppText color="primary" className="text-[11px]">
              {topics}
            </AppText>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="px-5 pt-14 pb-4 flex-row items-center gap-3 border-b bg-white border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
      <Pressable
        onPress={onBack}
        className="size-9 rounded-full items-center justify-center active:opacity-60 border bg-zinc-100 border-zinc-200/50 dark:bg-zinc-800 dark:border-zinc-700"
      >
        <Ionicons
          name="chevron-back"
          size={19}
          color={isDark ? "#7c86ff" : "#6366f1"}
        />
      </Pressable>
      <AppText
        size="sm"
        weight="500"
        color="secondary"
        tracking="wide"
        uppercase
        className="pt-0.5"
      >
        {title}
      </AppText>
    </View>
  );
}

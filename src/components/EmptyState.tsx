import { Ionicons } from "@expo/vector-icons";
import { useColorScheme, View } from "react-native";
import AppText from "./AppText";

export default function EmptyState({
  message = "Nothing found.",
  icon = "file-tray-outline",
}: {
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const isDark = useColorScheme() === "dark";

  return (
    <View className="pt-16 items-center gap-3">
      <View className="size-14 rounded-2xl items-center justify-center bg-zinc-100 dark:bg-zinc-800">
        <Ionicons
          name={icon}
          size={26}
          color={isDark ? "#a5b4fc" : "#6366f1"}
        />
      </View>
      <AppText size="sm" color="secondary">
        {message}
      </AppText>
    </View>
  );
}

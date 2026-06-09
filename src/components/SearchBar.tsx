import { cn } from "@/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
} from "react-native";

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  containerClassName?: string;
  inputClassName?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  containerClassName,
  inputClassName,
  ...props
}: SearchBarProps) {
  const isDark = useColorScheme() === "dark";
  const muted = isDark ? "#52525b" : "#a1a1aa";

  return (
    <View
      className={cn(
        "flex-row items-center mt-2 mb-1 rounded-xl border px-3.5 gap-2.5 bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800",
        containerClassName,
      )}
    >
      <Ionicons name="search-outline" size={17} color={muted} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={muted}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
        className={cn(
          "flex-1 py-3 text-sm text-zinc-900 dark:text-zinc-100",
          inputClassName,
        )}
        {...props}
      />

      {!!value && (
        <Pressable
          onPress={() => onChangeText("")}
          className="items-center justify-center active:opacity-60"
        >
          <Ionicons name="close-circle" size={18} color={muted} />
        </Pressable>
      )}
    </View>
  );
}

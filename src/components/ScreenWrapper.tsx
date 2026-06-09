import { useColorScheme, View } from "react-native";

export default function ScreenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDark = useColorScheme() === "dark";
  const bg = isDark ? "#09090b" : "#fafafa";

  return (
    <View className="flex-1" style={{ backgroundColor: bg }}>
      {children}
    </View>
  );
}

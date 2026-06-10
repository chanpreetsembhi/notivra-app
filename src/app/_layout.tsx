import "@/global.css";
import NetInfo from "@react-native-community/netinfo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, useColorScheme, View } from "react-native";

SplashScreen.preventAutoHideAsync();

function OfflineToast({ visible }: { visible: boolean }) {
  const translateY = useRef(new Animated.Value(-80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: visible ? 0 : -80,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  return (
    <Animated.View
      style={{ opacity, transform: [{ translateY }], pointerEvents: "none" }}
      className="absolute top-14 left-4 right-4 z-50 flex-row items-center gap-3 rounded-2xl bg-zinc-900 border border-zinc-700 px-4 py-3"
    >
      <View className="w-2 h-2 rounded-full bg-red-500" />
      <View className="flex-1">
        <Text
          className="text-zinc-100 text-[13px]"
          style={{ fontFamily: "Inter-600" }}
        >
          No internet connection
        </Text>
        <Text
          className="text-zinc-500 text-[11px] mt-0.5"
          style={{ fontFamily: "Inter-400" }}
        >
          Check your connection and try again
        </Text>
      </View>
    </Animated.View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const wasConnected = useRef<boolean | null>(true);
  const [offline, setOffline] = useState(false);

  const bg = isDark ? "#09090b" : "#fafafa";

  const [fontsLoaded, error] = useFonts({
    "Inter-400": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-500": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-600": require("@/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-700": require("@/assets/fonts/Inter-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((s) => {
      const ok = s.isConnected ?? true;
      if (wasConnected.current && !ok) setOffline(true);
      if (!wasConnected.current && ok) {
        setTimeout(() => setOffline(false), 1500);
      }
      wasConnected.current = ok;
    });

    return unsub;
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <View className="flex-1 bg-zinc-50 dark:bg-black">
        <StatusBar style={isDark ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: bg },
          }}
        />
        <OfflineToast visible={offline} />
      </View>
    </>
  );
}

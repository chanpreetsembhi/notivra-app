import { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";

export default function AnimatedCard({
  index,
  onPress,
  children,
}: {
  index: number;
  onPress: () => void;
  children: React.ReactNode;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 360,
        delay: index * 55,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 360,
        delay: index * 55,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatePressIn = () =>
    Animated.spring(scale, {
      toValue: 0.97,
      speed: 50,
      useNativeDriver: true,
    }).start();

  const animatePressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={animatePressIn}
        onPressOut={animatePressOut}
        className="flex-row items-center rounded-2xl border py-3.5 px-4 gap-3 overflow-hidden bg-white border-zinc-200/70 dark:bg-zinc-900 dark:border-zinc-800"
      >
        <View className="absolute left-0 top-3 bottom-3 w-0.75 rounded-r-full bg-indigo-500" />
        {children}
      </Pressable>
    </Animated.View>
  );
}

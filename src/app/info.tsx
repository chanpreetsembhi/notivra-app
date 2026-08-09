import AppText from "@/src/components/AppText";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { router } from "expo-router";
import { Image, View } from "react-native";
import BackHeader from "../components/BackHeader";

const META_TAGS = ["v1.0.0", "React Native"];

const goBack = () => router.back();

// ─── Sub-components ───
function AppName() {
  return (
    <View className="items-center gap-2">
      <AppText weight="600" tracking="tight" className="text-[32px]">
        Notivra
      </AppText>

      <View className="border rounded-full px-4 py-1.5 bg-indigo-50 border-indigo-100 dark:bg-indigo-500/10 dark:border-indigo-500/20">
        <AppText
          size="xs"
          color="primary"
          weight="500"
          tracking="wide"
          uppercase
          className="pb-0"
        >
          New Education Policy
        </AppText>
      </View>
    </View>
  );
}

function Divider() {
  return (
    <View className="w-12 h-px rounded-full bg-zinc-200 dark:bg-zinc-800" />
  );
}

function UnofficialBadge() {
  return (
    <View className="flex-row items-center gap-2 border rounded-lg px-4 py-2.5 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/60">
      <View className="size-2 rounded-full bg-amber-400" />
      <AppText size="xs" className=" text-amber-700 dark:text-amber-400 pb-0">
        Unofficial App
      </AppText>
    </View>
  );
}

function Description() {
  return (
    <View className="px-4">
      <AppText size="sm" color="secondary" center className="leading-5">
        A beautifully crafted notes companion for students following the New
        Education Policy curriculum.
      </AppText>
    </View>
  );
}

function Footer() {
  return (
    <View className="border-t pt-6 pb-10 gap-2 items-center border-zinc-200 dark:border-zinc-800">
      <AppText
        size="xs"
        color="secondary"
        weight="500"
        tracking="wide"
        uppercase
        className="mb-2"
      >
        About
      </AppText>

      <AppText className="text-sm text-zinc-500 dark:text-zinc-400">
        Created by{" "}
        <AppText
          size="sm"
          weight="500"
          className="text-zinc-900 dark:text-zinc-100"
        >
          Chanpreet Singh
        </AppText>
      </AppText>

      <View className="flex-row items-center gap-2 mt-2">
        {META_TAGS.map((label) => (
          <View
            key={label}
            className="border rounded-full px-3 py-1 bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
          >
            <AppText className="text-[11px] font-medium text-zinc-500 pb-0">
              {label}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Main Screen ───

export default function Info() {
  return (
    <ScreenWrapper>
      <View className="flex-1 justify-between">
        <BackHeader title="App Info" onBack={goBack} />

        {/* Center branding */}
        <View className="flex-1 items-center justify-center gap-4 pb-10 px-4">
          <View className="bg-indigo-600 rounded-3xl">
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 84, height: 84 }}
            />
          </View>
          <AppName />
          <Divider />
          <UnofficialBadge />
          <Description />
        </View>

        <Footer />
      </View>
    </ScreenWrapper>
  );
}

import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Image, TouchableOpacity, View } from "react-native";
import AppText from "./AppText";

type YoutubeCardProps = {
  videoId: string;
  title?: string;
};

export default function YoutubeCard({ videoId, title }: YoutubeCardProps) {
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => WebBrowser.openBrowserAsync(url)}
      className="w-full rounded-2xl overflow-hidden my-4 bg-black shadow-lg"
      style={{ aspectRatio: 16 / 9 }}
    >
      {/* Thumbnail */}
      <Image
        source={{ uri: thumbnail }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {/* Dark Overlay */}
      <View className="absolute inset-0 bg-black/30" />

      {/* Play Button - Center */}
      <View className="absolute inset-0 items-center justify-center">
        <View className="bg-red-600 w-17 h-12 rounded-xl items-center justify-center overflow-hidden">
          <View className="size-0 ml-1 border-l-18 border-t-11 border-b-11 border-l-white border-t-transparent border-b-transparent" />
        </View>
      </View>

      {/* Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-black/60 flex-row items-center px-3.5 py-3">
        {/* YouTube Icon */}
        <View className="bg-red-600 w-7 h-5 rounded-md items-center justify-center mr-2.5">
          <View className="size-0 ml-0.5 border-l-8 border-t-5 border-b-5 border-l-white border-t-transparent border-b-transparent" />
        </View>

        {/* Text */}
        <View className="flex-1">
          {title && (
            <AppText size="sm" numberOfLines={1} bold className="text-white">
              {title}
            </AppText>
          )}
          <AppText size="xs" className="text-white/80">
            Watch on Youtube
          </AppText>
        </View>

        {/* Arrow */}
        <AppText>
          <Ionicons
            name="arrow-up-right-box-outline"
            size={19}
            color={"#fff"}
          />
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

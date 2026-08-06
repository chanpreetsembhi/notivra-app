import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

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
      onPress={() => Linking.openURL(url)}
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
        <View className="bg-red-600 w-17 h-12 rounded-xl items-center justify-center">
          <View
            style={{
              width: 0,
              height: 0,
              marginLeft: 4,
              borderLeftWidth: 18,
              borderTopWidth: 11,
              borderBottomWidth: 11,
              borderLeftColor: "#fff",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
            }}
          />
        </View>
      </View>

      {/* Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-black/60 flex-row items-center px-3.5 py-3">
        {/* YouTube Icon */}
        <View className="bg-red-600 w-7 h-5 rounded-md items-center justify-center mr-2.5">
          <View
            style={{
              width: 0,
              height: 0,
              marginLeft: 2,
              borderLeftWidth: 8,
              borderTopWidth: 5,
              borderBottomWidth: 5,
              borderLeftColor: "#fff",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
            }}
          />
        </View>

        {/* Text */}
        <View className="flex-1">
          {title && (
            <Text
              className="text-white text-[13px] font-bold"
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
          <Text className="text-white/80 text-[11px] font-medium">
            Watch on YouTube
          </Text>
        </View>

        {/* Arrow */}
        <Text className="text-white text-lg font-bold ml-2">↗</Text>
      </View>
    </TouchableOpacity>
  );
}

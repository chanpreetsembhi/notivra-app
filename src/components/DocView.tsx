import { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import Markdown from "react-native-marked";
import AppText from "./AppText";
import LoadingScreen from "./LoadingScreen";

type DocViewProps = {
  file: string;
};

type DocState = "loading" | "error" | "ready";

const MARKDOWN_THEME = {
  spacing: { l: 24, xs: 5, s: 8, m: 10 },
};

const MARKDOWN_STYLES = {
  paragraph: { marginBottom: 24 },
  li: { marginBottom: 10 },
  h2: { fontSize: 22 },
};

function toRawGitHubUrl(url: string): string {
  return url
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob/", "/");
}

function isHtmlResponse(text: string): boolean {
  return text.includes("<html") && text.includes("</html>");
}

export default function DocView({ file }: DocViewProps) {
  const isDark = useColorScheme() === "dark";

  const [content, setContent] = useState("");
  const [state, setState] = useState<DocState>("loading");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setState("loading");
        const rawUrl = toRawGitHubUrl(file);
        const response = await fetch(rawUrl);

        if (!response.ok) throw new Error("Network response was not ok");

        const text = await response.text();

        if (isHtmlResponse(text))
          throw new Error("Received HTML instead of Markdown");

        setContent(text);
        setState("ready");
      } catch (error) {
        console.error("Failed to load markdown:", error);
        setContent("Error loading content.");
        setState("error");
      }
    };

    fetchMarkdown();
  }, [file]);

  if (state === "loading") {
    return <LoadingScreen message="Loading content…" />;
  }

  if (state === "error") {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <AppText size="sm" color="danger">
          {content}
        </AppText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <Markdown
        value={content}
        theme={MARKDOWN_THEME}
        styles={MARKDOWN_STYLES}
        flatListProps={{
          className: "p-4",
          contentContainerStyle: { paddingBottom: 20 },
        }}
      />
    </View>
  );
}

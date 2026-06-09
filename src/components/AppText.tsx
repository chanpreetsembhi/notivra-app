import { cn } from "@/utils/cn";
import { Text } from "react-native";

interface TextProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "heading";
  color?: "default" | "primary" | "secondary" | "danger";
  center?: boolean;
  className?: string;
  weight?: "400" | "500" | "600" | "700";
  bold?: boolean;
  uppercase?: boolean;
  tracking?: "tight" | "wide";
  numberOfLines?: number;
}

export default function AppText({
  children,
  size = "md",
  color = "default",
  center,
  weight = "400",
  bold,
  uppercase,
  tracking,
  numberOfLines,
  className,
}: TextProps) {
  const activeWeight = bold ? "700" : weight;

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      className={cn(
        size === "xs" && "text-[10px]",
        size === "sm" && "text-[13px]",
        size === "md" && "text-base",
        size === "lg" && "text-[26px]",
        size === "heading" && "text-3xl",
        color === "default" && "text-zinc-900 dark:text-zinc-100",
        color === "primary" && "text-indigo-600 dark:text-indigo-400",
        color === "secondary" && "text-zinc-500 dark:text-zinc-500",
        color === "danger" && "text-red-500 dark:text-red-400",
        tracking === "tight" && "tracking-tight",
        tracking === "wide" && "tracking-[3px]",
        center && "text-center",
        uppercase && "uppercase",
        "pb-0.5",
        className,
      )}
      style={{
        fontFamily: `Inter-${activeWeight}`,
      }}
    >
      {children}
    </Text>
  );
}

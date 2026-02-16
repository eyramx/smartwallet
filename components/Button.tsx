import { cn } from "@/lib/utils";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  className,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading || !onPress}
      className={cn(
        "w-full py-4 rounded-full items-center justify-center",
        isPrimary
          ? "bg-primary dark:bg-dark-primary"
          : "bg-secondary dark:bg-dark-surface",
        (disabled || loading || !onPress) && "opacity-50",
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#fff" : "#1A3B34"} />
      ) : (
        <Text
          className={cn(
            "text-lg font-semibold",
            isPrimary ? "text-white" : "text-text-dark dark:text-dark-text",
          )}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

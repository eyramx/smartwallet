import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  className?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  className,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View className={cn("mb-4", className)}>
      <Text className="text-text-dark dark:text-dark-text font-medium mb-2">
        {label}
      </Text>
      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className="bg-secondary dark:bg-dark-surface rounded-full px-6 py-4 text-text-dark dark:text-dark-text"
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4"
          >
            {showPassword ? (
              // @ts-ignore
              <EyeOff size={20} color="#6B7280" />
            ) : (
              // @ts-ignore
              <Eye size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

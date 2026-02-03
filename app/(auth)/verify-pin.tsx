import { Button } from "@/components/Button";
import { useRouter } from "expo-router"; // Fixed import
import { useRef, useState } from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function VerifyPinScreen() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleVerify = () => {
    const fullCode = code.join("");
    // Verify logic here
    router.push("/(auth)/reset-password");
  };

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 pt-12 pb-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-10 mb-8">
          <Text className="text-3xl font-bold text-text-dark text-center mb-4">
            Verify Code
          </Text>
          <Text className="text-text-gray text-center text-lg">
            Please enter the code we just sent to email
          </Text>
          <Text className="text-primary text-center text-lg font-medium mt-1">
            example@email.com
          </Text>
        </View>

        <View className="mb-8">
          <View className="flex-row justify-between mb-8 px-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <TextInput
                key={i}
                ref={(ref) => (inputs.current[i] = ref)}
                value={code[i]}
                onChangeText={(text) => handleChange(text, i)}
                keyboardType="number-pad"
                maxLength={1}
                className={`w-14 h-14 border rounded-2xl text-center text-2xl font-bold ${
                  code[i]
                    ? "border-primary bg-secondary/30 text-primary"
                    : "border-gray-200 text-text-dark"
                }`}
              />
            ))}
          </View>

          <Button
            title="Verify"
            onPress={handleVerify}
            variant="primary"
            className="mb-6"
          />

          <View className="flex-row justify-center">
            <Text className="text-text-gray mr-1">
              Didn't receive the code?
            </Text>
            <TouchableOpacity>
              <Text className="text-primary font-bold">Resend Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

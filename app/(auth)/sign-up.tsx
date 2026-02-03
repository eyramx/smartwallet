import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useSignUpEmailPassword } from "@nhost/react";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const { signUpEmailPassword, isLoading, isSuccess, isError, error } =
    useSignUpEmailPassword();

  const handleSignUp = async () => {
    const { fullName, email, password, confirmPassword, mobile, dob } =
      formData;

    if (!email || !password || !fullName) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const result = await signUpEmailPassword(email, password, {
      displayName: fullName,
      metadata: { mobile, dob },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      Alert.alert(
        "Success",
        "Account created successfully! Let's set up your wallet.",
        [
          {
            text: "Continue",
            onPress: () => router.replace("/onboarding/step-1"),
          },
        ],
      );
    }
    if (isError) {
      console.error("Sign up error details:", error);
      Alert.alert(
        "Sign Up Failed",
        error?.message || "An unknown error occurred",
      );
    }
  }, [isSuccess, isError, error]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 pt-12 pb-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mt-10 mb-8">
          <Text className="text-3xl font-bold text-text-dark text-center">
            Create Account
          </Text>
        </View>

        {/* Form */}
        <View className="mb-6">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            onChangeText={(text) =>
              setFormData({ ...formData, fullName: text })
            }
          />

          <Input
            label="Email"
            placeholder="example@example.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Mobile Number"
            placeholder="+ 123 456 789"
            value={formData.mobile}
            onChangeText={(text) => setFormData({ ...formData, mobile: text })}
            keyboardType="phone-pad"
          />

          <Input
            label="Date Of Birth"
            placeholder="DD / MM / YYYY"
            value={formData.dob}
            onChangeText={(text) => setFormData({ ...formData, dob: text })}
          />

          <Input
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            secureTextEntry
          />

          <Input
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
            secureTextEntry
          />

          {/* Terms */}
          <Text className="text-text-gray text-sm text-center mt-2 mb-6">
            By continuing, you agree to{" "}
            <Text className="text-text-dark font-semibold">Terms of Use</Text>{" "}
            and{" "}
            <Text className="text-text-dark font-semibold">Privacy Policy</Text>
            .
          </Text>

          {/* Sign Up Button */}
          <Button
            title={isLoading ? "Creating Account..." : "Sign Up"}
            onPress={handleSignUp}
            variant="primary"
            className="mb-8"
            disabled={isLoading}
          />

          {/* Login Link */}
          <View className="flex-row justify-center items-center mb-4">
            <Text className="text-text-gray">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className="text-primary font-bold">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

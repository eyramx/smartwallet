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

import { nhost } from "@/lib/nhost";

export default function SignUpScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",

    password: "",
    confirmPassword: "",
  });

  const { signUpEmailPassword, isLoading, isSuccess, isError, error } =
    useSignUpEmailPassword();

  // Sign out on mount to ensure clean state
  useEffect(() => {
    nhost.auth.signOut();
  }, []);

  const handleSignUp = async () => {
    console.log("Sign Up button pressed");
    console.log("Sign Up Form Data:", JSON.stringify(formData, null, 2));
    const { fullName, email, password, confirmPassword, mobile } = formData;

    if (!email || !password || !fullName) {
      const missing = [];
      if (!fullName) missing.push("Full Name");
      if (!email) missing.push("Email");
      if (!password) missing.push("Password");
      Alert.alert("Error", `Please fill in: ${missing.join(", ")}`);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      console.log("Calling signUpEmailPassword...");
      const result = await signUpEmailPassword(email, password, {
        displayName: fullName,
        metadata: { mobile },
      });
      console.log(
        "signUpEmailPassword result:",
        JSON.stringify(result, null, 2),
      );

      // Handle "already-signed-in" specifically if it returns a session (user is present)
      // We cast to any because the type definition might not reflect that error and user can coexist in this specific legacy/edge case
      const resultAny = result as any;
      if (
        resultAny.error &&
        resultAny.error.error === "already-signed-in" &&
        resultAny.user
      ) {
        console.log("User already signed in, treating as success.");
        Alert.alert(
          "Success",
          "Account created successfully! Let's set up your wallet.",
          [
            {
              text: "Continue",
              onPress: () => router.replace("/(tabs)"),
            },
          ],
        );
        return;
      }

      if (result.error) {
        console.error("Result contained error:", result.error);
        Alert.alert("Sign Up Error", result.error.message);
      }
    } catch (err) {
      console.error("signUpEmailPassword caught error:", err);
      Alert.alert("Error", "An unexpected error occurred during sign up.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Success detected, showing alert");
      Alert.alert(
        "Success",
        "Account created successfully! Let's set up your wallet.",
        [
          {
            text: "Continue",
            onPress: () => router.replace("/(tabs)"),
          },
        ],
      );
    }
    if (isError) {
      // If error is "already-signed-in", we might not need to show an alert if we handled it in handleSignUp
      // But the hook state `isError` will still be true.
      // We can check the error object here too but it might be redundant.
      // Let's rely on handleSignUp for the specific bypass logic.
      if (error?.error === "already-signed-in") return;

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
              setFormData((prev) => ({ ...prev, fullName: text }))
            }
          />

          <Input
            label="Email"
            placeholder="example@example.com"
            value={formData.email}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, email: text }))
            }
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Mobile Number"
            placeholder="+ 123 456 789"
            value={formData.mobile}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, mobile: text }))
            }
            keyboardType="phone-pad"
          />

          <Input
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, password: text }))
            }
            secureTextEntry
            autoCapitalize="none"
          />

          <Input
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, confirmPassword: text }))
            }
            secureTextEntry
            autoCapitalize="none"
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

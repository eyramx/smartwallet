import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Bell, Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteAccount = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    setShowConfirmModal(false);
    // TODO: Implement account deletion
    router.replace("/welcome");
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark text-xl font-bold">Delete Account</Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary rounded-t-3xl px-6 pt-8">
        <Text className="text-text-dark text-lg font-bold text-center mb-4">
          Are You Sure You Want To Delete Your Account?
        </Text>

        <View className="bg-white/30 rounded-2xl p-4 mb-6">
          <Text className="text-text-dark text-sm leading-6 mb-2">
            This action will permanently delete all of your data, and you will
            not be able to recover it. Please keep the following in mind before
            proceeding:
          </Text>
          <Text className="text-text-dark text-sm leading-6 mb-1">
            • All your expenses, income and associated transactions will be
            eliminated.
          </Text>
          <Text className="text-text-dark text-sm leading-6 mb-1">
            • You will not be able to access your account or any related
            information.
          </Text>
          <Text className="text-text-dark text-sm leading-6">
            • This action cannot be undone.
          </Text>
        </View>

        <Text className="text-text-dark text-base font-semibold text-center mb-4">
          Please Enter Your Password To Confirm Deletion Of Your Account.
        </Text>

        {/* Password Input */}
        <View className="mb-8">
          <View className="flex-row items-center bg-white/50 rounded-2xl px-4">
            <Text className="flex-1 text-2xl tracking-widest py-4">
              {showPassword ? password : "••••••••"}
            </Text>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color="#A8C5BC" />
              ) : (
                <Eye size={20} color="#A8C5BC" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Delete Account Button */}
        <TouchableOpacity
          className="bg-primary rounded-full py-4 mb-4"
          onPress={handleDeleteAccount}
        >
          <Text className="text-white text-center font-semibold text-base">
            Yes, Delete Account
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          className="bg-white/30 rounded-full py-4 mb-8"
          onPress={() => router.back()}
        >
          <Text className="text-text-dark text-center font-semibold text-base">
            Cancel
          </Text>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View className="flex-1 bg-black/50 items-center justify-center px-8">
          <View className="bg-white rounded-3xl p-8 w-full max-w-sm">
            <Text className="text-text-dark text-xl font-bold text-center mb-4">
              Delete Account
            </Text>
            <Text className="text-text-gray text-center mb-6">
              Are You Sure You Want To Log Out?
            </Text>
            <Text className="text-text-gray text-sm text-center mb-6">
              By deleting your account, you agree that you understand the
              consequences of this action and that you agree to permanently
              delete your account and all associated data.
            </Text>

            {/* Yes, Delete Account Button */}
            <TouchableOpacity
              className="bg-primary rounded-full py-4 mb-3"
              onPress={confirmDelete}
            >
              <Text className="text-white text-center font-semibold text-base">
                Yes, Delete Account
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              className="bg-secondary rounded-full py-4"
              onPress={() => setShowConfirmModal(false)}
            >
              <Text className="text-text-dark text-center font-semibold text-base">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

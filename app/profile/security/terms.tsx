import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Bell } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TermsScreen() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  return (
    <View className="flex-1 bg-primary dark:bg-dark-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark dark:text-white text-xl font-bold">
          Terms And Conditions
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white dark:bg-dark-surface rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary dark:bg-dark-bg rounded-t-3xl px-6 pt-8">
        <Text className="text-text-dark dark:text-dark-text text-xl font-bold mb-4">
          Est Fugiat Assumenda Aut Reprehenderit
        </Text>

        <Text className="text-text-dark dark:text-dark-text text-sm leading-6 mb-4">
          Lorem ipsum dolor sit amet. Et odio officia aut voluptate internos est
          omnis vitae ut architecto sunt non tenetur ut vel asperitate Quo ab
          asperiatur facere et consectetur ipsum et facere corrupti est
          asperiatur facere. Est fugiat assumenda aut reprehenderit voluptatem
          sed.
        </Text>

        <Text className="text-text-dark text-sm leading-6 mb-2">
          1. Ea voluptates omnis aut sequi sequi.
        </Text>
        <Text className="text-text-dark text-sm leading-6 mb-2">
          2. Est dolore in cliquid ducimus et qutem repellendus.
        </Text>
        <Text className="text-text-dark text-sm leading-6 mb-2">
          3. Aut ipsum Quis qui porro quasi aut minus placeat!
        </Text>
        <Text className="text-text-dark text-sm leading-6 mb-4">
          4. Sit consequatur neque non vitae facere.
        </Text>

        <Text className="text-text-dark text-sm leading-6 mb-4">
          Aut quidem accusantium nam alias autem eum officiis placeat et omnis
          autem id officiis perspiciatis qui corrupti officia eum aliquid cum
          providt nit. Eum voluptas error et optio dolorum cum molestiae nobis
          et odit molestiae quo magnam impedit sed fugiat nihil nihil vitae.
        </Text>

        <View className="mb-4">
          <Text className="text-text-dark text-sm leading-6 mb-1">
            • Aut fuga sequi eum voluptatibus providerit.
          </Text>
          <Text className="text-text-dark text-sm leading-6 mb-1">
            • Eos consequuntur voluptas vel amet eaque aut dignissimos velit.
          </Text>
        </View>

        <Text className="text-text-dark text-sm leading-6 mb-4">
          Vel exercitationem quam vel eligendi rerum At harum obbcaecati et
          nostrum beatae? Ea accusantium dolores qui nam aliquam nemo ipsa qui
          enim autem At corporis sunt. Aut odit quisquam est reprehenderit
          itaque fuga accusantium dolor qui neque repellat.
        </Text>

        <Text className="text-text-dark text-sm leading-6 mb-2">
          Read the terms and conditions in more detail at
        </Text>
        <Text className="text-primary text-sm font-semibold mb-6">
          www.finwiseapp.de
        </Text>

        {/* Checkbox */}
        <TouchableOpacity
          onPress={() => setAccepted(!accepted)}
          className="flex-row items-center mb-6"
          activeOpacity={0.7}
        >
          <View
            className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
              accepted
                ? "bg-primary border-primary"
                : "bg-transparent border-text-dark"
            }`}
          >
            {accepted && <Text className="text-white font-bold">✓</Text>}
          </View>
          <Text className="text-text-dark text-sm flex-1">
            I accept all the terms and conditions
          </Text>
        </TouchableOpacity>

        {/* Accept Button */}
        <TouchableOpacity
          className={`rounded-full py-4 mb-8 ${
            accepted ? "bg-primary" : "bg-gray-300"
          }`}
          onPress={() => accepted && router.back()}
          disabled={!accepted}
        >
          <Text
            className={`text-center font-semibold text-base ${
              accepted ? "text-white" : "text-gray-500"
            }`}
          >
            Accept
          </Text>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}

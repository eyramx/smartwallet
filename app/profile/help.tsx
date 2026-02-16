import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    ArrowLeft,
    Bell,
    ChevronDown,
    ChevronRight,
    Globe,
    Headphones,
    Instagram,
    MessageCircle,
} from "lucide-react-native";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

function ContactItem({ icon, label, onPress }: ContactItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-white/20 dark:border-dark-bg"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 rounded-full bg-primary dark:bg-dark-primary items-center justify-center mr-3">
          {icon}
        </View>
        <Text className="text-text-dark dark:text-dark-text text-base font-medium">
          {label}
        </Text>
      </View>
      <ChevronRight size={20} color="#1A3B34" />
    </TouchableOpacity>
  );
}

interface FAQItemProps {
  question: string;
  answer?: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      className="py-4 border-b border-white/20 dark:border-dark-bg"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-text-dark dark:text-dark-text text-sm font-medium flex-1 mr-2">
          {question}
        </Text>
        <ChevronDown
          size={20}
          color="#1A3B34"
          style={{
            transform: [{ rotate: expanded ? "180deg" : "0deg" }],
          }}
        />
      </View>
      {expanded && answer && (
        <Text className="text-text-gray dark:text-dark-text-secondary text-sm mt-2">
          {answer}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default function HelpScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="pt-12 pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-text-dark text-xl font-bold">Help & FAQS</Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="w-10 h-10 bg-white rounded-full items-center justify-center"
        >
          <Bell size={20} color="#1A3B34" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-secondary rounded-t-3xl px-6 pt-8">
        <Text className="text-text-dark text-center text-lg font-semibold mb-4">
          How Can We Help You?
        </Text>

        {/* Tab Buttons */}
        <View className="flex-row mb-6 bg-white/30 rounded-full p-1">
          <TouchableOpacity
            onPress={() => setActiveTab("faq")}
            className={`flex-1 py-3 rounded-full ${
              activeTab === "faq" ? "bg-primary" : ""
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === "faq" ? "text-white" : "text-text-dark"
              }`}
            >
              FAQ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("contact")}
            className={`flex-1 py-3 rounded-full ${
              activeTab === "contact" ? "bg-primary" : ""
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === "contact" ? "text-white" : "text-text-dark"
              }`}
            >
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category Tabs */}
        {activeTab === "faq" && (
          <View className="flex-row mb-4 gap-2">
            <TouchableOpacity className="px-4 py-2 bg-white/30 rounded-full">
              <Text className="text-text-dark text-sm">General</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-white/30 rounded-full">
              <Text className="text-text-dark text-sm">Account</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-white/30 rounded-full">
              <Text className="text-text-dark text-sm">Services</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Search Bar */}
        {activeTab === "faq" && (
          <TextInput
            className="bg-white rounded-2xl px-4 py-3 text-base text-text-dark mb-6 border-2 border-primary"
            placeholder="Search"
            placeholderTextColor="#A8C5BC"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        )}

        {/* FAQ List */}
        {activeTab === "faq" && (
          <View>
            <FAQItem
              question="How to use FinWise?"
              answer="FinWise is easy to use. Simply register, set your budget, and start tracking your expenses."
            />
            <FAQItem
              question="How much does it cost to use FinWise?"
              answer="FinWise offers both free and premium plans to suit your needs."
            />
            <FAQItem question="How to contact support?" />
            <FAQItem question="How can I reset my password if I forget it?" />
            <FAQItem question="Are there any privacy or data security measures in place?" />
            <FAQItem question="Can I customize settings within the application?" />
            <FAQItem question="How can I delete my account?" />
            <FAQItem question="How do I access my expense history?" />
            <FAQItem question="Can I use the app offline?" />
          </View>
        )}

        {/* Contact Us List */}
        {activeTab === "contact" && (
          <View>
            <ContactItem
              icon={<Headphones size={20} color="#ffffff" />}
              label="Customer Service"
              onPress={() => router.push("/profile/support")}
            />
            <ContactItem
              icon={<Globe size={20} color="#ffffff" />}
              label="Website"
              onPress={() => {}}
            />
            <ContactItem
              icon={<MessageCircle size={20} color="#ffffff" />}
              label="Facebook"
              onPress={() => {}}
            />
            <ContactItem
              icon={<MessageCircle size={20} color="#ffffff" />}
              label="Whatsapp"
              onPress={() => {}}
            />
            <ContactItem
              icon={<Instagram size={20} color="#ffffff" />}
              label="Instagram"
              onPress={() => {}}
            />
          </View>
        )}

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}

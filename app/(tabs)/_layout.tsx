import { Tabs } from "expo-router";
import { BarChart3, Home, Layers, List, User } from "lucide-react-native";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { useTheme } from "@/contexts/ThemeContext";

// Placeholder for IconSymbol if it's custom, otherwise using Lucide List for Transactions
// Benny used IconSymbol, Master uses Lucide. I'll use Lucide List for consistency if IconSymbol isn't imported.
// Wait, Benny imported IconSymbol? The diff showed <IconSymbol ... /> but didn't show import.
// I'll check imports again. If IconSymbol is missing, I'll use List from lucide-react-native.

export default function TabLayout() {
  const { isDarkMode } = useTheme();
  // TODO: Re-enable auth when backend is ready
  // const { isAuthenticated, isLoading } = useAuthenticationStatus();
  // if (isLoading) {
  //   return <View />;
  // }
  // if (!isAuthenticated) {
  //   return <Redirect href="/welcome" />;
  // }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? "#00D9A3" : "#02C38E",
        tabBarInactiveTintColor: isDarkMode ? "#A8C5BC" : "#6B7280",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#1A1F2E" : "#FFFFFF",
          borderTopColor: isDarkMode ? "#0F1419" : "#E5E7EB",
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => <List size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "Analysis",
          tabBarIcon: ({ color }) => <BarChart3 size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => <Layers size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

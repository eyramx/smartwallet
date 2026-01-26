import { NhostClient } from "@nhost/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const nhost = new NhostClient({
  subdomain: process.env.EXPO_PUBLIC_NHOST_SUBDOMAIN || "",
  region: process.env.EXPO_PUBLIC_NHOST_REGION || "",
  clientStorageType: "react-native",
  clientStorage: AsyncStorage,
});

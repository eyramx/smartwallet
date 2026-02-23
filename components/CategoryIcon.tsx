import {
    Briefcase,
    Car,
    Coffee,
    DollarSign,
    HeartPulse,
    Home,
    MoreHorizontal,
    ShoppingBag,
    Utensils,
    Zap,
} from "lucide-react-native";

const ICON_MAP: Record<string, any> = {
  Salary: Briefcase,
  Rent: Home,
  Groceries: ShoppingBag,
  Food: Utensils,
  Transport: Car,
  Health: HeartPulse,
  Utilities: Zap,
  Entertainment: Coffee,
  Other: MoreHorizontal,
  Income: DollarSign,
};

interface CategoryIconProps {
  iconName: string;
  color?: string;
  size?: number;
}

export function CategoryIcon({
  iconName,
  color = "#ffffff",
  size = 24,
}: CategoryIconProps) {
  const IconComponent = ICON_MAP[iconName] || MoreHorizontal;
  return <IconComponent size={size} color={color} />;
}

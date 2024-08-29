import { View } from "react-native";

interface ThemedViewProps {
    children: React.ReactNode;
    className?: string;
}

export default function ThemedView({
    children,
    className
}: ThemedViewProps) {

    return <View className={`bg-white dark:bg-slate-700 ${className}`}>{children}</View>
}
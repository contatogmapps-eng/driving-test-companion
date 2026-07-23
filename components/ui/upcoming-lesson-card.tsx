import type { LessonSummary } from "@/types/lessonSummary";
import { Pressable, Text } from "react-native";

type UpcomingLessonCardProps = LessonSummary & {
  onPress: () => void;
};
export default function UpcomingLessonCard({
  typeLabel,
  schedule,
  meetingPoint,
  onPress,
}: UpcomingLessonCardProps) {
  return (
    <Pressable
      className="mt-4 rounded-2xl bg-white p-5"
      accessibilityRole="button"
      onPress={onPress}
    >
      <Text className="text-sm font-semibold text-brand-500">{typeLabel}</Text>
      <Text className="mt-2 text-xl font-bold text-slate-900">{schedule}</Text>

      <Text className="mt-2 text-sm text-slate-500">
        Meeting point: {meetingPoint}
      </Text>
    </Pressable>
  );
}

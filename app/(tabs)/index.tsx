import PrimaryButton from "@/components/ui/primary-button";
import UpcomingLessonCard from "@/components/ui/upcoming-lesson-card";
import { useAuth } from "@/hooks/use-auth";
import { useLesson } from "@/hooks/use-lesson";
import type { LessonType } from "@/types/lesson";
import { formatLessonSchedule } from "@/utils/format-lesson-schedule";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const lessonTypeLabels: Record<LessonType, string> = {
  REGULAR: "REGULAR LESSON",
  EXTRA: "EXTRA LESSON",
  MOCK_TEST: "MOCK TEST",
  PRE_TEST: "PRE-TEST LESSON",
};

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const { isLessonLoading, upcomingLesson } = useLesson();

  const scheduleLabel = upcomingLesson
    ? formatLessonSchedule(upcomingLesson.scheduledAt)
    : null;
  async function handleSignOut() {
    await signOut();
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6">
          <Text className="text-sm text-slate-500">Welcome back</Text>

          <Text className="mt-1 text-3xl font-bold text-slate-900">
            {user?.name ?? "Driver"}
          </Text>

          <View className="mt-8 rounded-3xl bg-brand-900 p-6">
            <Text className="text-sm font-medium text-brand-50">
              NEXT DRIVING TEST
            </Text>

            <Text className="mt-4 text-2xl font-bold text-white">
              Not scheduled
            </Text>

            <Text className="mt-2 text-brand-50">
              Add your test date and centre to start your countdown.
            </Text>
          </View>
          <View className="mt-6">
            <Text className="text-xl font-bold text-slate-900">
              Upcoming lesson
            </Text>
            {isLessonLoading ? (
              <Text className="mt-4 text-sm text-slate-500">
                Loading lesson...
              </Text>
            ) : upcomingLesson && scheduleLabel ? (
              <UpcomingLessonCard
                typeLabel={lessonTypeLabels[upcomingLesson.type]}
                schedule={scheduleLabel}
                meetingPoint={upcomingLesson.meetingPoint}
                onPress={() => {
                  router.push({
                    pathname: "/lesson-details",
                    params: {
                      typeLabel: lessonTypeLabels[upcomingLesson.type],
                      schedule: scheduleLabel,
                      meetingPoint: upcomingLesson.meetingPoint,
                    },
                  });
                }}
              />
            ) : (
              <Text className="mt-4 text-sm text-slate-500">
                No upcoming lesson scheduled.
              </Text>
            )}
          </View>
          <View className="mt-6">
            <Text className="text-xl font-bold text-slate-900">
              Your progress
            </Text>

            <View className="mt-4 flex-row gap-4">
              <View className="flex-1 rounded-2xl bg-white p-5">
                <Text className="text-3xl font-bold text-brand-500">0</Text>

                <Text className="mt-2 text-sm text-slate-500">
                  Lessons completed
                </Text>
              </View>

              <View className="flex-1 rounded-2xl bg-white p-5">
                <Text className="text-3xl font-bold text-brand-500">0%</Text>

                <Text className="mt-2 text-sm text-slate-500">
                  Overall progress
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-8">
            <PrimaryButton title="Sign out" onPress={handleSignOut} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

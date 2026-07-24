import type { Lesson } from "@/types/lesson";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UPCOMING_LESSON_STORAGE_KEY = "@driving-test-companion:upcoming-lesson";

export async function saveUpcomingLesson(lesson: Lesson) {
  await AsyncStorage.setItem(
    UPCOMING_LESSON_STORAGE_KEY,
    JSON.stringify(lesson),
  );
}

export async function loadUpcomingLesson(): Promise<Lesson | null> {
  const storedLesson = await AsyncStorage.getItem(UPCOMING_LESSON_STORAGE_KEY);

  if (!storedLesson) return null;

  return JSON.parse(storedLesson) as Lesson;
}

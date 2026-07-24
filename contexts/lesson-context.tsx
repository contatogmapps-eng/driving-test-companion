import {
  loadUpcomingLesson,
  saveUpcomingLesson as persistUpcomingLesson,
} from "@/storage/lesson-storage";
import type { Lesson } from "@/types/lesson";
import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
export type LessonContextValue = {
  upcomingLesson: Lesson | null;
  isLessonLoading: boolean;
  saveUpcomingLesson: (lesson: Lesson) => Promise<void>;
};

export const LessonContext = createContext<LessonContextValue | null>(null);

export function LessonProvider({ children }: PropsWithChildren) {
  const [upcomingLesson, setUpcomingLesson] = useState<Lesson | null>(null);

  const [isLessonLoading, setIsLessonLoading] = useState(true);

  async function saveUpcomingLesson(lesson: Lesson) {
    await persistUpcomingLesson(lesson);
    setUpcomingLesson(lesson);
  }

  useEffect(() => {
    let isMounted = true;

    async function loadStoredLesson() {
      try {
        const storedLesson = await loadUpcomingLesson();

        if (isMounted) setUpcomingLesson(storedLesson);
      } catch (error) {
        console.error("Failed to load upcoming lesson", error);
      } finally {
        if (isMounted) setIsLessonLoading(false);
      }
    }
    loadStoredLesson();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <LessonContext
      value={{
        upcomingLesson,
        isLessonLoading,
        saveUpcomingLesson,
      }}
    >
      {children}
    </LessonContext>
  );
}

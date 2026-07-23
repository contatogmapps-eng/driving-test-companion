import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";

const ONBOARDING_STORAGE_KEY =
  "@driving-test-companion:has-completed-onboarding";

export type OnboardingContextValue = {
  hasCompletedOnboarding: boolean;
  isOnboardingLoading: boolean;
  completeOnboarding: () => Promise<void>;
};

export const OnboardingContext =
  createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: PropsWithChildren) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadOnboardingStatus() {
      try {
        const storedValue = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);

        if (isMounted) {
          setHasCompletedOnboarding(storedValue === "true");
        }
      } catch (error) {
        console.error("Failed to load onboarding status", error);
      } finally {
        if (isMounted) {
          setIsOnboardingLoading(false);
        }
      }
    }

    loadOnboardingStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  async function completeOnboarding() {
    await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
    setHasCompletedOnboarding(true);
  }

  return (
    <OnboardingContext
      value={{
        hasCompletedOnboarding,
        isOnboardingLoading,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext>
  );
}

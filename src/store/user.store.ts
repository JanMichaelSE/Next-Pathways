import { create } from "zustand";
import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from "zustand/middleware";

interface ScheduleStatus {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}

interface Schedule {
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
}

interface UserStoreState {
  accessToken: string;
  refreshToken: string;
  email: string;
  role: string;
  logoutTimeoutId: string;
  pictureData: string;
  refreshTokenError: object;
  isSubmitting: boolean;
  scheduleStatus: ScheduleStatus;
  schedule: Schedule;
}

interface UserStoreActions {
  setUser: (email: string, role: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setEmail: (email: string) => void;
  setPictureData: (pictureData: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setSchedule: (schedule: Schedule) => void;
  setScheduleStatus: (scheduleStatus: ScheduleStatus) => void;
  resetUser: () => void;
}

const vanillaUserStore = createStore<UserStoreState & UserStoreActions>()(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      email: "",
      role: "",
      logoutTimeoutId: "",
      pictureData: "",
      refreshTokenError: {},
      isSubmitting: false,
      scheduleStatus: {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      },
      schedule: {
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
      },
      setUser: (email, role) =>
        set({
          email: email,
          role: role,
        }),
      setTokens: (accessToken, refreshToken) => {
        set({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      },
      setEmail: (email) => {
        set({
          email: email,
        });
      },
      setPictureData: (pictureData) => {
        set({
          pictureData: pictureData,
        });
      },
      setIsSubmitting: (isSubmitting) => {
        set({
          isSubmitting: isSubmitting,
        });
      },
      setSchedule: (schedule) => {
        set({
          schedule: schedule,
        });
      },
      setScheduleStatus: (scheduleStatus) => {
        set({
          scheduleStatus: scheduleStatus,
        });
      },
      resetUser: () => {
        set({
          accessToken: "",
          refreshToken: "",
          email: "",
          role: "",
          logoutTimeoutId: "",
          pictureData: "",
          refreshTokenError: {},
          isSubmitting: false,
          schedule: {
            sunday: "",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
            saturday: "",
          },
          scheduleStatus: {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
          },
        });
      }
    }),
    { name: "user-storage", storage: createJSONStorage(() => sessionStorage) }
  )
);

const useUserStore = create(vanillaUserStore);
const { getState, setState } = vanillaUserStore;

export { useUserStore, getState, setState };

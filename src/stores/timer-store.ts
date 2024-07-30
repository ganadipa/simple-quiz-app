import { ITimerStore } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTimerStore = create(
  persist<ITimerStore>(
    (set) => ({
      targetTime: 0,
      setTargetTime: (time: number) => set({ targetTime: time }),
    }),
    { name: "timer" } // key for localStorage
  )
);

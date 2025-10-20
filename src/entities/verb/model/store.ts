import type { ApiSchemas } from "@/shared/api/schema";
import { shuffle } from "@/shared/lib/array";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface VerbStoreState {
  selectedVerbsIds: string[];
  setSelectedVerbsIds: (ids: string[]) => void;
  toggleVerbsId: (id: string) => void;
  clearSelectedVerbsIds: () => void;

  studyVerbs: ApiSchemas["Verb"][];
  generateRandomVerbs: (allVerbs: ApiSchemas["Verb"][]) => void;
}

export const useVerbStore = create<VerbStoreState>()(
  persist(
    (set, get) => ({
      selectedVerbsIds: [],
      studyVerbs: [],
      setSelectedVerbsIds: (ids) => set({ selectedVerbsIds: ids }),
      toggleVerbsId: (id) => {
        const { selectedVerbsIds } = get();
        set({
          selectedVerbsIds: selectedVerbsIds.includes(id)
            ? selectedVerbsIds.filter((i) => i !== id)
            : [...selectedVerbsIds, id],
        });
      },
      clearSelectedVerbsIds: () => set({ selectedVerbsIds: [] }),

      generateRandomVerbs: (allVerbs: ApiSchemas["Verb"][], amount = 10) => {
        const shuffled = shuffle([...allVerbs]);
        const randomVerbs = shuffled.slice(0, amount);
        set({ studyVerbs: randomVerbs });
      },
    }),
    { name: "verb-storage" }
  )
);

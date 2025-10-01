import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface VerbStoreState {
  selectedVerbsIds: string[];
  setSelectedVerbsIds: (ids: string[]) => void;
  toggleVerbsId: (id: string) => void;
  clearSelectedVerbsIds: () => void;
}

export const useVerbStore = create<VerbStoreState>()(
  persist(
    (set, get) => ({
      selectedVerbsIds: [],
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
    }),
    { name: "verb-storage" }
  )
);

import { create } from "zustand";

const useSearchStore = create((set) => ({
    services: "",
    setservices: (se) => set(() => ({ services: se })),

    subservices: "",
    setsubservices: (se) => set(() => ({ subservices: se })),

    area: "",
    setarea: (ar) => set(() => ({ area: ar })),
}));

export default useSearchStore;

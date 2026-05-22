import { create } from "zustand";

type State = {
  isLogin: boolean;
};

type Actions = {
  setIsLogin: (isLogin: boolean) => void;
};

const useStore = create<State & Actions>((set) => ({
  isLogin: false,

  setIsLogin: (isLogin) => set({ isLogin }),

}));

export default useStore;
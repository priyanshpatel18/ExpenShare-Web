import create from "zustand";

interface TransactionData {
  amount: string;
  category: string;
  title: string;
  notes: string;
  date: string;
  time: string;
  transactiontype: string;
}

interface TransactionDataState {
  data: TransactionData[];

  addData: (newData: TransactionData) => void;
}

export const transactionData = create<TransactionDataState>((set) => ({
  data: [],
  addData: (newData: TransactionData) => {
    set((state) => ({
      data: [newData, ...state.data],
    }));
  },
}));

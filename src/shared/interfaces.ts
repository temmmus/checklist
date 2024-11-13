export interface IItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface IItemInstance {
  $refs: {
    textInput: HTMLInputElement;
  };
  removeFocus: () => void;
}

export interface IFilter {
  status: "All" | "Active" | "Done";
}

export type TFilter = "All" | "Active" | "Done";

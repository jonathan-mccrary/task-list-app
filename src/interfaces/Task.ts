export interface Task {
  deadline: Date;
  description: string;
  category: Category;
  title: string;
  id: number;
  done: boolean;
  priority: Priority;
  createdDatetime: Date;
}

export enum Priority {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export enum Category {
  Home = "Home",
  Work = "Work",
  Other = "Other",
}

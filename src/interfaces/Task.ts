export enum Importance {
  High = 3,
  Medium = 2,
  Low = 1,
}

export enum Urgency {
  High = 3,
  Medium = 2,
  Low = 1,
}

export class Task {
  id: number;
  title: string;
  importance: Importance;
  urgency: Urgency;
  createdDatetime: Date;
  done: boolean;
  priority: number;

  constructor(
    id: number,
    title: string,
    importance: Importance,
    urgency: Urgency,
    createdDatetime: Date,
    done: boolean,
    priority: number
  ) {
    this.id = id;
    this.title = title;
    this.importance = importance;
    this.urgency = urgency;
    this.createdDatetime = createdDatetime;
    this.done = done;
    this.priority = priority;
  }
}

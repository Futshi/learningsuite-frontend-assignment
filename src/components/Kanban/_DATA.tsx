import { IKanbanList, IKanbanListItem } from "../../types/kanbanTypes";

export const DUMMY_DATA: IKanbanList[] = [
  {
    id: "kanban-one",
    items: [
      {
        id: "one",
        content: "first item",
      },
      {
        id: "two",
        content: "second item",
      },
      {
        id: "three",
        content: "third item",
      },
    ],
  },
  {
    id: "kanban-two",
    items: [
      {
        id: "four",
        content: "fourth item",
      },
      {
        id: "five",
        content: "fifth item",
      },
      {
        id: "six",
        content: "sixth item",
      },
    ],
  },
  {
    id: "kanban-three",
    items: [
      {
        id: "seven",
        content: "seventh item",
      },
      {
        id: "eight",
        content: "eighth item",
      },
      {
        id: "nine",
        content: "ninth item",
      },
    ],
  },
];

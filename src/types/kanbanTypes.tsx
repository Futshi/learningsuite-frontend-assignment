export interface IKanbanList {
  id: string;
  label: string;
  items: IKanbanItem[];
}

export interface IKanbanItem {
  id: string;
  content: string;
}

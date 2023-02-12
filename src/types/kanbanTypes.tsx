export interface IKanbanList {
  id: string;
  label: string;
  items: IKanbanListItem[];
}

export interface IKanbanNewList {
  id: string | undefined;
  label: string | undefined;
}

export interface IKanbanListItem {
  id: string;
  content: string | undefined;
}

export interface IKanbanNewListItem {
  id: string | undefined;
  content: string | undefined;
}

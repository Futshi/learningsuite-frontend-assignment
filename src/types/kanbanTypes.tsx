export interface IKanbanList {
  id: string;
  items: IKanbanListItem[];
}

export interface IKanbanListItem {
  id: string;
  content: string | undefined;
}

export interface IKanbanNewListItem {
  id: string | undefined;
  content: string | undefined;
}

export interface IKanbanAddListItem {
  kanbanId: string | undefined;
  kanbanListItem: IKanbanNewListItem;
}

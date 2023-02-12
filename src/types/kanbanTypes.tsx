export interface IKanban {
  id: string;
  label: string;
  items: IKanbanItem[];
}

export interface IKanbanNew {
  id: string | undefined;
  label: string | undefined;
}

export interface IKanbanItem {
  id: string;
  content: string | undefined;
}

export interface IKanbanItemNew {
  id: string | undefined;
  content: string | undefined;
}

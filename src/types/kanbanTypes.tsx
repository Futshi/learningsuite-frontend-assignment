/**
 * Kanban list interface
 * @param id ... unique kanban list id
 * @param label ... kanban list's label
 * @param items ... kanban list items
 */
export interface IKanbanList {
  id: string;
  label: string;
  items: IKanbanItem[];
}

/**
 * Kanban item interface
 * @param id ... unique kanban item id
 * @param content ... kanban item's content
 */
export interface IKanbanItem {
  id: string;
  content: string;
}

import { DraggableDescriptor } from "react-beautiful-dnd";

import { IKanban, IKanbanItem } from "../types/kanbanTypes";

export function reorderKanbanItem(
  list: IKanban | undefined,
  startIndex: number,
  endIndex: number
) {
  if (!list) {
    return;
  }
  const newItems: IKanbanItem[] = [...list.items];
  const [removed] = newItems.splice(startIndex, 1);
  newItems.splice(endIndex, 0, removed);

  return newItems;
}

export function moveKanbanItem(
  source: IKanban | undefined,
  destination: IKanban | undefined,
  droppableSource: DraggableDescriptor,
  droppableDestination: DraggableDescriptor
) {
  if (!source || !destination) {
    return;
  }

  const sourceClone: IKanbanItem[] = [...source.items];
  const destClone: IKanbanItem[] = [...destination.items];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
}

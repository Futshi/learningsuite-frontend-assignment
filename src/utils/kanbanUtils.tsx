import { DraggableDescriptor } from "react-beautiful-dnd";

import { IKanbanList, IKanbanListItem } from "../types/kanbanTypes";

export function reorderkanbanlistitem(
  list: IKanbanList | undefined,
  startIndex: number,
  endIndex: number
) {
  if (!list) {
    return;
  }
  const newItems: IKanbanListItem[] = [...list.items];
  const [removed] = newItems.splice(startIndex, 1);
  newItems.splice(endIndex, 0, removed);

  return newItems;
}

export function moveKanbanListItem(
  source: IKanbanList | undefined,
  destination: IKanbanList | undefined,
  droppableSource: DraggableDescriptor,
  droppableDestination: DraggableDescriptor
) {
  if (!source || !destination) {
    return;
  }

  const sourceClone: IKanbanListItem[] = [...source.items];
  const destClone: IKanbanListItem[] = [...destination.items];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
}

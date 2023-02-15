import { DraggableLocation, DropResult } from "react-beautiful-dnd";

import { IKanbanList, IKanbanItem } from "../types/kanbanTypes";

const reorderKanbanItem = (
  kanbanList: IKanbanList,
  startIndex: number,
  endIndex: number
): IKanbanItem[] | null => {
  if (!kanbanList) {
    return null;
  }
  const newItems: IKanbanItem[] = [...kanbanList.items];
  const [removed] = newItems.splice(startIndex, 1);
  newItems.splice(endIndex, 0, removed);

  return newItems;
};

const moveKanbanItem = (
  sourceKanbanList: IKanbanList,
  destinationKanbanList: IKanbanList,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): { [key: string]: IKanbanItem[] } => {
  const sourceClone: IKanbanItem[] = [...sourceKanbanList.items];
  const destClone: IKanbanItem[] = [...destinationKanbanList.items];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export function onKanbanItemDragEnd(
  kanbanData: IKanbanList[],
  result: DropResult
): IKanbanList[] | null {
  if (!result?.destination) {
    return null;
  }

  const sourceKanbanListLocation: DraggableLocation = result.source;
  const destinationKanbanListLocation: DraggableLocation = result.destination;

  const sourceKanbanList = kanbanData.find(
    (kanban) => kanban.id === sourceKanbanListLocation.droppableId
  );
  const destinationKanbanList = kanbanData.find(
    (kanban) => kanban.id === destinationKanbanListLocation.droppableId
  );

  if (sourceKanbanListLocation.droppableId === destinationKanbanListLocation.droppableId) {
    if (!sourceKanbanList) {
      throw new Error("Kanban.tsx > onDragEnd: Source kanban list not found");
    }
    // move item within list
    const reorderedKanbanItems = reorderKanbanItem(
      sourceKanbanList,
      sourceKanbanListLocation.index,
      destinationKanbanListLocation.index
    );
    const newKanbanData: IKanbanList[] = [...kanbanData];
    const kanbanList = newKanbanData.find(
      (kanban) => kanban.id === sourceKanbanListLocation.droppableId
    );
    if (!kanbanList || !reorderedKanbanItems) {
      throw new Error("Kanban.tsx > onDragEnd: Error");
    }
    kanbanList.items = reorderedKanbanItems;
    return newKanbanData;
  } else {
    // move item from one list to another
    if (!sourceKanbanList || !destinationKanbanList) {
      throw new Error("Kanban.tsx > onDragEnd: Source or destination kanban list not found");
    }
    const reorderedKanbanItems = moveKanbanItem(
      sourceKanbanList,
      destinationKanbanList,
      sourceKanbanListLocation,
      destinationKanbanListLocation
    );
    const newKanbanData: IKanbanList[] = [...kanbanData];
    const kanbanListSource = newKanbanData.find(
      (kanban) => kanban.id === sourceKanbanListLocation.droppableId
    );
    const kanbanListDestination = newKanbanData.find(
      (kanban) => kanban.id === destinationKanbanListLocation.droppableId
    );
    if (!kanbanListSource || !kanbanListDestination) {
      throw new Error("Kanban.tsx > onDragEnd: Error");
    }
    kanbanListSource.items = reorderedKanbanItems[sourceKanbanListLocation.droppableId];
    kanbanListDestination.items = reorderedKanbanItems[destinationKanbanListLocation.droppableId];
    return newKanbanData;
  }
}

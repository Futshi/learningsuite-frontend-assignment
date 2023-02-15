import { useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from "react-beautiful-dnd";

import KanbanList from "./KanbanList";
import KanbanItem from "./KanbanItem";
import NewKanbanListCard from "./NewKanbanListCard";

import { moveKanbanItem, reorderKanbanItem } from "../../utils/kanbanUtils";
import { IKanbanList, IKanbanItem } from "../../types/kanbanTypes";

import { DUMMY_DATA } from "./_DATA";

export default function Kanban() {
  const [kanbanData, setKanbanData] = useState<IKanbanList[]>(DUMMY_DATA);

  const onDragEnd = (result: DropResult) => {
    if (!result?.destination) return;

    const sourceKanbanList: DraggableLocation = result.source;
    const destinationKanbanList: DraggableLocation = result.destination;

    if (sourceKanbanList.droppableId === destinationKanbanList.droppableId) {
      // move item within list
      const reorderedKanbanItems = reorderKanbanItem(
        kanbanData.find((kanban) => kanban.id === sourceKanbanList.droppableId),
        sourceKanbanList.index,
        destinationKanbanList.index
      );
      const newKanbanData: IKanbanList[] = [...kanbanData];
      const kanbanList = newKanbanData.find(
        (kanban) => kanban.id === sourceKanbanList.droppableId
      );
      if (!kanbanList || !reorderedKanbanItems) {
        throw new Error("Kanban.tsx > onDragEnd: Error");
      }
      kanbanList.items = reorderedKanbanItems;
      setKanbanData(newKanbanData);
    } else {
      // move item from one list to another
      const reorderedKanbanItems = moveKanbanItem(
        kanbanData.find((kanban) => kanban.id === sourceKanbanList.droppableId),
        kanbanData.find(
          (kanban) => kanban.id === destinationKanbanList.droppableId
        ),
        sourceKanbanList,
        destinationKanbanList
      );
      const newKanbanData: IKanbanList[] = [...kanbanData];
      const kanbanListSource = newKanbanData.find(
        (kanban) => kanban.id === sourceKanbanList.droppableId
      );
      const kanbanListDestination = newKanbanData.find(
        (kanban) => kanban.id === destinationKanbanList.droppableId
      );
      if (!kanbanListSource || !kanbanListDestination) {
        throw new Error("Kanban.tsx > onDragEnd: Error");
        return;
      }
      kanbanListSource.items =
        reorderedKanbanItems[sourceKanbanList.droppableId];
      kanbanListDestination.items =
        reorderedKanbanItems[destinationKanbanList.droppableId];
      setKanbanData(newKanbanData);
    }
  };

  const onCreateKanbanItem = (
    kanbanListId: string,
    newKanbanItem: IKanbanItem
  ) => {
    if (
      kanbanData.some((kanban) =>
        kanban.items.some((item) => item.id === newKanbanItem.id)
      )
    ) {
      alert("Kanban.tsx > onSaveAddKanbanListItem: id already exists!");
      return false;
    }

    const newKanbanData = [...kanbanData];
    const kanbanList = newKanbanData.find((list) => list.id === kanbanListId);
    if (!kanbanList) {
      throw new Error("Kanban.tsx > onCreateKanbanItem: Kanban list not found");
    }

    kanbanList.items.splice(kanbanList.items.length, 0, newKanbanItem);
    setKanbanData(newKanbanData);
    return true;
  };

  const onSaveKanbanList = (newKanbanList: IKanbanList) => {
    if (kanbanData.some((kanban) => kanban.id === newKanbanList.id)) {
      alert("Kanban.tsx > onSaveAddKanbanList: id already exists!");
      return false;
    }

    setKanbanData([...kanbanData, newKanbanList]);
    return true;
  };

  const onKanbanItemDelete = (kanbanId: string, kanbanItemId: string) => {
    const newKanbanData = [...kanbanData];
    const newModifiedKanban = newKanbanData.find(
      (list) => list.id === kanbanId
    );
    if (!newModifiedKanban) {
      throw new Error("Kanban.tsx > onKanbanItemDelete: Kanban item not found");
    }

    const removeIndex: number = newModifiedKanban.items.findIndex(
      (item) => item.id === kanbanItemId
    );
    if (removeIndex < 0) {
      return false;
    }

    newModifiedKanban.items.splice(removeIndex, 1);
    setKanbanData(newKanbanData);
  };

  return (
    <div className="Kanban">
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ paddingBottom: 4 }}>
          <Stack spacing={2} margin={5} direction="row">
            {kanbanData?.map(
              (kanbanList: IKanbanList, kanbanListIndex: number) => (
                <KanbanList
                  key={`kanban-${kanbanListIndex}`}
                  kanbanList={kanbanList}
                  onCreateKanbanItem={onCreateKanbanItem}
                  onDeleteKanbanList={(kanbanId: string) =>
                    setKanbanData(
                      kanbanData.filter((kanban) => kanban.id !== kanbanId)
                    )
                  }
                >
                  {kanbanList.items.map(
                    (kanbanItem: IKanbanItem, kanbanItemIndex: number) => (
                      <KanbanItem
                        kanbanItemData={kanbanItem}
                        index={kanbanItemIndex}
                        key={`kanban-item-${kanbanItemIndex}`}
                        onDeleteKanbanItem={() =>
                          onKanbanItemDelete(kanbanList.id, kanbanItem.id)
                        }
                      />
                    )
                  )}
                </KanbanList>
              )
            )}
            <NewKanbanListCard onSave={onSaveKanbanList} />
          </Stack>
        </Box>
      </DragDropContext>
    </div>
  );
}

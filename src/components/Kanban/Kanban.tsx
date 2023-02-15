import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import KanbanList from "./KanbanList";
import KanbanItem from "./KanbanItem";
import NewKanbanListCard from "./NewKanbanListCard";

import { onKanbanItemDragEnd } from "../../utils/kanbanUtils";
import { IKanbanList, IKanbanItem } from "../../types/kanbanTypes";

import { DUMMY_DATA } from "./_DATA";

export default function Kanban() {
  const [kanbanData, setKanbanData] = useState<IKanbanList[]>(DUMMY_DATA);

  /**
   * Function to handle release of drag item, modifying the kanban data to be rendered
   * @param result DropResult object provided by react-beautiful-dnd
   * @returns
   */
  const onDragEnd = (result: DropResult): void => {
    if (!result?.destination) return;
    const newKanbanData = onKanbanItemDragEnd(kanbanData, result);
    if (newKanbanData) {
      setKanbanData(newKanbanData);
    }
  };

  /**
   * Function to create new kanban item
   * @param kanbanListId Kanban list id where the new kanban item is stored
   * @param newKanbanItem Kanban item to be created
   * @returns true on successful operation, otherwise false
   */
  const onCreateKanbanItem = (kanbanListId: string, newKanbanItem: IKanbanItem): boolean => {
    if (kanbanData.some((kanban) => kanban.items.some((item) => item.id === newKanbanItem.id))) {
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

  /**
   * Function to create new kanban list
   * @param newKanbanList Kanban list to be created
   * @returns true on successful operation, otherwise false
   */
  const onCreateKanbanList = (newKanbanList: IKanbanList): boolean => {
    if (kanbanData.some((kanban) => kanban.id === newKanbanList.id)) {
      alert("Kanban.tsx > onSaveAddKanbanList: id already exists!");
      return false;
    }

    setKanbanData([...kanbanData, newKanbanList]);
    return true;
  };

  /**
   * Funtion to delete kanban item
   * @param kanbanListId Id of kanban list containing the kanban item
   * @param kanbanItemId Id of kanban item
   * @returns true on successful operation, otherwise false
   */
  const onKanbanItemDelete = (kanbanListId: string, kanbanItemId: string): boolean => {
    const newKanbanData = [...kanbanData];
    const newModifiedKanban = newKanbanData.find((list) => list.id === kanbanListId);
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
    return true;
  };

  return (
    <div className="Kanban">
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ paddingBottom: 4 }}>
          <Stack spacing={2} margin={5} direction="row">
            {kanbanData?.map((kanbanList: IKanbanList, kanbanListIndex: number) => (
              <KanbanList
                key={`kanban-${kanbanListIndex}`}
                kanbanList={kanbanList}
                onCreateKanbanItem={onCreateKanbanItem}
                onDeleteKanbanList={(kanbanId: string) =>
                  setKanbanData(kanbanData.filter((kanban) => kanban.id !== kanbanId))
                }
              >
                {kanbanList.items.map((kanbanItem: IKanbanItem, kanbanItemIndex: number) => (
                  <KanbanItem
                    kanbanItemData={kanbanItem}
                    index={kanbanItemIndex}
                    key={`kanban-item-${kanbanItemIndex}`}
                    onDeleteKanbanItem={() => onKanbanItemDelete(kanbanList.id, kanbanItem.id)}
                  />
                ))}
              </KanbanList>
            ))}
            <NewKanbanListCard onCreateKanbanList={onCreateKanbanList} />
          </Stack>
        </Box>
      </DragDropContext>
    </div>
  );
}

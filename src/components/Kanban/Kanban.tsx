import { useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";

import KanbanList from "./KanbanList";
import KanbanItem from "./KanbanItem";
import NewKanbanListItemModal from "./NewKanbanListItemModal";
import NewKanbanListCard from "./NewKanbanListCard";

import {
  moveKanbanListItem,
  reorderkanbanlistitem,
} from "../../utils/kanbanUtils";
import { IKanbanList, IKanbanListItem } from "../../types/kanbanTypes";

import { DUMMY_DATA } from "./_DATA";

export default function Kanban() {
  const [addItemKanbanId, setAddItemKanbanId] = useState<string | null>(null);
  const [kanbanData, setKanbanData] = useState<IKanbanList[]>(DUMMY_DATA);

  useEffect(() => {
    console.log("Kanban data", kanbanData);
  }, [kanbanData]);

  const onDragEnd = (result: any) => {
    const { source, destination }: { source: any; destination: any } = result;

    if (!result.destination) {
      return;
    }

    const sourceIndex: string = source.droppableId;
    const destinationIndex: string = destination.droppableId;

    // move item within list
    if (sourceIndex === destinationIndex) {
      const reorderedKanbanListItems = reorderkanbanlistitem(
        kanbanData.find((kanban) => kanban.id === sourceIndex),
        source.index,
        destination.index
      );
      const newKanbanData: IKanbanList[] = [...kanbanData];
      const newKanbanListData = newKanbanData.find(
        (kanban) => kanban.id === sourceIndex
      );
      if (!newKanbanListData || !reorderedKanbanListItems) {
        // throw err
        return;
      }
      newKanbanListData.items = reorderedKanbanListItems;
      setKanbanData(newKanbanData);
      // move item from one list to another
    } else {
      const reorderedKanbanListItems = moveKanbanListItem(
        kanbanData.find((kanban) => kanban.id === sourceIndex),
        kanbanData.find((kanban) => kanban.id === destinationIndex),
        source,
        destination
      );
      const newKanbanData: IKanbanList[] = [...kanbanData];
      const newKanbanListDataSource = newKanbanData.find(
        (kanban) => kanban.id === sourceIndex
      );
      const newKanbanListDataDestination = newKanbanData.find(
        (kanban) => kanban.id === destinationIndex
      );
      if (!newKanbanListDataSource || !newKanbanListDataDestination) {
        // throw err
        return;
      }
      newKanbanListDataSource.items = reorderedKanbanListItems[sourceIndex];
      newKanbanListDataDestination.items =
        reorderedKanbanListItems[destinationIndex];
      //setKanbanData(newKanbanData.filter((kanban) => kanban.items.length));
      setKanbanData(newKanbanData);
    }
  };

  const onSaveAddKanbanListItem = (
    kanbanListItemId: string,
    kanbanListItemContent: string
  ) => {
    // check if item already exists
    if (
      kanbanData.some((kanban) =>
        kanban.items.some((item) => item.id === kanbanListItemId)
      )
    ) {
      alert("Kanban.tsx > onSaveAddKanbanListItem: id already exists!");
      return;
    } else {
      // add
      const newKanbanData = [...kanbanData];
      const newKanbanListData = newKanbanData.find(
        (list) => list.id === addItemKanbanId
      );
      if (!newKanbanListData) {
        // throw err
        return;
      }
      newKanbanListData.items.splice(newKanbanListData.items.length, 0, {
        id: kanbanListItemId,
        content: kanbanListItemContent,
      });
      setKanbanData(newKanbanData);
      setAddItemKanbanId(null);
    }
  };

  const onSaveAddKanbanList = (
    kanbanListId: string,
    kanbanListLabel: string
  ) => {
    // check if kanban already exists
    if (kanbanData.some((kanban) => kanban.id === kanbanListId)) {
      alert("Kanban.tsx > onSaveAddKanbanList: id already exists!");
      return false;
    } else {
      setKanbanData([
        ...kanbanData,
        { id: kanbanListId, label: kanbanListLabel, items: [] },
      ]);
      return true;
    }
  };

  const onKanbanListItemDelete = (
    kanbanId: string,
    kanbanListItemId: string
  ) => {
    const newKanbanData = [...kanbanData];
    const newKanbanListData = newKanbanData.find(
      (list) => list.id === kanbanId
    );
    if (!newKanbanListData) {
      // throw err
      return;
    }

    const removeIndex: number = newKanbanListData.items.findIndex(
      (item) => item.id === kanbanListItemId
    );
    if (removeIndex < 0) {
      return;
    }

    newKanbanListData.items.splice(removeIndex, 1);
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
                  id={kanbanList.id}
                  label={kanbanList.label}
                  key={`kanban-list-${kanbanListIndex}`}
                  onAddItemClick={() => setAddItemKanbanId(kanbanList.id)}
                  onDeleteKanbanList={(kanbanId: string) =>
                    setKanbanData(
                      kanbanData.filter((kanban) => kanban.id !== kanbanId)
                    )
                  }
                >
                  {kanbanList.items.map(
                    (
                      kanbanListItem: IKanbanListItem,
                      kanbanListItemIndex: number
                    ) => (
                      <KanbanItem
                        id={kanbanListItem.id}
                        index={kanbanListItemIndex}
                        key={`kanban-list-item-${kanbanListItemIndex}`}
                        onDelete={(kanbanListItemId) =>
                          onKanbanListItemDelete(
                            kanbanList.id,
                            kanbanListItemId
                          )
                        }
                      >
                        {kanbanListItem.content}
                      </KanbanItem>
                    )
                  )}
                </KanbanList>
              )
            )}
            <NewKanbanListCard onSave={onSaveAddKanbanList} />
          </Stack>
        </Box>
      </DragDropContext>
      <NewKanbanListItemModal
        kanbanId={addItemKanbanId}
        onClose={() => setAddItemKanbanId(null)}
        onSave={onSaveAddKanbanListItem}
      />
    </div>
  );
}

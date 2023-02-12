import { useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";

import KanbanList from "./KanbanList";
import KanbanItem from "./KanbanItem";
import NewKanbanItemModal from "./NewKanbanItemModal";
import NewKanbanCard from "./NewKanbanCard";

import { moveKanbanItem, reorderKanbanItem } from "../../utils/kanbanUtils";
import { IKanban, IKanbanItem } from "../../types/kanbanTypes";

import { DUMMY_DATA } from "./_DATA";

export default function Kanban() {
  const [addItemKanbanId, setAddItemKanbanId] = useState<string | null>(null);
  const [kanbanData, setKanbanData] = useState<IKanban[]>(DUMMY_DATA);

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
      const reorderedKanbanItems = reorderKanbanItem(
        kanbanData.find((kanban) => kanban.id === sourceIndex),
        source.index,
        destination.index
      );
      const newKanbanData: IKanban[] = [...kanbanData];
      const newKanbanListData = newKanbanData.find(
        (kanban) => kanban.id === sourceIndex
      );
      if (!newKanbanListData || !reorderedKanbanItems) {
        // throw err
        return;
      }
      newKanbanListData.items = reorderedKanbanItems;
      setKanbanData(newKanbanData);
    } else {
      // move item from one list to another
      const reorderedKanbanItems = moveKanbanItem(
        kanbanData.find((kanban) => kanban.id === sourceIndex),
        kanbanData.find((kanban) => kanban.id === destinationIndex),
        source,
        destination
      );
      const newKanbanData: IKanban[] = [...kanbanData];
      const newKanbanDataSource = newKanbanData.find(
        (kanban) => kanban.id === sourceIndex
      );
      const newKanbanDataDestination = newKanbanData.find(
        (kanban) => kanban.id === destinationIndex
      );
      if (!newKanbanDataSource || !newKanbanDataDestination) {
        // throw err
        return;
      }
      newKanbanDataSource.items = reorderedKanbanItems[sourceIndex];
      newKanbanDataDestination.items = reorderedKanbanItems[destinationIndex];
      //setKanbanData(newKanbanData.filter((kanban) => kanban.items.length)); // remove kanban if empty
      setKanbanData(newKanbanData);
    }
  };

  const onSaveAddKanbanListItem = (
    kanbanItemId: string,
    kanbanItemContent: string
  ) => {
    // check if item already exists
    if (
      kanbanData.some((kanban) =>
        kanban.items.some((item) => item.id === kanbanItemId)
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
        id: kanbanItemId,
        content: kanbanItemContent,
      });
      setKanbanData(newKanbanData);
      setAddItemKanbanId(null);
    }
  };

  const onSaveAddKanbanList = (kanbanId: string, kanbanLabel: string) => {
    // check if kanban already exists
    if (kanbanData.some((kanban) => kanban.id === kanbanId)) {
      alert("Kanban.tsx > onSaveAddKanbanList: id already exists!");
      return false;
    } else {
      setKanbanData([
        ...kanbanData,
        { id: kanbanId, label: kanbanLabel, items: [] },
      ]);
      return true;
    }
  };

  const onKanbanItemDelete = (kanbanId: string, kanbanItemId: string) => {
    const newKanbanData = [...kanbanData];
    const newModifiedKanban = newKanbanData.find(
      (list) => list.id === kanbanId
    );
    if (!newModifiedKanban) {
      // throw err
      return;
    }

    const removeIndex: number = newModifiedKanban.items.findIndex(
      (item) => item.id === kanbanItemId
    );
    if (removeIndex < 0) {
      return;
    }

    newModifiedKanban.items.splice(removeIndex, 1);
    setKanbanData(newKanbanData);
  };

  return (
    <div className="Kanban">
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ paddingBottom: 4 }}>
          <Stack spacing={2} margin={5} direction="row">
            {kanbanData?.map((kanban: IKanban, kanbanIndex: number) => (
              <KanbanList
                key={`kanban-${kanbanIndex}`}
                kanbanData={kanban}
                onAddItemClick={() => setAddItemKanbanId(kanban.id)}
                onDeleteKanban={(kanbanId: string) =>
                  setKanbanData(
                    kanbanData.filter((kanban) => kanban.id !== kanbanId)
                  )
                }
              >
                {kanban.items.map(
                  (kanbanItem: IKanbanItem, kanbanItemIndex: number) => (
                    <KanbanItem
                      kanbanItemData={kanbanItem}
                      index={kanbanItemIndex}
                      key={`kanban-item-${kanbanItemIndex}`}
                      onDeleteKanbanItem={() =>
                        onKanbanItemDelete(kanban.id, kanbanItem.id)
                      }
                    />
                  )
                )}
              </KanbanList>
            ))}
            <NewKanbanCard onSave={onSaveAddKanbanList} />
          </Stack>
        </Box>
      </DragDropContext>
      <NewKanbanItemModal
        kanbanId={addItemKanbanId}
        kanbanLabel={
          kanbanData.find((kanban) => kanban.id === addItemKanbanId)?.label
        }
        onClose={() => setAddItemKanbanId(null)}
        onSave={onSaveAddKanbanListItem}
      />
    </div>
  );
}

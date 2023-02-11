import { useState } from "react";

import { Box, Stack, Modal, Typography, TextField } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";

import KanbanList from "./KanbanList";
import KanbanItem from "./KanbanItem";

import { move, reorder } from "../../utils/kanbanUtils";
import {
  IKanbanAddListItem,
  IKanbanList,
  IKanbanListItem,
  IKanbanNewListItem,
} from "../../types/kanbanTypes";

import { DUMMY_DATA } from "./_DATA";
import NewKanbanModal from "./NewKanbanModal";

export default function Kanban() {
  const [addKanbanListItem, setAddKanbanListItem] =
    useState<IKanbanAddListItem>({
      kanbanId: undefined,
      kanbanListItem: {
        id: undefined,
        content: undefined,
      },
    });
  const [checkFormError, setCheckFormError] = useState(false);
  const [kanbanData, setKanbanData] = useState(DUMMY_DATA);

  console.log("Kanban: ", kanbanData);

  const onDragEnd = (result: any) => {
    const { source, destination }: { source: any; destination: any } = result;

    if (!result.destination) {
      return;
    }

    const sourceIndex: string = source.droppableId;
    const destinationIndex: string = destination.droppableId;

    // move item within list
    if (sourceIndex === destinationIndex) {
      const reorderedKanbanListItems = reorder(
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
      const reorderedKanbanListItems = move(
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

  const onKanbanAddItemClick = (kanbanId: string) => {
    setAddKanbanListItem({ ...addKanbanListItem, kanbanId: kanbanId });
  };

  const onAddKanbanListItemChange = (kanbanListItem: IKanbanNewListItem) => {
    setAddKanbanListItem({
      ...addKanbanListItem,
      kanbanListItem: kanbanListItem,
    });
  };

  const onSaveAddKanbanListItem = () => {
    if (
      !addKanbanListItem.kanbanListItem?.id ||
      !addKanbanListItem.kanbanListItem?.content
    ) {
      setCheckFormError(true);
    } else {
      setCheckFormError(false);
      // check if item already exists
      if (
        kanbanData.some((list) =>
          list.items.some(
            (item) => item.id === addKanbanListItem.kanbanListItem?.id
          )
        )
      ) {
        alert("Kanban.tsx > onSaveAddKanbanListItem: id already exists!");
        return;
        // add
      } else {
        const newKanbanData = [...kanbanData];
        const newKanbanListData = newKanbanData.find(
          (list) => list.id === addKanbanListItem.kanbanId
        );
        if (!newKanbanListData) {
          // throw err
          return;
        }
        newKanbanListData.items.splice(newKanbanListData.items.length, 0, {
          id: addKanbanListItem.kanbanListItem.id,
          content: addKanbanListItem.kanbanListItem.content,
        });
        setKanbanData(newKanbanData);
        setAddKanbanListItem({
          kanbanId: undefined,
          kanbanListItem: {
            id: undefined,
            content: undefined,
          },
        });
      }
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
                  key={`kanban-list-${kanbanListIndex}`}
                  onAddItemClick={onKanbanAddItemClick}
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
          </Stack>
        </Box>
      </DragDropContext>
      <NewKanbanModal
        item={addKanbanListItem}
        onChange={onAddKanbanListItemChange}
        onClose={() =>
          setAddKanbanListItem({
            kanbanId: undefined,
            kanbanListItem: { id: undefined, content: undefined },
          })
        }
        onSave={onSaveAddKanbanListItem}
        checkError={checkFormError}
      />
    </div>
  );
}

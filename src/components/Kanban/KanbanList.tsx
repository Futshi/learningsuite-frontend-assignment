import { useState } from "react";
import { Card, CardContent, CardHeader, Stack, Button, IconButton } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { grey, lightBlue } from "@mui/material/colors";
import { Droppable } from "react-beautiful-dnd";

import NewKanbanItemModal from "./NewKanbanItemModal";

import { IKanbanItem, IKanbanList } from "../../types/kanbanTypes";

export default function KanbanList({
  kanbanList,
  children,
  onCreateKanbanItem,
  onDeleteKanbanList,
}: {
  kanbanList: IKanbanList;
  children: React.ReactNode;
  onCreateKanbanItem: (kanbanListId: string, newKanbanItem: IKanbanItem) => void;
  onDeleteKanbanList: (id: string) => void;
}) {
  const [showKanbanItemModal, setShowKanbanItemModal] = useState<boolean>(false);

  const getListStyle = (isDraggingOver: boolean) => ({
    backgroundColor: isDraggingOver ? lightBlue["100"] : grey["200"],
  });

  const onSaveNewKanbanItem = (newKanbanItem: IKanbanItem) => {
    onCreateKanbanItem(kanbanList.id, newKanbanItem);
    setShowKanbanItemModal(false);
  };

  const onCloseNewKanbanItemModal = () => {
    setShowKanbanItemModal(false);
  };

  return (
    <>
      <Droppable droppableId={kanbanList.id}>
        {(provided, snapshot) => (
          <Card
            variant="outlined"
            sx={{ bgcolor: "grey.200", width: 400 }}
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <CardHeader
              title={kanbanList.label}
              action={
                <IconButton aria-label="settings" onClick={() => onDeleteKanbanList(kanbanList.id)}>
                  <Delete />
                </IconButton>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                {children}
                {provided.placeholder}
                <Button onClick={() => setShowKanbanItemModal(true)}>Add item</Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Droppable>

      <NewKanbanItemModal
        open={showKanbanItemModal}
        kanbanList={kanbanList}
        onClose={onCloseNewKanbanItemModal}
        onSave={onSaveNewKanbanItem}
      />
    </>
  );
}

import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { grey, lightBlue } from "@mui/material/colors";
import { Droppable } from "react-beautiful-dnd";
import { IKanban } from "../../types/kanbanTypes";

export default function KanbanList({
  kanbanData,
  children,
  onAddItemClick,
  onDeleteKanban,
}: {
  kanbanData: IKanban;
  children: React.ReactNode;
  onAddItemClick: (id: string) => void;
  onDeleteKanban: (id: string) => void;
}) {
  const getListStyle = (isDraggingOver: boolean) => ({
    backgroundColor: isDraggingOver ? lightBlue["100"] : grey["200"],
  });

  return (
    <Droppable droppableId={kanbanData.id}>
      {(provided, snapshot) => (
        <Card
          variant="outlined"
          sx={{ bgcolor: "grey.200", width: 400 }}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          <CardHeader
            title={kanbanData.label}
            action={
              <IconButton
                aria-label="settings"
                onClick={() => onDeleteKanban(kanbanData.id)}
              >
                <Delete />
              </IconButton>
            }
          />
          <CardContent>
            <Stack spacing={2}>
              {children}
              {provided.placeholder}
              <Button onClick={() => onAddItemClick(kanbanData.id)}>
                Add item
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Droppable>
  );
}

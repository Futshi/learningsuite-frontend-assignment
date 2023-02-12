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

export default function KanbanList({
  id,
  label,
  children,
  onAddItemClick,
  onDeleteKanbanList,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  onAddItemClick: (id: string) => void;
  onDeleteKanbanList: (id: string) => void;
}) {
  const getListStyle = (isDraggingOver: boolean) => ({
    backgroundColor: isDraggingOver ? lightBlue["100"] : grey["200"],
  });

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <Card
          variant="outlined"
          sx={{ bgcolor: "grey.200", width: 400 }}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          <CardHeader
            title={label}
            action={
              <IconButton
                aria-label="settings"
                onClick={() => onDeleteKanbanList(id)}
              >
                <Delete />
              </IconButton>
            }
          />
          <CardContent>
            <Stack spacing={2}>
              {children}
              {provided.placeholder}
              <Button onClick={() => onAddItemClick(id)}>Add item</Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Droppable>
  );
}

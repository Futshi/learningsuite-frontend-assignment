import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { Droppable } from "react-beautiful-dnd";

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
});

export default function KanbanList({
  id,
  children,
  onAddItemClick,
}: {
  id: string;
  children: React.ReactNode;
  onAddItemClick: (id: string) => void;
}) {
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
            title={id}
            // action={
            //   <IconButton aria-label="settings">
            //     <Delete />
            //   </IconButton>
            // }
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

import { Card, CardContent, Checkbox, Stack, Typography } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  background: isDragging ? "lightgrey" : "white",
  ...draggableStyle,
});

export default function KanbanItem({
  id,
  index,
  children,
  onDelete,
}: {
  id: string;
  index: number;
  children: React.ReactNode;
  onDelete: (kanbanListItemId: string) => void;
}) {
  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center">
              <Checkbox />
              <Typography variant="h6" style={{ flex: 1 }}>
                {children}
              </Typography>
              <Delete onClick={() => onDelete(id)} />
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}

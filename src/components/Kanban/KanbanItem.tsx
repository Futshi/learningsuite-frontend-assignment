import { Card, CardContent, Checkbox, Stack, Typography } from "@mui/material";
import { grey, lightBlue } from "@mui/material/colors";

import Delete from "@mui/icons-material/Delete";
import { Draggable } from "react-beautiful-dnd";

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
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    background: isDragging ? lightBlue["50"] : grey["50"],
    ...draggableStyle,
  });

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
              <Delete sx={{ cursor: "pointer" }} onClick={() => onDelete(id)} />
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}

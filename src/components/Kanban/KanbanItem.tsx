import { Card, CardContent, Stack, Typography } from "@mui/material";
import { grey, lightBlue } from "@mui/material/colors";
import Delete from "@mui/icons-material/Delete";
import { Draggable } from "react-beautiful-dnd";

import { IKanbanItem } from "../../types/kanbanTypes";

export default function KanbanItem({
  kanbanItemData,
  index,
  onDeleteKanbanItem,
}: {
  kanbanItemData: IKanbanItem;
  index: number;
  onDeleteKanbanItem: () => void;
}) {
  /**
   * Retrieve kanban item style based on conditions
   * @param isDragging ... flag to determine the dragging state of the kanban item
   * @param draggableStyle ... provided style
   * @returns ... styles (object)
   */
  const getItemStyle = (isDragging: boolean, draggableStyle: any): object => ({
    userSelect: "none",
    background: isDragging ? lightBlue["50"] : grey["50"],
    ...draggableStyle,
  });

  return (
    <Draggable draggableId={kanbanItemData.id} key={kanbanItemData.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography variant="h6" style={{ flex: 1 }}>
                {kanbanItemData.content}
              </Typography>
              <Delete sx={{ cursor: "pointer" }} onClick={onDeleteKanbanItem} />
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}

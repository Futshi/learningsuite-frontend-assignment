import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import {
  IKanbanAddListItem,
  IKanbanNewListItem,
} from "../../types/kanbanTypes";

export default function NewKanbanModal({
  item,
  onChange,
  onClose,
  onSave,
  checkError,
}: {
  item: IKanbanAddListItem;
  onChange: (kanbanListItem: IKanbanNewListItem) => void;
  onClose: () => void;
  onSave: () => void;
  checkError: boolean;
}) {
  return (
    <Modal
      open={!!item.kanbanId}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New KanbanItem for {item.kanbanId}
        </Typography>
        <TextField
          id="id"
          value={item.kanbanListItem?.id || ""}
          onChange={(e) =>
            onChange({
              ...item.kanbanListItem,
              id: e.target.value,
            })
          }
          error={!item.kanbanListItem?.id && checkError}
          label="id"
          margin="dense"
          fullWidth
        />
        <TextField
          id="content"
          value={item.kanbanListItem?.content || ""}
          onChange={(e) =>
            onChange({
              ...item.kanbanListItem,
              content: e.target.value,
            })
          }
          error={!item.kanbanListItem?.content && checkError}
          label="content"
          margin="dense"
          fullWidth
        />
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onSave}>Save</Button>
      </Box>
    </Modal>
  );
}

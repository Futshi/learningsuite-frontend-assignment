import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

import { IKanbanList, IKanbanItem } from "../../types/kanbanTypes";

export default function NewKanbanItemModal({
  open,
  kanbanList,
  onClose,
  onSave,
}: {
  open: boolean;
  kanbanList: IKanbanList;
  onClose: () => void;
  onSave: (newKanbanItem: IKanbanItem) => void;
}) {
  const [newKanbanItem, setNewKanbanItem] = useState<IKanbanItem>({
    id: "",
    content: "",
  });
  const [showError, setShowError] = useState(false);

  return (
    <Modal
      open={open}
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
          New kanban item for {kanbanList.label}
        </Typography>
        <TextField
          id="id"
          value={newKanbanItem.id || ""}
          onChange={(e) =>
            setNewKanbanItem({
              ...newKanbanItem,
              id: e.target.value,
            })
          }
          error={!newKanbanItem.id && showError}
          label="id"
          margin="dense"
          fullWidth
        />
        <TextField
          id="content"
          value={newKanbanItem.content || ""}
          onChange={(e) =>
            setNewKanbanItem({
              ...newKanbanItem,
              content: e.target.value,
            })
          }
          error={!newKanbanItem.content && showError}
          label="content"
          margin="dense"
          fullWidth
        />
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => {
            let error = newKanbanItem.id.length < 1 || newKanbanItem.content.length < 1;
            setShowError(error);
            if (error) {
              return;
            }
            onSave(newKanbanItem);
            setNewKanbanItem({ id: "", content: "" });
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}

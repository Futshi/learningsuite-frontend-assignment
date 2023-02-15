import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

import { IKanbanList } from "../../types/kanbanTypes";

export default function NewKanbanListModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (newKanbanList: IKanbanList) => void;
}) {
  const [newKanbanList, setNewKanbanList] = useState<IKanbanList>({
    id: "",
    label: "",
    items: [],
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
          New kanban
        </Typography>
        <TextField
          id="id"
          value={newKanbanList.id || ""}
          onChange={(e) =>
            setNewKanbanList({
              ...newKanbanList,
              id: e.target.value,
            })
          }
          error={!newKanbanList.id && showError}
          label="id"
          margin="dense"
          fullWidth
        />
        <TextField
          id="label"
          value={newKanbanList.label || ""}
          onChange={(e) =>
            setNewKanbanList({
              ...newKanbanList,
              label: e.target.value,
            })
          }
          error={!newKanbanList.label && showError}
          label="label"
          margin="dense"
          fullWidth
        />
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => {
            let error =
              newKanbanList.id.length < 1 || newKanbanList.id.length < 1;
            setShowError(error);
            if (error) {
              return false;
            } else {
              onSave(newKanbanList);
              setNewKanbanList({ id: "", label: "", items: [] });
            }
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}

import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { IKanbanNew } from "../../types/kanbanTypes";

export default function NewKanbanModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (id: string, label: string) => boolean;
}) {
  const [formData, setFormData] = useState<IKanbanNew>({
    id: undefined,
    label: undefined,
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
          New Kanban
        </Typography>
        <TextField
          id="id"
          value={formData.id || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              id: e.target.value,
            })
          }
          error={!formData.id && showError}
          label="id"
          margin="dense"
          fullWidth
        />
        <TextField
          id="label"
          value={formData.label || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              label: e.target.value,
            })
          }
          error={!formData.label && showError}
          label="label"
          margin="dense"
          fullWidth
        />
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => {
            if (!formData.id || !formData.label) {
              setShowError(true);
            } else {
              setShowError(false);
              if (onSave(formData.id, formData.label)) {
                setFormData({ id: undefined, label: undefined });
                onClose();
              }
            }
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}

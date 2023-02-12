import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { IKanbanNewListItem } from "../../types/kanbanTypes";

export default function NewKanbanListItemModal({
  kanbanId,
  onClose,
  onSave,
}: {
  kanbanId: string | null;
  onClose: () => void;
  onSave: (kanbanListItemId: string, kanbanListItemContent: string) => void;
}) {
  const [formData, setFormData] = useState<IKanbanNewListItem>({
    id: undefined,
    content: undefined,
  });
  const [showError, setShowError] = useState(false);
  return (
    <Modal
      open={!!kanbanId}
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
          New KanbanItem for {kanbanId}
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
          id="content"
          value={formData.content || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              content: e.target.value,
            })
          }
          error={!formData.content && showError}
          label="content"
          margin="dense"
          fullWidth
        />
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => {
            if (formData.id && formData.content) {
              setShowError(false);
              onSave(formData.id, formData.content);
            } else {
              setShowError(true);
            }
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}

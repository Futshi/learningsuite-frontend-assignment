import { useState } from "react";
import { Card, CardContent, Typography, IconButton, Stack, Box } from "@mui/material";
import Add from "@mui/icons-material/Add";

import { IKanbanList } from "../../types/kanbanTypes";

import NewKanbanListModal from "./NewKanbanListModal";

export default function NewKanbanListCard({
  onCreateKanbanList,
}: {
  onCreateKanbanList: (newKanbanList: IKanbanList) => boolean;
}) {
  const [showNewKanbanItemModal, setShowNewKanbanItemModal] = useState<boolean>(false);

  /**
   * Function handling new kanban list modal close button press
   * @returns void
   */
  const onCloseNewKanbanListModal = () => {
    setShowNewKanbanItemModal(false);
  };

  /**
   * Function handling new kanban list modal save button press
   * @param newKanbanList New kanban list to be created
   * @returns true on successful operation, otherwise false
   */
  const onSaveNewKanbanListModal = (newKanbanList: IKanbanList): boolean => {
    let success = onCreateKanbanList(newKanbanList);
    setShowNewKanbanItemModal(!success);
    return success;
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          bgcolor: "grey.200",
          width: 400,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack>
            <Typography variant="h5">Create new kanban</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton aria-label="add" onClick={() => setShowNewKanbanItemModal(true)}>
                <Add />
              </IconButton>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <NewKanbanListModal
        open={showNewKanbanItemModal}
        onClose={onCloseNewKanbanListModal}
        onSave={onSaveNewKanbanListModal}
      />
    </>
  );
}

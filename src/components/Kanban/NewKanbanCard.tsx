import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import NewKanbanModal from "./NewKanbanModal";

export default function NewKanbanCard({
  onSave,
}: {
  onSave: (id: string, label: string) => boolean;
}) {
  const [addNewKanban, setAddNewKanban] = useState<boolean>(false);
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
              <IconButton
                aria-label="add"
                onClick={() => setAddNewKanban(true)}
              >
                <Add />
              </IconButton>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <NewKanbanModal
        open={addNewKanban}
        onClose={() => setAddNewKanban(false)}
        onSave={onSave}
      />
    </>
  );
}

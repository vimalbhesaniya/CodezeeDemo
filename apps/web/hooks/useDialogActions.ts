import { useState } from "react";
import { DialogTypes } from "../types/dialogs";

export type UseDialogActionsFns = {
  onDialogOpen: (config: DialogTypes) => void;
  onDialogClose: () => void;
};

export function useDialogActions() {
  const [openedDialog, setOpenedDialog] = useState<DialogTypes>();

  const onDialogOpen = (dialogTypes: DialogTypes) =>
    setOpenedDialog(dialogTypes);

  const onDialogClose = () => setOpenedDialog(undefined);

  return {
    onDialogClose,
    onDialogOpen,
    openedDialog,
  };
}

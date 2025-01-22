import React from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Box } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import InoutHistoryView from "./InoutHistoryView.jsx";

function InoutHistoryDetail({ inoutHistoryKey, isOpened, onClosed }) {
  return (
    <DialogRoot open={isOpened} onOpenChange={onClosed}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>{inoutHistoryKey} 입출 상세</Box>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <InoutHistoryView inoutHistoryKey={inoutHistoryKey} />
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={onClosed} />
          <DialogActionTrigger>
            <Button onClick={onClosed}>확인</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default InoutHistoryDetail;

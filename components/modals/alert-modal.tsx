"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
  loading: boolean;
}
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfrim,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description="This cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-5 w-full flex items-center gap-5 justify-end">
        <Button disabled={loading} onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button disabled={loading} onClick={onConfrim} variant="destructive">
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

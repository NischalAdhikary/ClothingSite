import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader } from "./card";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

export default function DeleteModal({
  isOpen,
  onClose,
  loading,
  confirm,
  deleteloading,
}) {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="overflow-hidden min-w-[300px]">
        <CardHeader className="bg-red-500 text-xl text-white font-semibold">
          Delete Confirmation
        </CardHeader>
        {loading ? (
          <CardContent className="min-h-20 animate-spin flex items-center justify-center">
            <Loader2 />
          </CardContent>
        ) : (
          <CardContent className="text-md flex flex-col gap-8">
            <h3 className="text-md font-semibold">
              Are you sure you want to delete?
            </h3>
            <div className="self-end flex gap-2">
              <Button
                disabled={deleteloading}
                onClick={() => {
                  confirm();
                }}
                className="bg-red-500 hover:bg-red-400"
              >
                Yes
              </Button>
              <Button onClick={() => onClose()}>Cancel</Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>,
    document.body
  );
}

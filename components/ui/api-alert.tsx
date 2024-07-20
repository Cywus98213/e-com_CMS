import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant,
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API route copied to the clipboard.");
  };
  return (
    <Alert>
      <AlertTitle className="flex items-center gap-x-4">
        <Server className="h-4 w-4 " />
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center mt-4 justify-between gap-4">
        <code className="relative flex-1 overflow-hidden whitespace-nowrap text-ellipsis rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="default" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
interface ButtonLoadingProps {
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode; // Add this line
}
export function ButtonLoading({
  className,
  onClick,
  loading,
  disabled,
  children, // Add this line
}: ButtonLoadingProps) {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}

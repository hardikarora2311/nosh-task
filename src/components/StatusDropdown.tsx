"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { changePublishStatus } from "@/app/actions";
import { useRouter } from "next/navigation";

const LABEL_MAP = [true, false];

const StatusDropdown = ({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: Boolean;
}) => {
  const router = useRouter();

  const { mutate: changeStatus } = useMutation({
    mutationKey: ["change-publish-status"],
    mutationFn: changePublishStatus,
    onSuccess: () => router.refresh(),
    retry: true,
    retryDelay: 500,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-between items-center">
          {currentStatus ? "Published" : "Unpublished"}
          <ChevronsUpDown className="size-4 ml-2 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {LABEL_MAP.map((status) => (
          <DropdownMenuItem
            key={status.toString()}
            className={cn(
              "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100",
              {
                "bg-zinc-100": currentStatus === status,
              }
            )}
            onClick={() => changeStatus({ id, newStatus: status })}
          >
            <Check
              className={cn(
                "mr-2 size-4 text-primary",
                currentStatus === status ? "opacity-100" : "opacity-0"
              )}
            />
            {status ? "Published" : "Unpublished"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;

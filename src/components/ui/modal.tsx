"use client"

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "maidana07/components/ui/dialog"
import cn from "maidana07/utils/cn"
import { FC, ReactNode } from "react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  title = "Modal Básico",
  description = "Modal para mostrar información"
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "p-0 ",
        className
      )}>
        <DialogTitle aria-hidden data-aria-hidden className="sr-only">{title}</DialogTitle>
        <DialogDescription aria-hidden data-aria-hidden className="sr-only">{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}
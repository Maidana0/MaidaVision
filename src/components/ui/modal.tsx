"use client"

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "maidana07/components/ui/dialog"
import { FC, ReactNode } from "react"

interface ModalProps {
  isOpen?: boolean;
  onOpenChange?(open: boolean): void;
  children?: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  withTrigger?: boolean
  trigger?: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  children,
  className,
  title = "Modal Básico",
  description = "Modal para mostrar información",
  withTrigger = false,
  trigger
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {
        withTrigger && (
          <DialogTrigger asChild>
            {trigger}
          </DialogTrigger>
        )
      }

      <DialogContent className={className}>
        <DialogTitle aria-hidden data-aria-hidden className="sr-only">{title}</DialogTitle>
        <DialogDescription aria-hidden data-aria-hidden className="sr-only">{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}
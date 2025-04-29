import { CommandGroup as Group } from "maidana07/components/ui/command"
import { AnimatePresence } from 'framer-motion';
import { FC } from "react";

type CommandGroupProps = {
  heading: string;
  children: React.ReactNode;
  otherChildren?: React.ReactNode;
}

const CommandGroup: FC<CommandGroupProps> = ({ heading, children, otherChildren }) => {
  return (
    <Group heading={heading}>
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1 items-center">
          {children}
        </div>
      </AnimatePresence>
      {otherChildren}
    </Group>
  )
}

export default CommandGroup
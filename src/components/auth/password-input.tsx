"use client"
import { FC, useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Image from "next/image";

interface PasswordInputProps {
  name: string;
  label: string;
  control: any;
}


const PasswordInput: FC<PasswordInputProps> = ({ control, label, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => { setShowPassword(prev => !prev) }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative flex align-middle items-center">
              <Input type={showPassword ? "text" : "password"} {...field} />
              <button
                type="button"
                className="absolute right-4"
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
              >
                <Image
                  alt="toggle password visibility"
                  width={22}
                  height={22}
                  src={`/icons/eyes/visibility${showPassword ? "_off" : ""}.svg`}
                />
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PasswordInput;
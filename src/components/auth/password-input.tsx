"use client"
import { FC, useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Image from "next/image";
import { Control } from "react-hook-form";

interface PasswordInputProps {
  name: "password" | "confirmPassword";
  label: string;
  control: Control<{ email: string; password: string; } | { email: string; password: string; confirmPassword: string; name?: string | undefined; }, { email: string; password: string; } | { email: string; password: string; confirmPassword: string; name?: string | undefined; }>;
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
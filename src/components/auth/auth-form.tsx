"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { myLoginSchema, myRegisterSchema } from "maidana07/lib/zod/schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "maidana07/components/ui/form";
import { Input } from "maidana07/components/ui/input";
import { Button } from "maidana07/components/ui/button";
import { z } from "zod";
import { FC, useState, useTransition } from "react";

interface Props {
  type: "login" | "register";
  onSubmitAction: (values: Record<string, unknown>) => Promise<{ error?: string }>;
  submitText?: string;
}

const AuthForm: FC<Props> = ({ type, onSubmitAction, submitText = "Enviar" }) => {
  const schema = type === "login" ? myLoginSchema : myRegisterSchema;
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    setServerError("");

    startTransition(async () => {
      const { error } = await onSubmitAction(values);

      if (error) {
        setServerError(error); // Mostrar error en pantalla
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${type === "register"
          ? "grid grid-cols-1 w-full md:grid-cols-2 gap-6" : "space-y-6"
          }`}>
        {serverError && (
          <div className="text-sm text-red-500 font-medium text-center">
            {serverError}
          </div>
        )}

        {type === "register" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Nombre</FormLabel>
                  <FormDescription className="ml-auto">Opcional</FormDescription>
                </div>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="maida@vision.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === "register" && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full col-span-full max-w-4/6 block mx-auto" disabled={isPending}>
          {isPending ? "Cargando..." : submitText}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;

// utils/executeAction.ts

import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: string;
  errorMessage?: string;
};

const executeAction = async <T>({
  actionFn,
  successMessage = "La acción fue exitosa",
  errorMessage = "Ocurrió un error al ejecutar la acción",
}: Options<T>): Promise<{ success: boolean; message: string }> => {
  try {
    await actionFn();
    return { success: true, message: successMessage };
  } catch (error: any) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      message: error?.message || errorMessage,
    };
  }
};

export default executeAction;

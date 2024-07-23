import { useState } from "react";
import { z } from "zod";

export const useFormInputValidation = (schema: z.Schema) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const validateSchema = (value: any) => {
    try {
      schema.parse(value);
      setError(false);
      setHelperText("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(true);
        setHelperText(error.errors[0].message);
      }
    }
  };
  return {
    error,
    setError,
    helperText,
    setHelperText,
    validateSchema,
  };
};

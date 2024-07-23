import { createContext, useContext, useState } from "react";
export type FormStatus = "loading" | "error" | "success";

const FormStatusContext = createContext<{
  formStatus: FormStatus;
  setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>> | null;
  formMessage: string | null;
  setFormMessage: React.Dispatch<React.SetStateAction<string | null>> | null;
}>({
  formStatus: "success",
  setFormStatus: null,
  formMessage: null,
  setFormMessage: null,
});
export const FormStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formStatus, setFormStatus] = useState<FormStatus>("success");
  const [formMessage, setFormMessage] = useState<string | null>(null);

  return (
    <FormStatusContext.Provider
      value={{
        formStatus,
        setFormStatus,
        formMessage,
        setFormMessage,
      }}
    >
      {children}
    </FormStatusContext.Provider>
  );
};
export const useFormStatus = () => {
  const context = useContext(FormStatusContext);
  return context;
};

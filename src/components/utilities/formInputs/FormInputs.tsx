export const FormInput = ({
  inputType,
  placeholder,
  name,
  className,
}: {
  placeholder?: string;
  name: string;
  inputType?: "text" | "textarea";
  className?: string;
}) => {
  return (
    <>
      {(inputType === "text" || !inputType) && (
        <input
          className={className}
          name={name}
          type={inputType}
          placeholder={placeholder}
          required
        />
      )}
      {inputType === "textarea" && (
        <textarea className={className} name={name} placeholder={placeholder} />
      )}
    </>
  );
};

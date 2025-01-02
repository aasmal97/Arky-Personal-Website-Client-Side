import { type ButtonHTMLAttributes } from "react";

const ActionBtn = ({
  children,
  props,
}: {
  children: React.ReactNode | string;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
  return (
    <button {...props}>
      <div className="action-btn-content">{children}</div>
    </button>
  );
};
export default ActionBtn;

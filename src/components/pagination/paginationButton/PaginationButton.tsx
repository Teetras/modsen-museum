import { PaginationButtonProps } from "../../../types/interfaces";

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  children,
  isActive,
  disabled,
  ariaCurrent,
}) => (
  <button
    onClick={onClick}
    className={isActive ? "active-btn" : "page-btn"}
    disabled={disabled}
    aria-current={ariaCurrent}
  >
    {children}
  </button>
);

export default PaginationButton;

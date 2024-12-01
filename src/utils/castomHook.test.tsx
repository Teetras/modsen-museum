import React, { useRef } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useOutsideClick from "./customHook";

const TestComponent = ({ onClose }: { onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClose);

  return <div ref={ref}>Click outside this box</div>;
};

describe("useOutsideClick", () => {
  it("should call onClose when clicking outside the component", () => {
    const onClose = jest.fn();
    const { getByText } = render(<TestComponent onClose={onClose} />);

    userEvent.click(getByText("Click outside this box"));
    expect(onClose).not.toHaveBeenCalled();

    userEvent.click(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when clicking inside the component", () => {
    const onClose = jest.fn();
    const { getByText } = render(<TestComponent onClose={onClose} />);

    userEvent.click(getByText("Click outside this box"));
    expect(onClose).not.toHaveBeenCalled();
  });
});

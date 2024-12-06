import React, { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./burgerMenu.css";

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => setIsOpen(false));

  return (
    <div className="burgerContainer">
      <button
        className="burgerButton"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? "X" : "☰"}
      </button>
      {isOpen && (
        <div className="menu" ref={menuRef}>
          <ul className="menuList">
            <li className="menuItem">
              <a className="menuLink" href="/">
                Home
              </a>
            </li>
            <li className="menuItem">
              <a className="menuLink" href="/favorites">
                Favorite
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;

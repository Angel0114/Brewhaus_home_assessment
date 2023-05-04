import React from "react";

export const Toggle = ({ label, toggled, onClick }) => {
  const callback = () => {
    onClick(!toggled);
  };
  return (
    <label className="toggle__label" data-testid="toggle-button">
      <input
        role="checkbox"
        type="checkbox"
        checked={toggled}
        onChange={callback}
      />
      <span />
      <p>{label}</p>
    </label>
  );
};

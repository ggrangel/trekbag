/* eslint-disable react/prop-types */
export default function Button({ buttonType, onClick, children }) {
  return (
    <button
      className={`btn ${buttonType === "secondary" ? "btn--secondary" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

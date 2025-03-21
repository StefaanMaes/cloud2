
export function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: "#2563eb",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}

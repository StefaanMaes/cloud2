
export function Card({ children, className }) {
  return <div className={`border rounded-2xl shadow-sm p-4 ${className}`}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

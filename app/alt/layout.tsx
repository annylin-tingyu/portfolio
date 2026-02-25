export default function AltLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="h-full min-h-0 flex flex-col"
      style={{ fontFamily: "'Sometype Mono', monospace" }}
    >
      {children}
    </div>
  );
}

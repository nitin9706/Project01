export default function ProfileAvatar({
  name,
  size = 32,
  src,
  className = "",
}) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  if (src) {
    return (
      <img
        src={src}
        alt={name || "avatar"}
        className={"rounded-full object-cover " + className}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={
        "flex items-center justify-center rounded-full bg-(--accent-primary) text-white " +
        className
      }
      style={{ width: size, height: size }}
    >
      <span className="text-sm font-medium">{initials}</span>
    </div>
  );
}

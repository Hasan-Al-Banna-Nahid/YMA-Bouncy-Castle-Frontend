export default function AccentLines({
  width = 97,
  height = 35,
  color = "#FCBA5B",
}: {
  width?: number | string;
  height?: number | string;
  color?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 97 35"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* top bars */}
      <rect x="25" y="14" width="16" height="2" fill={color} />
      <rect x="44" y="14" width="16" height="2" fill={color} />
      {/* bottom bars */}
      <rect x="10" y="20" width="31" height="2" fill={color} />
      <rect x="44" y="20" width="31" height="2" fill={color} />
    </svg>
  );
}

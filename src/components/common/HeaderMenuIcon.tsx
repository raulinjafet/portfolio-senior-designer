type HeaderMenuIconProps = {
  open: boolean;
};

export default function HeaderMenuIcon({ open }: HeaderMenuIconProps) {
  return (
    <svg
      className="header-menu-svg"
      width="32"
      height="16"
      viewBox="0 0 32 16"
      fill="none"
      aria-hidden="true"
    >
      <line
        className="header-menu-line header-menu-line--top"
        x1={open ? 6 : 10}
        y1={open ? 8 : 1}
        x2={open ? 26 : 32}
        y2={open ? 8 : 1}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        className="header-menu-line header-menu-line--mid"
        x1={open ? 16 : 0}
        y1={open ? 8 : 8}
        x2={open ? 16 : 32}
        y2={open ? 8 : 8}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={open ? 0 : 1}
      />
      <line
        className="header-menu-line header-menu-line--bot"
        x1={open ? 6 : 14}
        y1={open ? 8 : 15}
        x2={open ? 26 : 32}
        y2={open ? 8 : 15}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

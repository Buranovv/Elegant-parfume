import Children from "@/types/children";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({
  href,
  className,
  onClick,
  style,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  style?: object;
} & Children) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`${className} ${pathname === href ? "active" : ""}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </Link>
  );
};

export default Navlink;

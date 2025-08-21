import { Link, useLocation, type LinkProps } from "react-router-dom";

export type NavlinkProps = LinkProps;

const NavLink = (props: NavlinkProps) => {
  const { pathname } = useLocation();

  return (
    <Link
      data-current={pathname === props.to}
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex items-center gap-1.5 text-sm font-medium"
      {...props}
    />
  );
};

export default NavLink;

import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ items }: { items: string[] }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        alignItems: "center",
      }}
    >
      {items.map((item) => {
        let isActive = `/${item.toLowerCase()}` === pathname;
        if(pathname === "/" && item === "HOME") isActive = true;
        return <div
          style={{
            cursor: "pointer",
            color: // home === '/'
            isActive ? "#0078d4" : "inherit",
            alignSelf: "flex-start",
            fontWeight: isActive ? 700 : 400,
            transition: "color 0.2s",
          }}
          key={item}
          onClick={() => navigate(`/${item.toLowerCase()}`)}
        >
          {item}
        </div>
      })}
    </div>
  );
};

export default Navbar;

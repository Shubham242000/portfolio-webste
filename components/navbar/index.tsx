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
      {items.map((item) => (
        <div
          style={{
            cursor: "pointer",
            color:
              `/${item.toLowerCase()}` === pathname ? "#0078d4" : "inherit",
            alignSelf: "flex-start",
            fontWeight: `/${item.toLowerCase()}` === pathname ? 700 : 400,
            transition: "color 0.2s",
          }}
          key={item}
          onClick={() => navigate(`/${item.toLowerCase()}`)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Navbar;

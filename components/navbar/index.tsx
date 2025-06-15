import { useNavigate } from "react-router-dom";

const Navbar = ({ items }: { items: string[] }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      {items.map((item) => (
        <div
          style={{ cursor: "pointer" }}
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

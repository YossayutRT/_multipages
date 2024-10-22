import "./Navbar.css";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button"; // เพิ่มการนำเข้า Button

const Navbar = ({ tab, setTab, products, carts , setToken }) => {
  const tabs = [
    { name: "Home", path: "/home" },
    { name: "Calculator", path: "/calculator" },
    { name: "Animation", path: "/animation" },
    { name: "Components", path: "/components" },
    { name: "Todo", path: "/todo" },
    { name: `Products (${products.length})`, path: "/products" },
    { name: "Carts", path: "/carts" },
  ];

  return (
    <div className="navbar-container">
      {tabs.map(({ name, path }) => (
        <Link to={path} key={name} className="nav-link">
          <div className="position-relative">
            <button
              className={`btn ${
                tab === name.toLowerCase().split(" ")[0]
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setTab(name.toLowerCase().split(" ")[0])}
            >
              {name}
            </button>

            {/* แสดง Badge บนปุ่ม Carts */}
            {name === "Carts" && carts.length > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
              >
                {carts.length < 10 ? carts.length : "9+"}
              </Badge>
            )}
          </div>
        </Link>
      ))}

      {/* ปุ่ม Logout */}
      <Button variant="outline-danger" onClick={() => setToken('')}>Logout</Button>  
    </div>
  );
};

export default Navbar;

import "./Carts.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Carts = ({ carts, setCarts }) => {
  // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
  const removeFromCarts = (indexToRemove) => {
    const updatedCarts = carts.filter((_, index) => index !== indexToRemove);
    setCarts(updatedCarts);
  };

  // คำนวณราคาสินค้าทั้งหมด
  const totalPrice = carts.reduce((total, product) => total + product.price, 0).toFixed(2);

  return (
    <div className="carts-container">
      <div className="carts-items-container">
        {carts.map((product, index) => (
          <Card style={{ width: "13rem" }} key={index}>
            <Card.Img variant="top" src={product.thumbnailUrl} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{`Price: $${product.price}`}</Card.Text>
              <Button variant="outline-danger" onClick={() => removeFromCarts(index)}>
                Remove from Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* สรุปจำนวนสินค้าและราคา */}
      <div className="cart-summary">
        <p>
          Products: <span className="cart-badge">{carts.length} items</span> - Total price:{" "}
          <span className="price-badge">${totalPrice}</span>
        </p>
        <Button variant="warning" className="checkout-btn">
          Checkout <i className="bi bi-credit-card"></i>
        </Button>
      </div>
    </div>
  );
};

export default Carts;

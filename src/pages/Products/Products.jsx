import "./Products.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Products = ({ products, carts, setCarts }) => {
  const addToCarts = (product) => {
    setCarts([...carts, product]);
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <Card style={{ width: "13rem" }} key={product.id}>
          <Card.Img variant="top" src={product.thumbnailUrl} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{`Price: $${product.price}`}</Card.Text>

            {carts.find((cartProduct) => cartProduct.id === product.id) ? (
              <Button variant="danger" disabled>
                Added to Carts
              </Button>
            ) : (
              <Button variant="outline-primary" onClick={() => addToCarts(product)}>
                Add to Carts
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Products;

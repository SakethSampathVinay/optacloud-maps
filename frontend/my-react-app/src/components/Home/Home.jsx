import React from "react";
import "./Home.css";

const categories = [
  {
    id: 1,
    name: "Fruits & Vegetables",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.kxz2MKlH765Xyz47qV_svwHaEo&pid=Api&P=0&h=180",
  },
  {
    id: 2,
    name: "Dairy & Bakery",
    image:
      "https://c8.alamy.com/comp/W1JR2J/milk-and-bakery-products-W1JR2J.jpg",
  },
  {
    id: 3,
    name: "Snacks & Beverages",
    image:
      "https://i.etsystatic.com/30493030/r/il/803719/3212835891/il_fullxfull.3212835891_8suw.jpg",
  },
  {
    id: 4,
    name: "Household Supplies",
    image:
      "https://thumbs.dreamstime.com/z/household-items-cleaning-supplies-upper-view-household-items-up-view-cleaning-domestic-supplies-wooden-background-109504772.jpg",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Organic Apples",
    price: "$4.99",
    image:
      "https://img.freepik.com/premium-photo/fresh-ripe-red-apples-as-background-top-view-natural-apples_79075-20650.jpg?w=2000",
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    price: "$2.49",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.oCGfdttRamtu9d--AT0VCQHaEK&pid=Api",
  },
  {
    id: 3,
    name: "Almond Milk",
    price: "$3.79",
    image:
      "https://www.veganfoodandliving.com/wp-content/uploads/2022/10/A-bottle-of-almond-milk.jpg",
  },
];

const Home = () => {
  return (
    <div className="home-container">
      {/* Banner Section */}
      <section className="banner">
        <h1>Fresh Groceries Delivered to Your Doorstep</h1>
        <p>Shop fresh produce, dairy, and more at the best prices!</p>
        <button className="shop-now-button">Shop Now</button>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="categories-container">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <img
                src={category.image}
                alt={`${category.name} Category`}
                className="category-image"
              />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-container">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={`${product.name} Image`}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

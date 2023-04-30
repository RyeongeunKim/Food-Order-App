import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { useState } from "react";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const addMealHandler = (meals) => {
    (async () => {
      for (const meal of meals) {
        const response = await fetch(
          "https://food-order-app-3a471-default-rtdb.firebaseio.com/orderMeals.json",
          {
            method: "POST",
            body: JSON.stringify(meal),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
      }
    })();
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onAddMeal={addMealHandler} />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

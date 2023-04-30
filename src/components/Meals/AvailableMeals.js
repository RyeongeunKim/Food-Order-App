import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://food-order-app-3a471-default-rtdb.firebaseio.com/meals.json"
      );
      if (response.ok) {
        const resData = await response.json();
        const mealList = [];
        for (const key in resData) {
          mealList.push({
            id: key,
            description: resData[key].description,
            name: resData[key].name,
            price: resData[key].price,
          });
        }
        setMeals(mealList);
      }
    })();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <ul>
        <Card>{mealsList}</Card>
      </ul>
    </section>
  );
};

export default AvailableMeals;

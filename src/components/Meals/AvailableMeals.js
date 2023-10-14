import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://consummate-mark-385618-default-rtdb.firebaseio.com/Meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const mealsData = [];
      for (const key in responseData) {
        mealsData.push({
          id: key,
          name: responseData[key].id,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(mealsData);
      setIsLoading(false);
    };
    
      fetchMeals().catch((error)=>{
        setIsLoading(false);
        setHasError(error.message);
      });
    
  }, []);
  if (isLoading) {
    return (
      <section>
        <p>Loading</p>
      </section>
    );
  }
  if (hasError) {
    return (
      <section>
        <p>{hasError}</p>
      </section>
    );
  }
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
      <Card>{<ul>{mealsList}</ul>}</Card>
    </section>
  );
};

export default AvailableMeals;

import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    pc: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const pcRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPc = pcRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsvaLID = !isEmpty(enteredStreet);
    const enteredPcIsValid = !isNotFiveChars(enteredPc);
    const enteredCityIsValid = !isEmpty(enteredCity);
    setFormInputValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsvaLID,
      pc: enteredPcIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsvaLID &&
      enteredPcIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      pc: enteredPc,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : "invalid"
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputValidity.name && <p>The entered name is wrong.</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.street ? "" : "invalid"
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formInputValidity.street && <p>The entered street is wrong</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.pc ? "" : "invalid"
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={pcRef} />
        {!formInputValidity.pc && <p> The entered pc is wrong.</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? "" : "invalid"
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputValidity.city && <p>The entered city is wrong.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [order, setOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const orderButtonHandler = (event) => {
    setOrder(true);
  };

  const submitDataHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://consummate-erol-385618-default-rtdb.firebaseio.com/Meals.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      setIsSubmitting(false);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setDidSubmit(true);
    } catch (error) {
      setHasError(error.message);
      setDidSubmit(false);
      cartCtx.clearCart();
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      <button onClick={orderButtonHandler} className={classes.button}>
        Order
      </button>
    </div>
  );
  const cartModelContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {order && (
        <Checkout onSubmit={submitDataHandler} onCancel={props.onClose} />
      )}
      {!order && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data</p>;
  const didSubmitModalContent = <p>Order Submitted</p>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !hasError && !didSubmit && cartModelContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && !hasError && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

//usecallback car le total est deja calculer et enregistrer ,il va juste lui ajouter le nv mt
import React,{useEffect,useCallback} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
addToCart,
clearCart,
decreaseCart,
getTotals,
removeFromCart,
} from "../../../features/cartSlice";
import { Link } from "react-router-dom";
import "../../../style.css";
import Api from "../../../Api/axios";
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
const cart = useSelector((state) => state.storecart);
const dispatch = useDispatch();
const computeTotal = useCallback(() => {
dispatch(getTotals());
}, [cart, dispatch])
useEffect(() => {
computeTotal()
}, [computeTotal])
const handleAddToCart = useCallback((product) => {
    dispatch(addToCart(product));
    }, [dispatch])
    const handleDecreaseCart = useCallback((product) => {
    dispatch(decreaseCart(product));
    }, [dispatch])
    const handleRemoveFromCart = useCallback((product) => {
    dispatch(removeFromCart(product));
    }, [dispatch])
    const handleClearCart = useCallback(() => {
        dispatch(clearCart());
        }, [dispatch])

        const [status, setStatus] = React.useState("idle");
        async function handleClickStripe(event) {
        event.preventDefault();
        if (cart.cartTotalAmount>0) {
        setStatus("loading");
        try {
        const stripe = await loadStripe('pk_test_51PpVpZI0TSm0DGMxdT73pV3Fq24MOfPa6VNtYfLy75Qtb0PLLIiHQ2nMHCl7QMaEG2ebiYFY6zMQ6OSuH3r9PcHd00DSgwyP7A');
        if (!stripe) throw new Error('Stripe failed to initialize.');


        
const cartItems=cart.cartItems
 const checkoutResponse = await Api.post('payment', {cartItems})
 const {sessionId} = await checkoutResponse.data;
const stripeError = await stripe.redirectToCheckout({sessionId});
if (stripeError) {
console.error(stripeError);
}
} catch (error) {
console.error(error);
setStatus("redirect-error");
}
} else {
setStatus("no-items");
}
}



        return (
        <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
        <p>Panier Vide</p>
        <div className="start-shopping">
        <Link to="/card">
        <span>Start Shopping</span>
        </Link>
        </div>
        </div>
        ) : (
        <div>
        <div className="titles">
        <h3 className="product-title">Product</h3>
        <h3 className="price">Price</h3>
        <h3 className="quantity">Quantity</h3>
        <h3 className="total">Total</h3>
        </div>
        <div className="cart-items">
{cart.cartItems &&
cart.cartItems.map((cartItem) => (
<div className="cart-item" key={cartItem._id}>
<div className="cart-product">
<img src={`${cartItem.imageart}`} alt={cartItem.designation}/>
<div>
<h3>{cartItem.designation}</h3>
<p>{cartItem.reference}</p>
<button onClick={() => handleRemoveFromCart(cartItem)}>Remove
</button>
</div>
</div>
<div className="cart-product-price"> {cartItem.prix} TND</div>
<div className="cart-product-quantity">
<button onClick={() => handleDecreaseCart(cartItem)}>
-
</button>
<div className="count">{cartItem.cartQuantity}</div>
<button onClick={() => handleAddToCart(cartItem)}>+</button>
</div>
<div className="cart-product-total-price">
{(cartItem.prix * cartItem.cartQuantity).toFixed(3)} TND
</div>
</div>
))}
</div>
<div className="cart-summary">
<button className="clear-btn" onClick={() => handleClearCart()}>
Clear Cart
</button>
<div className="cart-checkout">
<div className="subtotal">
<span>Subtotal</span>
<span className="amount">{cart.cartTotalAmount.toFixed(3)}
TND</span>
</div>
<p>Taxes and shipping calculated at checkout</p>
<button onClick={(event)=>handleClickStripe(event)}>{status !==
"loading" ? "Check Out" : "Loading..."}</button>
<div className="continue-shopping">
<Link to="/card">
<span>Continue Shopping</span>
</Link>
</div>
</div>
</div>
</div>
)}
</div>
);
};
export default Cart;
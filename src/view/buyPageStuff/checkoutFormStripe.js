import React, { useEffect, useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, storage, auth } from '../../firbase.config.js';
import toolService from "../../services/toolService.js";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // redirect_to_checkout: true,
        
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/purchase/"+window.location.href.split("/")[window.location.href.split("/").length-1],
      },
      redirect: 'if_required',
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      // Handle error
      console.error(error);
    } else {
      
      let app = props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let id = toolService.getIdFromURL(true,0);
    let component = componentList.getComponents().find(obj => obj.getJson()._id === id);
      let json = { ...component.getJson(), type: "mpItem", owner: state.user.getJson()._id }
            json.date = await serverTimestamp();
            await setDoc(doc(db, "GMSusers", "GMSAPP", "components", json._id), json);
            await state.opps.cleanJsonPrepareRun({addbuy:
              {email:state.user.getJson()._id, 
                type:"buy",
                boughtItem:component.getJson()._id,
                price: component.getJson().stripePrice,
                publisher:component.getJson().owner,

              }})

      // Payment was successful
      dispatch({payment:"success",});


      console.log("Payment successful:");
      // You can perform further actions here, such as updating UI or backend
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
    {props.app.state.payment==="success"?(<></>):(
    <form id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    )}
    </>
  );
}
import React, { useEffect, useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, storage, auth } from '../../firbase.config.js';
import toolService from "../../services/toolService.js";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import stripeLogo from "../../pics/stripe-logo-white.png"
import Success from "./success.js";

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
      let json = { ...component.getJson(), type: "mpItem", owner: state.user.getJson()._id, ogId:component.getJson()._id, _id:Math.floor(Math.random()*1000000).toString() }
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
    {props.app.state.payment==="success"?(<Success app={props.app}/>):(
    <form id="payment-form" onSubmit={handleSubmit}>
<div style={{marginTop:"19px",  }}>

  <div style={{display:"flex", flexDirection:"row", marginBottom:"39px" }}>
  <div style={{color:props.app.state.styles.colors.color1, fontFamily:"inria", fontSize:"1.5rem",}}>Secure Payment through</div> 
  <img src={stripeLogo} style={{height:"1.5rem", marginLeft:"20px", marginTop:"3px", mixBlendMode:"difference"}}/></div>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button style={{...props.app.state.styles.buttons.buttonAdd, display:"", borderRadius:"12px", 
      marginTop:"28px", width:"230px", height:"fit-content", fontFamily:"inria", fontSize:"1.2rem", padding:"18px",  }} disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" >
          {isLoading ? <div className="spinner" id="spinner"></div> : "Purchase Now"}
        </span>
        
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
      <div style={{color:props.app.state.styles.colors.color1, marginTop:"11px", fontWeight:"500"}}>All purchases are final. The purchased content will be added to your AVA library</div>
      </div></form>
    
    )}
    </>
  );
}
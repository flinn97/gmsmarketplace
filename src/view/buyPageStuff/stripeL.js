import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutFormStripe";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key. 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
const stripePromise = loadStripe("pk_test_51OMckYHWPcdv1N1nR8kkZPrMFlveOoIpeIzIPDMGIQfGaIekcYelCuAJmDAVP9ORlvhLYBqde0L0aum4hBsMVYYz00SRBCEskk");

export default function StripeEl(props) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    

    let comp = props.app.state.currentComponent;
    let price= comp.getJson().stripePrice;
    // Create PaymentIntent as soon as the page loads/getProductAndPrice?price=${price}
      fetch(`https://getmpproduct-x5obmgu23q-uc.a.run.app?price=${price}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    setClientSecret(data.clientSecret)
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App" >
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm app={props.app} />
        </Elements>
      )}
    </div>
  );
}
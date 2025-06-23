import React from "react";

export default function CheckoutPage() {
  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        <li>
          Multi-step flow: shipping address {"->"} shipping method {"->"}{" "}
          payment {"->"} review
        </li>
        <li>Integrate with your Payment MFE or third-party gateway</li>
        <li>Order confirmation page</li>
        <li></li>
      </ul>
    </div>
  );
}

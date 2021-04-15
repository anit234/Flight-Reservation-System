import React from "react";
import BookingFlightInfo from "../components/BookFlightInFo";
import { loadStripe } from "@stripe/stripe-js";
import { baseURl } from "../../../constants/apiContact";
import axios from "axios";
import { useLocation, useRouteMatch } from "react-router-dom";
import { getQueryParams } from "../../../utils/getQueryString";
const stripePromise = loadStripe(
  "pk_test_51IO2oMDI0qDxXQ1I8O6LKoHCLUBhYzp2YH8I40L16mtO8BOZ1xqmQl3fpisVYphzVNVA6hKWIXOttZEIrPrX8Ko9006dtIgkJ6"
);

const Payment = () => {
  let match = useRouteMatch("/bookingDetails/:bookingId/payment");
  const location = useLocation();
  const handlePayment = async () => {
    const noOfPassanger = getQueryParams(location.search).get("noOfPassanger");
    console.log(noOfPassanger);
    const session = await axios.get(
      `${baseURl}api/v1/booking/checkout-session/${match.params.bookingId}/${noOfPassanger}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    console.log(await stripePromise);
    (await stripePromise).redirectToCheckout({
      sessionId: session.data.session.id,
    });
  };
  return (
    <>
      <BookingFlightInfo />
      <div className="container">
        <div className="mt-5">
          <h5>Confirm Payment with card.</h5>
          <button
            onClick={handlePayment}
            className="btn btn-primary mt-5 my-auto"
          >
            Make Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Payment;

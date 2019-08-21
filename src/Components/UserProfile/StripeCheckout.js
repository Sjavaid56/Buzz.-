import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class Checkout extends React.Component {
  onToken = ""

  render() {
    return (
      <StripeCheckout
        name = "TEST"
        amount="1000"
        billingAddress
        description="Awesome Product"
        // image="https://yourdomain.tld/images/logo.svg"
        locale="auto"
        name="YourDomain.tld"
        stripeKey="pk_test_3o1ZktybntixHkDxm6ks3LBr"
        token={this.onToken}
        zipCode
      />
    )
  }
}
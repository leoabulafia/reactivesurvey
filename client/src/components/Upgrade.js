import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Button from 'material-ui/Button';

class Upgrade extends Component {
  render() {
    const { name, description, amount } = this.props;
    return (
      <StripeCheckout
        name="Mail Surveys"
        description={description}
        amount={amount}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Button raised color="primary">
          Upgrade
        </Button>
      </StripeCheckout>
    );
  }
}

export default Upgrade;

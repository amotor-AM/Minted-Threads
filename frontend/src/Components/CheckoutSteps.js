import React from 'react';
import { Col, Row } from 'react-bootstrap';

function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active mr-1' : 'mr-1'}>Sign-In</Col>
      <Col className={props.step2 ? 'active mr-1' : 'mr-1'}>Shipping</Col>
      <Col className={props.step3 ? 'active mr-1' : 'mr-1'}>Payment</Col>
      <Col className={props.step4 ? 'active mr-1' : 'mr-1'}>Place Order</Col>
    </Row>
  );
}

export default CheckoutSteps;

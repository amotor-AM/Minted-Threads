import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../Components/CheckoutSteps';

function ShippingAddressScreen() {
  const { state: storeState, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = storeState;
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(shippingAddress?.firstName || '');
  const [lastName, setLastName] = useState(shippingAddress?.lastName || '');
  const [street, setStreet] = useState(shippingAddress?.street || '');
  const [street2, setStreet2] = useState(shippingAddress?.street2 || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [state, setState] = useState(shippingAddress?.state || '');
  const [zip, setZip] = useState(shippingAddress?.zip || '');

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        firstName,
        lastName,
        street,
        street2,
        city,
        state,
        zip,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        firstName,
        lastName,
        street,
        street2,
        city,
        state,
        zip,
      })
    );
    navigate('/payment');
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
  }, [userInfo, navigate]);
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <h1 className="my-3">Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={9}>
            <Form.Group className="mb-3" controlId="Street">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="streetTwo">
              <Form.Label>Apt / Unit</Form.Label>
              <Form.Control
                value={street2}
                onChange={(e) => setStreet2(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </Form.Group>
        <div className="mb-3">
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ShippingAddressScreen;

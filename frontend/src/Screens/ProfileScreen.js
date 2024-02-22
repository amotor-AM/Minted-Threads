import React, { useContext, useReducer, useState } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../util';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'FETCH_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'FETCH_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
}

function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const [firstName, setFirstName] = useState(
    userInfo.firstName ? userInfo.firstName : ''
  );
  const [lastName, setLastName] = useState(
    userInfo.lastName ? userInfo.lastName : ''
  );
  const [email, setEmail] = useState(userInfo.email ? userInfo.email : '');
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully!');
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileScreen;

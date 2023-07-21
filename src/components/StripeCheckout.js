import React, { useState } from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { formatPrice } from '../utils/helpers'
import { useNavigate, Link } from 'react-router-dom'

const CheckoutForm = () => {

  const {
    total_amount, 
    shipping_fee, 
    clearCart} = useCartContext();

  const {myUser} = useUserContext();

  const navigate = useNavigate();


  const [succeeded, setSucceeded] = useState(false);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const submit = (e)=>{
    e.preventDefault();
    setSucceeded(true);
    setTimeout(()=>{
      clearCart();
      navigate('/');
    },5000)
  }


  return <div>
    {
      succeeded ? 
      <article>
        <h4>Thank you!</h4>
        <p>Redirecting to the home page shortly ...</p>
      </article> : 
      <article>
        <h4>Hello, {myUser && myUser.name}</h4>
        <p>Your total is {formatPrice(total_amount + shipping_fee)}</p>
      </article>
    }
    <form onSubmit={submit}>
      <input className={succeeded &&'hidden'} id='card-element' options={cardStyle}
      placeholder='Card number'/>
      <button className={succeeded &&'hidden'} type='submit'>Pay</button>
      <p className={succeeded?'result-message':'hidden'}>
        Payment succeeded! You are the best!
        <Link to='/products'> Go shop again </Link>
      </p>
    </form>
  </div>
}

const StripeCheckout = () => {


  return (
    <Wrapper>
      <CheckoutForm />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  form {
    width: 50vw;
    max-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`

export default StripeCheckout

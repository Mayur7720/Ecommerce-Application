import React from 'react'
import useCart from '../hooks/useCart'

function Cart() {
  const {cartItems}=useCart()
  console.log(cartItems)
  return (
    <div>Cart</div>
  )
}

export default Cart
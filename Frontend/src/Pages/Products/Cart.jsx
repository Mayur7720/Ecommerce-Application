import React from 'react'
import useCart from '../../hooks/useCart'
import CartBanners from '../../Components/CartBanners'

function Cart() {
  const {cartItems}=useCart()
  console.log(cartItems)
  return (
    <section className='px-4 bg-slate-100 h-screen'>
       <CartBanners/>
    </section>
  )
}

export default Cart
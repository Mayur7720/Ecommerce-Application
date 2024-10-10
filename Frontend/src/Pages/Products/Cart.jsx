import React from 'react'
import useCart from '../../hooks/useCart'
import CartBanners from '../../Components/CartBanners'

function Cart() {
  const {cartItems}=useCart()
  console.log(cartItems)
  return (
    <section className='px-2 md:px-4 h-full'>
       <CartBanners/>
     </section>
  )
}

export default Cart
import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { FaClipboardList } from "react-icons/fa";

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem,fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()

  const handleCashOnDelivery = async() => {
      try {
          const response = await Axios({
            ...SummaryApi.CashOnDeliveryOrder,
            data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id,
              subTotalAmt : totalPrice,
              totalAmt :  totalPrice,
            }
          })

          const { data : responseData } = response

          if(responseData.success){
              toast.success(responseData.message)
              if(fetchCartItem){
                fetchCartItem()
              }
              if(fetchOrder){
                fetchOrder()
              }
              navigate('/success',{
                state : {
                  text : "Order"
                }
              })
          }

      } catch (error) {
        AxiosToastError(error)
      }
  }

  // const handleOnlinePayment = async()=>{
  //   try {
  //       toast.loading("Loading...")
  //       const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
  //       const stripePromise = await loadStripe(stripePublicKey)
       
  //       const response = await Axios({
  //           ...SummaryApi.payment_url,
  //           data : {
  //             list_items : cartItemsList,
  //             addressId : addressList[selectAddress]?._id,
  //             subTotalAmt : totalPrice,
  //             totalAmt :  totalPrice,
  //           }
  //       })

  //       const { data : responseData } = response

  //       stripePromise.redirectToCheckout({ sessionId : responseData.id })
        
  //       if(fetchCartItem){
  //         fetchCartItem()
  //       }
  //       if(fetchOrder){
  //         fetchOrder()
  //       }
  //   } catch (error) {
  //       AxiosToastError(error)
  //   }
  // }
  return (
    
    <section className='bg-blue-50 min-h-screen flex items-center justify-center p-4'>
      
      <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 '>
        <div className='w-full'>
          {/* **address**
          <h3 className='text-lg font-semibold'>Choose your address</h3>
          <div className='bg-white p-2 grid gap-4'>
            {
              addressList.map((address, index) => {
                return (
                  <label htmlFor={"address" + index} className={!address.status && "hidden"}>
                    <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                      <div>
                        <input id={"address" + index} type='radio' value={index} onChange={(e) => setSelectAddress(e.target.value)} name='address' />
                      </div>
                      <div>
                        <p>{address.address_line}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.country} - {address.pincode}</p>
                        <p>{address.mobile}</p>
                      </div>
                    </div>
                  </label>
                )
              })
            }
            <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
              Add address
            </div>
          </div>
 */}

        </div>
        {/* <div className='text-lg font-bold flex justify-center items-center text-blue-500'>Carrinho - EmpreendaCADC</div> */}
        <div className='w-full max-w-md bg-white py-4 px-2 mb-4'></div>
        <FaClipboardList className='text-4xl text-green-600 mx-auto mb-4'></FaClipboardList>
        <h3 className='text-lg font-semibold flex justify-center items-center'>Sumário</h3>

        <div className='w-full max-w-md bg-white py-4 px-2'></div>
          {/**summary**/}
          <div className='bg-white p-4'>
            <h3 className='font-semibold'>Detalhes da Compra</h3>
            <div className='flex gap-4 justify-between ml-1 '>
              <p>Valor total</p>
              <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>M$ {(notDiscountTotalPrice)}</span><span>M${(totalPrice)}</span></p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Quantidade</p>
              <p className='flex items-center gap-2'>x{totalQty}</p>
            </div>
            {/* <div className='flex gap-4 justify-between ml-1'>
              <p>Delivery Charge</p>
              <p className='flex items-center gap-2'>Free</p>
            </div> */}
            <div className='font-semibold flex items-center justify-between gap-4'>
              <p >Valor Total</p>
              <p>M$ {(totalPrice)}</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            {/* <button className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold' onClick={handleOnlinePayment}>Online Payment</button> */}
            {/* <button className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold'> Online Payment</button> */}
            {/* <button className='py-2 px-4 bg-green-600 font-semibold text-white hover:bg-green-600 hover:text-white' onClick={handleCashOnDelivery}>Simular Compra Agora</button> */}
            <button className='py-2 px-4 bg-red-600 font-semibold text-white hover:bg-red-600 hover:text-white'>Compra NÃO disponível antes da feira!</button>

          </div>
        {/* </div> */}
      </div>


      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }
    </section>
  )
}

export default CheckoutPage

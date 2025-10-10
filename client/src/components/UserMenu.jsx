import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout, setUserDetails } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin'
import { getCoinsController } from './../../../server/controllers/coins.controller.js'

const UserMenu = ({close}) => {
   const user = useSelector((state)=> state.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = async()=>{
        try {
          const response = await Axios({
             ...SummaryApi.logout
          })
          console.log("logout",response)
          if(response.data.success){
            if(close){
              close()
            }
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)
            navigate("/")
          }
        } catch (error) {
          console.log(error)
          AxiosToastError(error)
        }
   }

   const handleClose = ()=>{
      if(close){
        close()
      }
   }

  //  const user2 = useSelector(state => state.user)
  //  const [userCoins,setUserCoins] = useState({
  //      email : user2.email,
  //      coins : user2.coins
  //  })
  //  const [loading,setLoading] = useState(false)
  //  const dispatch2 = useDispatch()

  //  useEffect(()=>{
  //      setUserCoins({
  //       email : user2.email,
  //       coins : user2.coins
  //      })
  //  },[user2])

  //  const handleOnChange  = (e)=>{
  //      const { name, value} = e.target 

  //      setUserCoins((preve)=>{
  //          return{
  //              ...preve,
  //              [coins] : value
  //          }
  //      })
  //  }

  //  const handleSubmit = async(e)=>{
  //      e.preventDefault()
       
  //      try {
  //          setLoading(true)
  //          const response = await Axios({
  //              ...SummaryApi.updateUserDetails,
  //              data : userCoins
  //          })

  //          const { data : responseData } = response

  //          if(responseData.success){
  //              toast.success(responseData.message)
  //              const userCoins = await fetchUserDetails()
  //              dispatch(setUserDetails(userCoins.data))
  //          }

  //      } catch (error) {
  //          AxiosToastError(error)
  //      } finally{
  //          setLoading(false)
  //      }
  //     }

  useEffect(() => {
    const fetchUserCoins = async () => {
      try {
        const response = await Axios(SummaryApi.userDetails)
        if (response.data.success) {
          dispatch(setUserDetails(response.data.data)) // atualiza Redux
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err)
      }
    }
  
    fetchUserCoins()
  
    // Atualiza automaticamente após uma compra
    const intervalId = setInterval(fetchUserCoins, 3000)
  
    return () => clearInterval(intervalId)
  }, [dispatch])
  
  
  return (
    
    <div>
        <div className='font-semibold'>Minha Conta</div>
        <div className='text-sm flex items-center gap-2'>
          <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} <span className='text-medium text-red-600'>{user.role === "ADMIN" ? "(Admin)" : "" }</span></span>
          <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'>
            <HiOutlineExternalLink size={15}/>
          </Link>
        </div>

        <Divider/>

        <div className='text-sm grid gap-1'>
            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-orange-200 py-1'>Categorias</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-200 py-1'>Sub Categorias</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-orange-200 py-1'>Adicionar Produtos</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-orange-200 py-1'>Produtos</Link>
              )
            }
            <span className='px-2 text-orange-500 py-1'> ${user.coins} Marcoins</span>
            <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 hover:bg-orange-200 py-1'>Histórico de Compras</Link>
            <Link onClick={handleClose} to={"https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"} className='px-2 hover:bg-red-500 py-1'>Marcoins de Graça</Link>

            {/* <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-orange-200 py-1'>Save Address</Link> */}

            <button onClick={handleLogout} className='text-left px-2 hover:bg-orange-200 py-1'>Sair.</button>

        </div>
    </div>
  )
}

export default UserMenu

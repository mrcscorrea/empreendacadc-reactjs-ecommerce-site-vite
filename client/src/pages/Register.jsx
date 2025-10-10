import React, { useState } from 'react'
import { useEffect } from 'react';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import FingerprintJS from 'fingerprintjs'
// No início do Register.jsx

const Register = () => {

    // useEffect(() => {
    //     const generateFingerprint = async () => {
    //       const storedId = localStorage.getItem('deviceId')
    //       if (!storedId) {
    //         const fp = await FingerprintJS.load()
    //         const result = await fp.get()
    //         const visitorId = result.visitorId
    //         localStorage.setItem('deviceId', visitorId)
    //         console.log("Novo deviceId salvo:", visitorId)
    //       } else {
    //         console.log("deviceId já existente:", storedId)
    //       }
    //     }
      
    //     generateFingerprint()
    //   }, [])

    useEffect(() => {
        const deviceId = localStorage.getItem("deviceId")
        if (!deviceId) {
          localStorage.setItem("deviceId", uuidv4())
        }
      }, [])
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async(e)=>{
        e.preventDefault()
        const deviceId = localStorage.getItem("deviceId")

        if(data.password !== data.confirmPassword){
            toast.error(
                "Senha e Confirmar Senha não são iguais, por favor verifique novamente!"
            )
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data : {
                    ...data,
                deviceId: deviceId
                }
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name : "",
                    email : "",
                    password : "",
                    confirmPassword : ""
                })
                navigate("/login")
            }

        } catch (error) {
            console.log(error)
            AxiosToastError(error)
        }



    }
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 font-semibold'>
                <p>Bem-vindo ao EmpreendaCADC!</p>

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Nome:</label>
                        <input
                            type='text'
                            id='name'
                            autoFocus
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Digite seu nome'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='email'>E-mail:</label>
                        <input
                            type='email'
                            id='email'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Digite seu e-mail'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='password'>Senha:</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Digite sua senha'
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword'>Confirmar Senha:</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Digite sua senha novamente'
                            />
                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Registrar-se</button>

                </form>

                <p>
                    Já possui uma conta? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Entre</Link>
                </p>
            </div>
        </section>
    )
}

export default Register

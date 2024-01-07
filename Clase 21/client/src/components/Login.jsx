import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoggedContext } from '../context/LoggedContext.jsx';

import { Button, Spinner, Input, Chip, Card, CardBody, CardHeader, CardFooter, Divider, Link, LinkIcon } from "@nextui-org/react";

export default function Login() {

    const {isLogged, setIsLogged, logged, userRol} = useContext(LoggedContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if (isLogged || userRol) navigate('/')
    }, [isLogged, userRol, navigate])

    const formRef = useRef(null)
    const [loginError, setLoginError] = useState()
    const [progress, setProgress] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLogged) navigate('/')
        const dataForm = new FormData(formRef.current)
        const data = Object.fromEntries(dataForm)
        try {
            setProgress(true)
            await fetch('http://localhost:3000/api/session/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    if (response.ok) {
                        const res = await response.json()
                        document.cookie = `jwtCookie=${res.token}; expires${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
                        logged()
                        setIsLogged(true)
                        navigate('/')
                        setProgress(false)
                    } else {
                        setLoginError("Invalid email or password")
                        setProgress(false)
                    }
                })
        } catch (error) {
            console.log(error)
        }

    }
    return (
            <Card className=' py-3 self-center w-[30vw] max-h-[70vh] '>
                <CardHeader className='flex justify-center'>
                    <h1 className='text-2xl font-bold'>Iniciar sesión</h1>
                </CardHeader>
                <CardBody className='flex justify-center overflow-hidden'>

                    <form className='grid gap-3' id="login" onSubmit={handleSubmit} ref={formRef}>

                        <Input type="email" variant="underlined" isRequired name="email" label="Email" />

                        <Input type="password" variant="underlined" isRequired name="password" label="Contraseña" />

                        {loginError && <Chip className='place-self-center' variant='bordered' color='danger'>{loginError}</Chip>}

                        {progress ? <Spinner color='primary' className='place-self-center' /> : <Button className='place-self-center' color='primary' type="submit"  > Iniciar sesión </Button>}

                    </form>
                    <Link size='sm' onClick={()=>navigate('/recovery-password')}>Olvidé mi contraseña</Link>
                </CardBody>
                <Divider />
                <CardFooter className='grid gap-4 justify-center'>
                    <h3>¿No tienes una cuenta?</h3>
                    <Button className='place-self-center' color='primary' variant='ghost' onClick={() => navigate('/register')}>Registrarme</Button>
                </CardFooter>

            </Card>
    )
}

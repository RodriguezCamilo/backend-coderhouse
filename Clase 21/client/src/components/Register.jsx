import React, { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Input, Chip, Card, CardBody, CardHeader, CardFooter, Divider } from "@nextui-org/react";
import { LoggedContext } from '../context/LoggedContext';

const Register = () => {

    const { isLogged, userRol } = useContext(LoggedContext)

    const formRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged || userRol) navigate('/')
    }, [isLogged, userRol, navigate])

    const [loginError, setLoginError] = useState()
    const [progress, setProgress] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData(formRef.current)
        const data = Object.fromEntries(dataForm)
        if (isLogged) navigate('/')
        try {
            setProgress(true)
            await fetch('http://localhost:3000/api/session/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        navigate('/login')
                        setProgress(false)
                    } else {
                        setLoginError("Error: user already exist or server not working")
                        setProgress(false)
                    }
                })
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Card className='py-3 self-center min-w-[30vw] max-h-[90vh]'>
            <CardHeader className='flex justify-center'>
                <h1 className='text-2xl font-bold'>Registrarse</h1>
            </CardHeader>
            <CardBody className='flex justify-center overflow-hidden'>
                <form className='grid gap-3' id="register" onSubmit={handleSubmit} ref={formRef}>

                    <Input type="text" variant="underlined" isRequired name="firstName" label="Nombre" />

                    <Input type="text" variant="underlined" isRequired name="lastName" label="Apellido" />

                    <Input type="number" variant="underlined" isRequired name="age" label="Edad" />

                    <Input type="email" variant="underlined" isRequired name="email" label="Email" />

                    <Input type="password" variant="underlined" isRequired name="password" label="Contraseña" />

                    {progress ? <Spinner color='primary' className='place-self-center' /> : <Button className='place-self-center' color='primary' type="submit">Registrarme</Button>}

                    {loginError && <Chip className='place-self-center' variant='bordered' color='danger'>{loginError}</Chip>}
                </form>
            </CardBody>
            <Divider />
            <CardFooter className='grid gap-3'>
                <h3>¿Tienes una cuenta?</h3>
                <Button className='place-self-center' color='primary' variant='ghost' onClick={() => navigate('/login')}>Iniciar sesión</Button>
            </CardFooter>
        </Card>
    );
}

export default Register
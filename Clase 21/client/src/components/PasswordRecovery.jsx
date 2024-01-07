import React from 'react'
import { useEffect, useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoggedContext } from '../context/LoggedContext.jsx';

import { Button, Spinner, Input, Chip, Card, CardBody, CardHeader, CardFooter, Divider } from "@nextui-org/react";

function PasswordRecovery() {

    const {isLogged, userRol} = useContext(LoggedContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if (isLogged || userRol) navigate('/')
    }, [isLogged, userRol, navigate])

    const [progress, setProgress] = useState(false)
    const [recovery, setRecovery] = useState()

    const formRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLogged) navigate('/')
        const dataForm = new FormData(formRef.current)
        const data = Object.fromEntries(dataForm)
        try {
            setProgress(true)
            await fetch('http://localhost:3000/api/users/recovery-password', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    if (response.ok) {
                        setRecovery(`Email sent to ${data.email}`)
                        setProgress(false)
                    } else {
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
                    <h1 className='text-2xl font-bold'>Reestablecer contraseña</h1>
                </CardHeader>
                <CardBody className='flex justify-center overflow-hidden'>

                    <form className='grid gap-3' id="recovery" onSubmit={handleSubmit} ref={formRef}>

                        <Input type="email" variant="underlined" isRequired name="email" label="Email" />

                        {progress ? <Spinner color='primary' className='place-self-center' /> : <Button className='place-self-center' color='primary' type="submit"  > Enviar email </Button>}
                        {recovery && <Chip className='place-self-center' variant='bordered' color='success'>{recovery}</Chip>}

                    </form>
                </CardBody>
                <Divider />
                <CardFooter className='grid gap-4 justify-center'>
                    <h3>¿Ya recuerdas?</h3>
                    <Button className='place-self-center' color='primary' variant='ghost' onClick={() => navigate('/login')}>Iniciar sesión</Button>
                </CardFooter>

            </Card>
  )
}

export default PasswordRecovery
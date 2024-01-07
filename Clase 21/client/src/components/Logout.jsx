import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { LoggedContext } from '../context/LoggedContext';
import { useContext } from 'react';

export const Logout = () => {
    const {isLogged, setIsLogged, setUserRol} = useContext(LoggedContext)

    const navigate = useNavigate()
    const handleClick = async (e) => {
        try {
            await fetch('http://localhost:3000/api/session/logout', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (response.ok) {
                        setIsLogged(false)
                        setUserRol(null)
                        navigate('/')
                    }
                })
                .catch(error => {
                    throw (error)
                })

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Card className=' py-3 self-center w-[30vw] max-h-[70vh] '>
            <CardHeader className='flex justify-center'>
                <h1 className='text-2xl font-bold'>¿Estas seguro que quieres cerrar sesión?</h1>
            </CardHeader>
            <CardBody className='flex flex-auto flex-row flex-wrap justify-around overflow-hidden'>
                <Button className='place-self-center w-[45%] text-lg' color='danger' variant='ghost' onClick={handleClick}>Si</Button>
                <Button className='place-self-center w-[45%] text-lg' color='primary' variant='ghost' onClick={() => navigate('/')}>Volver al inicio</Button>
            </CardBody>

        </Card>
    )
}
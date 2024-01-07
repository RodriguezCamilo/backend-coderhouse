import React from 'react'
import { useEffect, useContext, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoggedContext } from '../context/LoggedContext.jsx';

import { Button, Spinner, Input, Chip, Card, CardBody, CardHeader, CardFooter, Divider } from "@nextui-org/react";

function PasswordRecovery() {

    let { recovery } = useParams()
    const { isLogged, userRol } = useContext(LoggedContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged || userRol) navigate('/')
    }, [isLogged, userRol, navigate])

    const [progress, setProgress] = useState(false)
    const [recoveryInfo, setRecoveryInfo] = useState()
    const [badPass, setBadPass] = useState()

    const formRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLogged) navigate('/')
        const dataForm = new FormData(formRef.current)
        const data = Object.fromEntries(dataForm)
        if (data.newPassword == data.newPassword2) {
            try {
                setProgress(true)
                await fetch(`http://localhost:3000/api/users/reset-password/${recovery}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(async response => {
                        if (response.ok) {
                            setRecoveryInfo(`Password changed successfully`)
                            setProgress(false)
                        } else {
                            setProgress(false)
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
        else{ 
            setBadPass('Passwords must be the same')
        }
    }

    return (
        <Card className=' py-3 self-center w-[30vw] max-h-[70vh] '>
            <CardHeader className='flex justify-center'>
                <h1 className='text-2xl font-bold'>Recovery Password</h1>
            </CardHeader>
            {recoveryInfo ?  <CardBody className='flex justify-center overflow-hidden'> <Chip className='place-self-center' variant='bordered' color='success'>{recoveryInfo}</Chip>  </CardBody>:
                <CardBody className='flex justify-center overflow-hidden'>

                    <form className='grid gap-3' id="recovery" onSubmit={handleSubmit} ref={formRef}>

                        <Input type="password" variant="underlined" isRequired name="newPassword" label="New Password" />
                        <Input type="password" variant="underlined" isRequired name="newPassword2" label="Repeat Password" />

                        {progress ? <Spinner color='primary' className='place-self-center' /> : <Button className='place-self-center' color='primary' type="submit"> Change password </Button>}
                        {badPass && <Chip className='place-self-center' variant='bordered' color='danger'>{badPass}</Chip>}

                    </form>
                </CardBody>}

            <Divider />
            <CardFooter className='grid gap-4 justify-center'>
                <h3>Remember now?</h3>
                <Button className='place-self-center' color='primary' variant='ghost' onClick={() => navigate('/login')}>LogIn</Button>
            </CardFooter>

        </Card>
    )
}

export default PasswordRecovery
import React, { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Input, Chip, Card, CardBody, CardHeader, CardFooter, Divider } from "@nextui-org/react";
import { LoggedContext } from '../context/LoggedContext.jsx';
import { getCookiesByName } from '../utils/cookieUtils.js';

const NewProduct = () => {

    const { isLogged, userRol, logged } = useContext(LoggedContext)
    const navigate = useNavigate()
    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        const checkAuthorization = async () => {
            await logged()

            if (initialRender) {
                setInitialRender(false)
                return
            }

            if (!isLogged || userRol !== "admin") {
                navigate('/')
            }
        }
        checkAuthorization();
    }, [initialRender, isLogged, userRol, navigate]);


    const formRef = useRef(null)

    const [loginError, setLoginError] = useState()
    const [progress, setProgress] = useState(false)
    const [isProduct, setIsProduct] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userRol !== "admin") navigate('/')
        const dataForm = new FormData(formRef.current)
        const data = Object.fromEntries(dataForm)
        const token = getCookiesByName('jwtCookie')
        console.log(token)
        try {
            setProgress(true)
            await fetch('http://localhost:4000/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        setProgress(false)
                        setIsProduct(true)
                    } else {
                        setLoginError("Error")
                        setProgress(false)
                        setIsProduct(false)
                    }
                })
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <Card className=' py-3 self-center min-w-[30vw] max-h-[90vh] '>
            <CardHeader className='flex justify-center'>
                <h1 className='text-2xl font-bold'>New Product</h1>
            </CardHeader>
            <CardBody className='flex justify-center overflow-hidden'>
                {isProduct ? <Chip className='place-self-center' variant='bordered' color='success'>Product loaded successfully!</Chip> : <form className='grid gap-3' id="new-product" onSubmit={handleSubmit} ref={formRef}>

                    <Input type="text" variant="underlined" isRequired name="title" label="Title" />

                    <Input type="text" variant="underlined" isRequired name="description" label="Description" />

                    <Input type="number" variant="underlined" isRequired name="price" label="Price" />

                    <Input type="number" variant="underlined" isRequired name="stock" label="Stock" />

                    <Input type="text" variant="underlined" isRequired name="category" label="Category" />

                    <Input type="text" variant="underlined" isRequired name="code" label="Code" />

                    {progress ? <Spinner color='primary' className='place-self-center' /> : <Button className='place-self-center' color='primary' type="submit">Submit</Button>}

                    {loginError && <Chip className='place-self-center' variant='bordered' color='danger'>{loginError}</Chip>}
                </form>}

            </CardBody>
        </Card>
    );
}

export default NewProduct
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { LoggedContext } from '../context/LoggedContext.jsx';

export default function Nav() {

    const { isLogged, userRol } = useContext(LoggedContext)

    return (
        <nav>
            <Navbar isBordered className='font-semibold'>
                <NavbarBrand>
                    <Link color="foreground" className="font-bold text-3xl text-inherit" to="/">
                        KamShop
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4 " justify="center">
                    <NavbarItem className='font-semibold text-xl hover:underline decoration-2 '>
                        <Link color="foreground" to="/">
                            Inicio
                        </Link>
                    </NavbarItem>
                    <NavbarItem className='font-semibold text-xl hover:underline '>
                        <Link to="/products">
                            Tienda
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                {isLogged ?
                    <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex">
                            <Link to="/cart"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                <path d="M17 17h-11v-14h-2"></path>
                                <path d="M6 5l14 1l-1 7h-13"></path>
                            </svg></Link>
                        </NavbarItem>
                        {userRol == 'admin' && <NavbarItem className="hidden lg:flex">
                            <Button className=' text-lg' as={Link} color="primary" to="/new-product" variant="flat">
                                Agregar producto
                            </Button>
                        </NavbarItem>}
                        <NavbarItem className="hidden lg:flex">
                            <Button className=' text-lg' as={Link} color="danger" to="/logout" variant="flat">
                                Cerrar sesión
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                    : <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex">
                            <Button className=' text-lg' as={Link} color="primary" to="/login" variant="bordered">
                                Iniciar sesión
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button className=' text-lg' as={Link} color="primary" to="/register" variant="flat">
                                Registrarse
                            </Button>
                        </NavbarItem>
                    </NavbarContent>}
            </Navbar>
        </nav>
    )
}
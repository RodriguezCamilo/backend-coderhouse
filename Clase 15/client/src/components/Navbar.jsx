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
                    <Link color="foreground" to="/">
                        <p className="font-bold text-xl text-inherit">KamShop</p>
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" to="/">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="/products">
                            Shop
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                {isLogged ?
                    <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex">
                            <Link to="/cart"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                <path d="M17 17h-11v-14h-2"></path>
                                <path d="M6 5l14 1l-1 7h-13"></path>
                            </svg></Link>
                        </NavbarItem>
                        {userRol == 'admin' && <NavbarItem className="hidden lg:flex">
                            <Button className='font-semibold' as={Link} color="primary" to="/new-product" variant="flat">
                                New product
                            </Button>
                        </NavbarItem>}
                        <NavbarItem className="hidden lg:flex">
                            <Button className='font-semibold' as={Link} color="danger" to="/logout" variant="flat">
                                LogOut
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                    : <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex">
                        <Button className='font-semibold' as={Link} color="primary" to="/login" variant="bordered">
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button className='font-semibold' as={Link} color="primary" to="/register" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </NavbarContent>}
            </Navbar>
        </nav>
    )
}
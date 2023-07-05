/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { logOut } from '../action/auth'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    const uid = localStorage.getItem('uid')
    if (uid === '') {
      document.getElementById('home').style.display = 'none'
      document.getElementById('profile').style.display = 'none'
      document.getElementById('listuser').style.display = 'none'
      document.getElementById('gamelist').style.display = 'none'
      document.getElementById('login').style.display = 'block'
      document.getElementById('logout').style.display = 'none'
    } else {
      document.getElementById('home').style.display = 'block'
      document.getElementById('profile').style.display = 'block'
      document.getElementById('listuser').style.display = 'block'
      document.getElementById('gamelist').style.display = 'block'
      document.getElementById('login').style.display = 'none'
      document.getElementById('logout').style.display = 'block'
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 180) {
      setSticky(true)
    } else if (window.scrollY < 180) {
      setSticky(false)
    }
  }

  const handleClick = () => {
    logOut()
    window.location.assign('/login')
  }

  return (
        <Navbar color="dark" light container="md" expand="md" sticky={sticky ? 'top' : ''}>
            <Image src="/images/prslogo.jpg" width="60" height="60" quality="70" />
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto" navbar>
                    <Nav className="m-auto" navbar>
                        <NavItem>
                            <NavLink color="light" href="/home" id='home'>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink color="light" href="/profile" id='profile'>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink color="light" href="/listuser" id='listuser'>List User</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink color="light" href="/gamelist" id='gamelist'>Game List</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink color="light" href="/login" id='login'>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink color="light" onClick={handleClick} id='logout'>Log Out</NavLink>
                        </NavItem>
                    </Nav>
                </Nav>
            </Collapse>
        </Navbar>
  )
}

export default Header

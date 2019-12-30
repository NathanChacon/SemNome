import React from 'react'
import { useState,useEffect } from 'react';
import { withRouter,Redirect} from 'react-router-dom';
import axios from 'axios'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import './Nav.css'

    const Navigation = (props) =>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [isExtended,setIsExtended] = useState(false)
    const [cancelBtn,setCancelBtn] = useState(false)
    const [burguerBtn,setBurguerBtn] = useState(true)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    
    const handleLogOut = () => {
         axios.get('http://localhost:8080/auth/logout', {withCredentials: true}).then()
    }

    return(
        <div>
      <Navbar style={{backgroundColor: '#970909',position:'fixed',width:'100%',zIndex:'4',fontSize:'1.2em'}} light  expand="md">
        <NavbarBrand href="/" style={{color:'white'}}>Sem Nome</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem  >
              <NavLink style={{color:'white'}} href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/menu"  style={{color:'white'}}>Cardápio</NavLink>
            </NavItem>
            {props.isLogged !== 'v' && props.isLogged ?  <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{color:'white'}}>
                Perfil
              </DropdownToggle>

              <DropdownMenu right>
              <DropdownItem header>Olá {props.userName ? props.userName : '' }</DropdownItem>
                <DropdownItem>
                    Pedidos
                </DropdownItem>
                {props.isManager ? 
                    <DropdownItem>
                       <NavLink  style={{color:'black',padding:'0'}}>Gerenciar</NavLink>
                    </DropdownItem>
                    :''
                }
                <DropdownItem>
                  <a href="http://localhost:8080/auth/logout">Sair</a>
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>:<NavItem>
              <NavLink href="/login" style={{color:'white'}}>Login</NavLink>
            </NavItem> }
           
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    )
}

export default withRouter(Navigation)
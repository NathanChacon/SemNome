import React,{useState,useEffect} from 'react';
import axios from 'axios'
 import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useParams
} from "react-router-dom";
import {Navigation} from './components/nav/Nav'
import {Home} from './components/home/Home'
import {Menu} from './components/menu/Menu'
import {Login} from './components/login/Login'
import PurchaseForm from './components/purchaseForm/PurchaseForm'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [isLogged,setIsLogged] = useState(false)
  const[user,setUser] = useState({
    name:''
  })

    const verifyToken = () => {
      axios.get('http://localhost:8080/auth/check', {withCredentials: true}).then((res) =>{
        if(!isLogged){
          setIsLogged(true)
        } 
        setUser({name:res.data.userName})
      }).catch(e =>{
        setIsLogged(false)
        setUser(null)
      }) 
  }


  return (
    <Router>
      <Navigation isLogged ={isLogged} verifyToken ={verifyToken} user={user}></Navigation>
      <Route exact path="/">
        <Home  isLogged ={isLogged} verifyToken ={verifyToken}></Home>
      </Route>
      <Route exact path='/menu'>
          <Menu isLogged ={isLogged} verifyToken ={verifyToken}></Menu>
      </Route>
      <Route path='/login'>
          <Login isLogged ={isLogged} verifyToken ={verifyToken}></Login>
      </Route>
      <Route path='/purchase'>
          <PurchaseForm isLogged ={isLogged} verifyToken ={verifyToken}></PurchaseForm>
      </Route>
    </Router>
  );
}

export default App;

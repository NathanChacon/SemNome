import React,{useState,useEffect} from 'react';
import axios from 'axios'
 import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useParams
} from "react-router-dom";
import Navigation from './components/nav/Nav'
import {Home} from './components/home/Home'
import {Menu} from './components/menu/Menu'
import {Login} from './components/login/Login'
import {ClientOrders} from './components/clientOrders/ClientOrders'
import Management from './components/management/Management'
import PurchaseForm from './components/purchaseForm/PurchaseForm'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLogged,setIsLogged] = useState(false)
  const[user,setUser] = useState({
    name:'',
    role:''
  })

  const verifyToken = () => {
      axios.get('http://localhost:8080/auth/check', {withCredentials: true}).then((res) =>{
        if(!isLogged){
          setIsLogged(true)
        } 
        setUser({name:res.data.userName,role:res.data.userRole})
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
      <Route exact path='/login'>
          <Login isLogged ={isLogged} verifyToken ={verifyToken}></Login>
      </Route>
      <Route exact path='/purchase'>
          <PurchaseForm isLogged ={isLogged} verifyToken ={verifyToken}></PurchaseForm>
      </Route>
      <Route exact path='/clientOrders'>
          <ClientOrders></ClientOrders>
      </Route>
      <Route exact path='/management'>
          <Management></Management>
      </Route>
    </Router>
  );
}

export default App;


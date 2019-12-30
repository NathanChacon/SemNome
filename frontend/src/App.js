import React,{useState,useEffect} from 'react';
import axios from 'axios'
import './smacss/base.css'
import './smacss/layout.css'
import './smacss/module.css'
import './smacss/colors.css'
 import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useParams
} from "react-router-dom";
import {NotFound} from './components/notFound/NotFound'
import Navigation from './components/nav/Nav'
import {Home} from './components/home/Home'
import {Menu} from './components/menu/Menu'
import {Login} from './components/login/Login'
import ClientOrders from './components/clientOrders/ClientOrders'
import TrackOrder from './components/trackOrder/TrackOrder'
import PurchaseForm from './components/purchaseForm/PurchaseForm'
import {ManagementNav} from './components/management/ManagementNav'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLogged,setIsLogged] = useState('v')
  const [isManager,setIsManager] = useState('v')
  const [userName,setUserName] = useState(false)

  const verifyToken = () => {
      axios.get('http://localhost:8080/auth/check', {withCredentials: true})
      .then((res) =>{
          if(!isLogged || isLogged === 'v'){
              setIsLogged(true)
              setUserName(res.data.userName)
              setIsManager(res.data.manager)
            }
      })
      .catch(e =>{
             setIsLogged(false)
             setUserName(false)
             setIsManager(false)
      }) 
  }

  useEffect(() => {
      verifyToken()
  },[])


  return (
    <Router>
      <Navigation isLogged = {isLogged}  userName={userName} isManager = {isManager}></Navigation>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path='/menu'>
            <Menu></Menu>
        </Route>
        <Route exact path='/login'>
            <Login isLogged ={isLogged} verifyToken ={verifyToken}></Login>
        </Route>
        <Route exact path='/purchase'>
            <PurchaseForm isLogged ={isLogged} ></PurchaseForm>
        </Route>
        <Route exact path='/clientOrders'>
            <ClientOrders></ClientOrders>
        </Route>
        <Route exact path='/trackOrder'>
          <TrackOrder></TrackOrder>
        </Route>
        <Route  path='/management'>
            <ManagementNav></ManagementNav>
        </Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;


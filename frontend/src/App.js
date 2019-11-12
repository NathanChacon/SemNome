import React,{useState,useEffect} from 'react';
import axios from 'axios'
 import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import {Navigation} from './components/nav/Nav'
import {SectionA} from './components/sectionA/SectionA'
import {SectionB} from './components/sectionB/SectionB'
import {SectionC} from './components/sectionC/SectionC'
import {Schedule} from './components/intermediates/Schedule'
import {Ifood} from './components/intermediates/Ifood'
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

  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY)
  })

    const verifyToken = () => {
      console.log('verificando')
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
        <SectionA  isLogged ={isLogged} verifyToken ={verifyToken} ></SectionA>
        <Schedule></Schedule>
        <SectionB></SectionB>
        <Ifood></Ifood>
        <SectionC></SectionC>
      </Route>
      <Route path='/menu'>
          <Menu isLogged ={isLogged} verifyToken ={verifyToken} ></Menu>
      </Route>
      <Route path='/login'>
          <Login isLogged ={isLogged} verifyToken ={verifyToken}></Login>
      </Route>
      <Route path='/purchase'>
          <PurchaseForm></PurchaseForm>
      </Route>
    </Router>
  );
}

export default App;

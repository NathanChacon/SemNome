import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
 export default class Loading extends React.Component {
  //other logic
    render() {
     return(
      <Loader
         type="Oval"
         color="#00BFFF"
         height={100}
         width={100}
         visible ={true}
      />
     );
    }
 }
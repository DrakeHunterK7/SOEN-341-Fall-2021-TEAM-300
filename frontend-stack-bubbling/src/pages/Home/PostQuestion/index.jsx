import React, { Component } from 'react'
import React2 ,{useState}from 'react'


function App(){
  const [data,setData]=useState(null)
  const [print,setPrint]=useState(false)
  
    function getData(val)
    {
      console.warn(val.target.value)
      setData(val.target.value)
      setPrint(false)
    }
    return (
      <div className="App">
       
      

      <div><input type="text" onChange={getData} /></div>


      <button onClick={()=>setPrint(true)} >Post Question</button>

      {
         print?
         <p> {data}</p>
         :null
       }
      </div>
    );
}

export default App;
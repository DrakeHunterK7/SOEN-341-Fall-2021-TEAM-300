import React, { Component } from 'react'
import React2 ,{useState}from 'react'
import "../../../../src/components/QuestionBox/index.css"

var questiontitle = "Please enter your question title";
var questiontext = "Please enter your question text";
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
      
      <div className="question-title">
                  <h3>{questiontitle}</h3>
                </div>
               
                <div className="question-text">
                  <h5>{questiontext}</h5>
                </div>


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
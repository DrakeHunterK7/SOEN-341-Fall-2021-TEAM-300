import React from 'react';
import Header from "../../components/Header"
import QuestionPreviewTemplate from '../../components/QuestionPreviewTemplate';

function index() {
  return (

    
    <div className="list-page-container">
      <Header />

      <QuestionPreviewTemplate 
      username="MXmilan" 
      title="What if elephants are actually just stupid?" 
      text="Think about it."
      />
      <QuestionPreviewTemplate 
      username="TrayMond" 
      title="Can't remember if I have dementia." 
      text="Please help me remember"
      />
      <QuestionPreviewTemplate 
      username="KanyeWestFan" 
      title="Guess who I think is better? Kanye West or Drake?" 
      text="No hints, sorry."
      />
      <QuestionPreviewTemplate 
      username="Dingus" 
      title="How do I learn how to type? I am 80 years old and my fingers tremble a lot." 
      text="I got my grandson to help me type this. Oh and my grandson rocks."
      />
      <QuestionPreviewTemplate 
      username="yuliyong" 
      title="This is not a question. I just saw a raccoon in my backyard." 
      text="Raccoons are so cute"
      />
      
    </div>
  );
}

export default index;

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRef,useState } from 'react';

export default function Home() {

const [feedbackItems,setFeedbackItems]=useState([])

const emailInputRef=useRef();
const feedbackInputRef=useRef();

function feedbackSubmitHandler(e) {
  e.preventDefault();

const enteredEmail=emailInputRef.current.value;
const enteredFeedback=feedbackInputRef.current.value;

const reqBody = {email : enteredEmail , text : enteredFeedback}
// =------ important step starts-------
fetch('/api/feedback' , {
  method:"POST",
  body:JSON.stringify(reqBody),
  headers : {
      'content-Type':'application/json'
  }
})
.then(response => response.json())
.then(data => console.log("dummy feedback data",data));  

// { email:'test@test.com' , text:'some feedback text' }

// =------ important step ends-------

}
function loadFeedbackHandler(params) {
 
  fetch('/api/feedback')
  .then(response => response.json())
  .then(data => {
    setFeedbackItems(data.feedback)
  });  
  
  // { email:'test@test.com' , text:'some feedback text' }
  
  // =------ important step ends-------
  

  
}

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={feedbackSubmitHandler}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email"  ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback </button>
      </form>
      <hr/>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map(items=>
        <li key={items.id}>{items.email}{items.text}</li>

        )}
      </ul>
    </div>
  );
}

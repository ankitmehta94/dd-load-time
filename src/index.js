import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Modal from './Components/Modal/Modal'
import reportWebVitals from './reportWebVitals';


window.addEventListener('load', (event) => {
  const styleLink = document.createElement('link');
  styleLink.setAttribute('href','https://s3-us-west-2.amazonaws.com/ys.survey/ys-survey.css')
  const element = document.createElement('div');
  element.setAttribute('id','ys-survey');
  const head = document.getElementsByTagName('head')[0];
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(element)
  head.appendChild(styleLink)
  ReactDOM.render(
    <React.StrictMode>
      <Modal />
    </React.StrictMode>,
    element
  );
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

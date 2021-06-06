import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Modal from './Components/Modal/Modal'
import reportWebVitals from './reportWebVitals';


window.addEventListener('load', (event) => {
  const element = document.createElement('div');
  element.setAttribute('id','ys-survey');
  const body = document.getElementsByTagName('body')[0];
  console.log(body)
  body.appendChild(element)
  ReactDOM.render(
    <React.StrictMode>
      <Modal />
    </React.StrictMode>,
    element
  );
})
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

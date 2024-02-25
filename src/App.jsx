import './App.css'
import headsImg from './assets/heads.svg'
import tailsImg from './assets/tails.svg'
import { useState } from 'react'


function App() {
  const [balance, setBalance] = useState(500);

  function flipCoin(playerChoice) {
    let coin = document.querySelector(".coin");
    let i = Math.floor(Math.random() * 2);
    let bet = document.querySelector('#bet-input').value;
    let textField = document.querySelector('#text');
    textField.innerHTML = '';
    coin.style.animation = 'none';

    if (bet <= 0) {
      textField.innerHTML = 'Enter amount';
      return;
    }

    if (bet > balance) {
      textField.innerHTML = 'insufficient funds';
      return;
    }

    if (i) {
      setTimeout(() => {
        coin.style.animation = 'spin-heads 3s forwards';
      }, 100);
    }
    else {
      setTimeout(() => {
        coin.style.animation = 'spin-tails 3s forwards';
      }, 100);
    }
    disableButton();

    if (playerChoice == i) {
      setBalance(balance + (bet * 2));
      setTimeout(() => {
        textField.innerHTML = `You won ${bet * 2}$ !`;
      }, 3000);
    }
    else {
      setBalance(balance - bet);
      setTimeout(() => {
        textField.innerHTML = `You lost ${bet}$ :(`;
      }, 3000);
    }
  }

  function disableButton() {
    let flipbtns = document.querySelectorAll('#flip-button');

    flipbtns.forEach(flipbtn => {
      flipbtn.disabled = true;

      setTimeout(() => {
        flipbtn.disabled = false;
      }, 3000);

    });
  }

  return (
    <>
      <div className='container'>
        <div className='stats'>
          <p id='balance'>Balance: {balance}$</p>
          <p id='text'></p>
        </div>

        <div className='coin'>
          <div className='heads'>
            <img src={headsImg} />
          </div>

          <div className='tails'>
            <img src={tailsImg} />
          </div>
        </div>

        <div className='buttons'>
          <input id='bet-input' type='number' placeholder='Enter amount' />
          <button id='flip-button' onClick={() => flipCoin(1)} >Heads</button>
          <button id='flip-button' onClick={() => flipCoin(0)} >Tails</button>
        </div>
      </div>
    </>
  )
}

export default App

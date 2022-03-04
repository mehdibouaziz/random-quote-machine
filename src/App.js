import './App.css';
import quotes from './quotes.json'
import { useState, useEffect } from 'react';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [color, setColor] = useState(['#635581','#aba0c2']);
  const [colorNum, setColorNum] = useState(5);
  const quoteLib = JSON.parse(JSON.stringify(quotes));  /* Array containing quote objects {quote, author} */

  /* color library: [color, background-color] */
  const colorLib = [
    ['#678167','#a5c9a5'], /*green*/
    ['#5d8584','#88bdbc'], /*blue*/
    ['#755463','#c4a2b2'], /*red*/
    ['#805d49','#c9a794'], /*orange*/
    ['#8d7f31','#dfd390'], /*yellow*/
    ['#635581','#aba0c2'], /*purple*/
  ];

  const generateQuote = () => {
    const rand = Math.floor(Math.random() * quoteLib.length);
    setQuote(quoteLib[rand].quote);
    setAuthor(quoteLib[rand].author);
    let colorRand = colorNum;
    while(colorRand === colorNum) {colorRand = Math.floor(Math.random() * colorLib.length)};
    setColor(colorLib[colorRand]);
    setColorNum(colorRand);
  };

  useEffect(generateQuote,[])

  return (
    <div
      className='container'
      id='appContainer'
      style={{
      color: color[0],
      backgroundColor: color[1]
      }}
      >
        <div className='quote-box' id='quote-box'>
          <h1 className="text" id='text'>"{quote}"</h1>
          <h2 className="author" id='author'> - {author}</h2>

          <div className='container' id='btnContainer'>
            <button
              onClick={generateQuote}
              className="btn btn-light btn-sm"
              id='new-quote'
              style={{backgroundColor:color[1], color:color[0]}}
              >New Quote</button>
          </div>
        </div>
      </div>
  );
}

export default App;

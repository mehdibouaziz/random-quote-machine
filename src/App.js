import './App.css';
import quotes from './quotes.json'
import { useState, useEffect } from 'react';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [colorNum, setColorNum] = useState(5);  /* stores the current color number to avoid using the same color twice */
  const [isLoading, setIsLoading] = useState(false);
  const quoteLib = JSON.parse(JSON.stringify(quotes));  /* Array containing local quote objects as fallback in case of API error {quote, author} */

  /* color library: [color, background-color] */
  const colorLib = [
    ['#678167','#a5c9a5'], /*green*/
    ['#5d8584','#88bdbc'], /*blue*/
    ['#755463','#c4a2b2'], /*red*/
    ['#805d49','#c9a794'], /*orange*/
    ['#8d7f31','#dfd390'], /*yellow*/
    ['#635581','#aba0c2'], /*purple*/
  ];

  const colorRandomizer = () => {
    let colorRand = colorNum;
    while(colorRand === colorNum) {colorRand = Math.floor(Math.random() * colorLib.length)};
    setColorNum(colorRand);
  };

  /* fallback quote generator in case of API error */
  const localQuote = () => {
    const rand = Math.floor(Math.random() * quoteLib.length);
    setQuote(quoteLib[rand].quote);
    setAuthor(quoteLib[rand].author);
    colorRandomizer();
  };

  const requestQuote = async () => {
    /* Quotes provided by : https://github.com/lukePeavey/quotable  */
    setIsLoading(true);
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      colorRandomizer();
    } catch(err) {
      localQuote();
      colorRandomizer();
      alert("API request error! But here's a random quote we had in stock.\n\n" + err.message )
    } finally {
      setIsLoading(false);
    }
  };

  /* generates a quote once on page load */
  useEffect(requestQuote,[])

  return (
    <div
      className='container'
      id='appContainer'
      style={{
      color: colorLib[colorNum][0],
      backgroundColor: colorLib[colorNum][1]
      }}
      >
        <div className='quote-box' id='quote-box'>
          <h1 className='text' id='text' style={isLoading ? {display:'none'}:{display:'block'}}>"{quote}"</h1>
          <h2 className='author' id='author' style={isLoading ? {display:'none'}:{display:'block'}}> - {author}</h2>

          <div style={isLoading ? {display:'block', width:'40vw'}:{display:'none'}}>
            <div className='placeholder-box placeholder-glow'>
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </div>

            <div className='placeholder-box placeholder-glow' style={{justifyContent:'flex-end',margin:'15px 0 0 0',fontSize:'1.5em'}}>
              <span class="placeholder col-4 placeholder"></span>
            </div>
          </div>

          <div className='container' id='btnContainer'>
            <button
              onClick={requestQuote}
              className="btn btn-light btn-sm"
              id='new-quote'
              style={{backgroundColor: colorLib[colorNum][1], color: colorLib[colorNum][0]}}
              >New Quote</button>
          </div>
        </div>
      </div>
  );
}

export default App;

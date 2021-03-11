import './App.css';
import React from 'react';

function App() {
  const [textInput, setTextInput] = React.useState(`This is
  a badly formatted file. This line is pretty long! It's way more than 80 characters! I feel a line wrap coming on!

  This      is a second paragraph with extraneous whitespace.`);
  const [textOutput, setTextOutput] = React.useState('');

  const handleChange = event => {
    setTextInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    transformText(textInput);
  };

  const transformText = input => {
    const maxLineLength = 80;
    let output = '';

    const paragraphs = formParagraphs(input);
    for (const paragraph of paragraphs) {
      const words = formWords(paragraph);
      let charCount = 0;

      for (const word of words) {
        if (word.length > maxLineLength) {
          //if single word exceeds 80 characters
          output += word + ' \n';
        } else {
          if (charCount + word.length >= maxLineLength) {
            charCount = 0;
            output += '\n';
          }
          output += word + ' ';
          charCount += word.length + 1;
        }
      }
      output += '\n\n';
    }
    setTextOutput(output);
  };

  const formParagraphs = entireText => {
    return entireText.split('\n\n');
  };

  const formWords = paragraph => {
    return paragraph.trim().split(/\s+/);
  };

  return (
    <div className='App'>
      <header>
        <h1>Career Lab | Take-Home Assignment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea onChange={handleChange} value={textInput} />
        </label>
        <input type='submit' value='Submit' />
      </form>
      <div id='result'>{textOutput}</div>
    </div>
  );
}

export default App;

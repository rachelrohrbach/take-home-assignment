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

  //Lines should not exceed 80 characters
  // If the 81st char is the middle of the word, break the line on the closest previous space
  // If a single word exceeds 80 characters, leave that word intact on a line by itself (this is an exception to the 80-character-per-line limit).
  // One blank line between paragraphs.
  // No more than one consecutive space or blank line in the formatted text -- collapse multiples into a single space or line.

  const transformText = input => {
    // let output = input;
    console.log(input.length);
    const maxLineLength = 80;

    let output = '';

    let paragraphs = input.split('\n\n');
    console.log(paragraphs);
    for (const paragraph of paragraphs) {
      let words = paragraph.split(/\s+/);
      console.log(words);
      let charCount = 0;

      for (let i = 0; i < words.length; i++) {
        if (words[i].length > maxLineLength) {
          output += words[i] + ' \n';
        } else {
          if (charCount + words[i].length < maxLineLength) {
            output += words[i] + ' ';
            charCount += words[i].length + 1;

          } else {
            charCount = 0;
            output += '\n';

            output += words[i] + ' ';
            charCount += words[i].length + 1;

          }
        }
      }
      output += '\n\n';
    }

    /*
    your work goes here!
    */
    setTextOutput(output);
    // "someone's in the house\n\ntwo"
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

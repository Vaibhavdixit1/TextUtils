import React, { useState } from "react";

export default function TextForm(props) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleuppercaseclick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
    // Stop speaking when text is changed
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speak = () => {
    if (isSpeaking) {
      // Stop speaking
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      props.showAlert("Text Speaking Stopped!", "success");
    } else {
      // Start speaking
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      msg.lang = 'hi-IN';
      window.speechSynthesis.speak(msg);
      setIsSpeaking(true);
      props.showAlert("Text is Speaking!", "success");
    }
  };

  const handleClearClick = () => {
    let newText = '';
    setText(newText);
    // Stop speaking when text is cleared
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    props.showAlert("Text Cleared!", "success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    // Stop speaking when text is copied
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    props.showAlert("Text Copied!", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/\s+/);
    setText(newText.join(" "));
    // Stop speaking when extra spaces are removed
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    props.showAlert("Extra spaces removed!", "success");
  };

  const [text, setText] = useState("");

  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h1 className='mb-4'>{props.heading}</h1>
        <div>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={text}
              onChange={handleOnChange}
              style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}
              id="myBox"
              rows="8"
            ></textarea>
          </div>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-success mx-2"
          onClick={handleuppercaseclick}
        >
          Convert to Uppercase
        </button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2" onClick={handleLoClick}>
          Convert to LowercAse
        </button>
        <button
          disabled={text.length === 0}
          type="submit"
          onClick={speak}
          className={`btn ${isSpeaking ? 'btn-danger' : 'btn-warning'} mx-2 my-2`}
        >
          {isSpeaking ? 'Stop Speaking' : 'Speak'}
        </button>
        <button disabled={text.length === 0} className="btn btn-info mx-1 my-1" onClick={handleClearClick}>
          Clear Text
        </button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>
          Copy Text
        </button>
        <button disabled={text.length === 0} className="btn btn-danger mx-1 my-1" onClick={handleExtraSpaces}>
          Remove Extra Spaces
        </button>
      </div>
      <div className="container my-2 " style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h2>Your text summary</h2>
        <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!!!!!!!!!!"}</p>
      </div>
    </>
  );
}

import React from 'react';

export default function Form(props) {
  return (
    <div>
      <div className="inputForm">
        <input className="inputField" type="text" name="username" placeholder=" Username" />
      </div>
      
      <div className="inputForm">
        <input className="inputField" type="password" name="password" placeholder=" Password" />
      </div>

      <div className="inputForm buttonForm">
        <input className="buttonField" type="submit" value="Enviar" onClick={props.buttonClick} />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

const Login = ({ handleSetUserName, userName = '', loginError = '', setLoginError}) => {

  const [inputName, setInputName] = useState(userName);
  const [confirmed, setConfirmed] = useState(!!userName);

  useEffect(() => {
    if (loginError) {
      setConfirmed(false);
      handleSetUserName('');
    } else if (userName) {
      setConfirmed(true);
    }
  }, [loginError, userName, handleSetUserName]);


  const handleInput = (e) => {
    const input = e.target.value.substr(0, 12);
    setLoginError('');
    setInputName(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirmed) {
      setConfirmed(false)
      handleSetUserName('');
    } else if (inputName) {
      handleSetUserName(inputName);
      if (!loginError) {
        setConfirmed(true);
      }
    }
  };

  return (
    <form className="set-name section" onSubmit={handleSubmit}>
      <div className="title">User name</div>
      {confirmed ?
        <div className="input-body">
          <span className="name-span">{userName}</span>
          <button className="button confirm edit" type='submit'>Edit</button>
        </div>
        :
        <div className="input-body">
          <span className="input-span"><input value={inputName} placeholder="Enter user name" onChange={(e) => handleInput(e) } /></span>
          <button className="button confirm" type='submit'>Confirm</button>
          {loginError && <div className="validation-error">{loginError}</div>}
        </div>
      }
    </form>
  );
};

export default Login;
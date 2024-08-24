import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = isSignup
      ? { 'Private-Key': '417da9ab-8b13-4c21-80fc-20d4930ab56f' }
      : { 'Project-ID': '578fbaad-f0b8-4fd0-808f-7264e460c354', 'User-Name': username, 'User-Secret': password };

    try {
      if (isSignup) {
        await axios.post('https://api.chatengine.io/users/', 
          { username, secret: password }, 
          { headers: authObject }
        );
      } else {
        await axios.get('https://api.chatengine.io/chats', { headers: authObject });
      }

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(isSignup ? 'Error creating user, please try again.' : 'Incorrect credentials, please try again.');
    }
  };

  return (
    <div className='wrapper'>
    <div className='form'>
      <h2 className='title'>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className='input'
          placeholder="Username" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className='input'
          placeholder="Password" 
          required 
        />
        <div align='center'>
        <button type="submit" className='button'>{isSignup ? 'Sign Up' : 'Login'}</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <div align='center'>
      <button onClick={toggleForm} className='button'>
        {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
      </button>
      </div>
    </div>
    </div>
  );
};

export default Form;

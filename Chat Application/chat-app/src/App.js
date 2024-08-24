import React from 'react';
import Form from './components/AuthForm';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import './App.css';

const projectID = '578fbaad-f0b8-4fd0-808f-7264e460c354'

const App = () => {
  if (!localStorage.getItem('username')) return <Form />;
  return (
    <ChatEngine
    height="100vh"
    projectID={projectID}
    userName={localStorage.getItem('username')}
    userSecret={localStorage.getItem('password')}
    renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
  />
  );
};

export default App;

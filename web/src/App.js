import './App.css';
import './styles/reset.css';
import { useState } from 'react';
import { makeRequest } from './api/api';
import SideMenu from './components/SideMenu/Sidemenu';
import ChatMessage from './components/ChatMessage/ChatMessage';

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "Como posso te ajudar hoje?"
  }]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() === "") return; // Não envia mensagem vazia

    setChatLog(prevChatLog => [
      ...prevChatLog,
      { user: 'me', message: input }
    ]);

    try {
      let response = await makeRequest({ prompt: input });
      response = response.data.split('\n').map((line, index) => <p key={index}>{line}</p>);

      setChatLog(prevChatLog => [
        ...prevChatLog,
        { user: 'gpt', message: response }
      ]);
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }

    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <div className='App'>
      <SideMenu />
      <section className='chatbox'>
        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
            <textarea
              rows='1'
              className='chat-input-textarea'
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;

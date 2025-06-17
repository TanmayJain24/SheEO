// import React, { useState, useRef } from 'react';
// import './Chatbot.css';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hello! I'm your SheEO assistant. Ask me about our community, funding, or how to join.", sender: 'bot' }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const messagesEndRef = useRef(null);


// const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;
  
//     // Add user message
//     const userMessage = { text: inputValue, sender: 'user' };
//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');
  
//     try {
//       // Ensure this matches your backend endpoint
//       const response = await fetch('http://localhost:8000/api/v1/chatbot/chatb', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: inputValue })
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const data = await response.json();
//       setMessages(prev => [...prev, { text: data.answer, sender: 'bot' }]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => [...prev, { 
//         text: "Sorry, I'm having trouble connecting. Please try again later.", 
//         sender: 'bot' 
//       }]);
//     }
//   };

//   // Auto-scroll to bottom
//   React.useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <>
//     <div className="chatbot-container">
//       <div className="chatbot-header">
//         <h3>SheEO Assistant</h3>
//       </div>
//       <div className="chatbot-messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
     
//     </div>
//      <form style={{marginTop: "100%"}} onSubmit={handleSubmit} className="chatbot-input">
//      <input
//        type="text"
//        value={inputValue}
//        onChange={(e) => setInputValue(e.target.value)}
//        placeholder="Ask about SheEO..."
//        autoFocus
//      />
//      <button type="submit">Send</button>
//    </form>
//    </>
//   );
// };

// export default Chatbot;





import React, { useState, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your SheEO assistant. Ask me about our community, funding, or how to join.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
  
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
  
    try {
      const response = await fetch('http://localhost:8000/api/v1/chatbot/chatb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue })
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
  
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.answer, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting. Please try again later.", 
        sender: 'bot' 
      }]);
    }
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h3>SheEO Assistant</h3>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="chatbot-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about SheEO..."
            autoFocus
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
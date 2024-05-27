import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const EmailForm = ({ userEmail }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_yxxyc6h',
      'template_pye7k43',
      e.target,
      'YOUR_USER_ID'
    )
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        name="user_email" 
        defaultValue={userEmail} 
        required 
      />
      <input 
        type="text" 
        name="subject" 
        value={subject} 
        onChange={(e) => setSubject(e.target.value)} 
        placeholder="Subject" 
        required 
      />
      <textarea 
        name="message" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Enter your message" 
        required 
      />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;

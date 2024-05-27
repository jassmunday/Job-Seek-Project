import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";


export default function MyForm({ email }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const baseUrl = 'http://localhost:5000';

  const sendEmail = async () => {
    if (!subject || !message) {
      toast.error('Subject and message cannot be empty');
      return;
    }

    let dataSend = {
      email: email,
      subject: subject,
      message: message,
    };

    setLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/email/sendEmail`, dataSend, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log(res);
      toast.success('Email sent successfully!');
      setSubject(''); 
      setMessage('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container_r">
      <div className="box_r">
        <div className="form-control_r">
          <label className="form-label_r" htmlFor="email">Email address</label>
          <input
            className="input_r"
            id="email"
            type="email"
            placeholder="Receiver's Email Address"
            value={email}
            readOnly
          />
        </div>
        <div className="form-control_r">
          <label className="form-label_r" htmlFor="subject">Subject</label>
          <input
            className="input_r"
            id="subject"
            type="text"
            placeholder="Enter the subject here..."
            value={subject} // Bind the input value to state
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-control_r">
          <label className="form-label_r" htmlFor="message">Message</label>
          <textarea
            className="textarea_r"
            id="message"
            placeholder="Enter your message here..."
            value={message} // Bind the textarea value to state
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="form-control_r">
          <button className="button_r" onClick={sendEmail} disabled={loading}>
            {loading ? 'Email Sent' : 'Send Email'}
          </button>
        </div>
      </div>
    </div>
  );
}

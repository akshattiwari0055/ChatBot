import React from 'react'
import './ChatSection.css'
import Darkmode from '../Darkmode/Darkmode'
import { IoSend } from "react-icons/io5";
import { dataContext } from '../../context/UserContext';
import user from '../../assets/user.png'
import ai from '../../assets/ai.png'
const ChatSection = () => {

  let { sent ,input, setInput, showResult, loading, resultData , recentPrompt } = React.useContext(dataContext);
  return (
    <div className='chatsection'>
      <div className="topsection">
        {!showResult?<div className="headings">
          <span>Hello User,</span>
          <span>Welcome to the Chat!</span>
          <span>What can I help you with today?</span>
        </div>:<div className='result'>
            <div className="userbox">
              <img src={user} alt="" width="60px"/>
              <p>{recentPrompt}</p>
            </div>
                <div className="aibox">
            <img src={ai} alt="" width="60px"/>
            {loading?<div className='loader'>
                <hr />
                <hr />
                <hr />
            </div>:<p>{resultData}</p>}
            </div>
        </div>
        }
      </div>

      <div className="bottomsection">
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input?        <button 
          className="sentbtn" 
          onClick={() => {
            sent(input);
            setInput("");
          }}
        >
          <IoSend />
        </button>:""}


        <Darkmode/>
      </div>
    </div>
  )
}

export default ChatSection
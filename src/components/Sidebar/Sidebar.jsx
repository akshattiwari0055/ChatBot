import React, { useContext, useState, useEffect } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import './Sidebar.css'
import { dataContext } from '../../context/UserContext';

function Sidebar() {

    const [extend, setExtend] = useState(false); // desktop expand
    const [open, setOpen] = useState(false);     // mobile open
    const [isMobile, setIsMobile] = useState(false);

    const { sent, prevPrompt, newChat } = useContext(dataContext);

    // detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <>
            {/* 🔥 Mobile hamburger */}
            {isMobile && (
                <GiHamburgerMenu 
                    id='ham' 
                    onClick={() => setOpen(true)} 
                />
            )}

            {/* 🔥 Overlay */}
            {open && isMobile && (
                <div className="overlay" onClick={() => setOpen(false)} />
            )}

            {/* 🔥 Sidebar */}
            <div className={`sidebar ${open ? "open" : ""}`}>
                
                {/* Top hamburger (close / expand) */}
                <GiHamburgerMenu 
                    onClick={() => {
                        if (isMobile) setOpen(false);
                        else setExtend(prev => !prev);
                    }}
                />

                {/* New Chat */}
                <div className="newchat" onClick={() => {
                    newChat();
                    if (isMobile) setOpen(false);
                }}>
                    <FaPlus />
                    {(extend || isMobile) && <p>New Chat</p>}
                </div>

                {/* Recent Chats */}
                {prevPrompt?.map((item, index) => (
                    <div 
                        className="recent" 
                        key={index}
                        onClick={() => {
                            sent(item);
                            if (isMobile) setOpen(false);
                        }}
                    >
                        <FaRegMessage id='chat' />
                        {(extend || isMobile) && (
                            <p>{item.slice(0, 18) + "..."}</p>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Sidebar;
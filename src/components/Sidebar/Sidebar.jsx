import React, { useContext, useState, useEffect } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus, FaRegMessage } from "react-icons/fa6";
import './Sidebar.css'
import { dataContext } from '../../context/UserContext';

function Sidebar() {

    const [extend, setExtend] = useState(true); 
    const [open, setOpen] = useState(false);    
    const [isMobile, setIsMobile] = useState(false);

    const { sent, prevPrompt, newChat } = useContext(dataContext);

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
            {isMobile && (
                <GiHamburgerMenu
                    id='ham'
                    onClick={() => setOpen(true)}
                />
            )}

            {open && isMobile && (
                <div className="overlay" onClick={() => setOpen(false)} />
            )}

            <div className={`sidebar 
                ${open ? "open" : ""} 
                ${extend ? "extend" : "collapse"}`}>

                {/* Top Hamburger */}
                <GiHamburgerMenu
                    className="menu"
                    onClick={() => {
                        if (isMobile) setOpen(false);
                        else setExtend(prev => !prev);
                    }}
                />

                <div
                    className="newchat"
                    onClick={() => {
                        newChat();
                        if (isMobile) setOpen(false);
                    }}
                >
                    <FaPlus />
                    {(extend || isMobile) && <p>New Chat</p>}
                </div>

                <div className="recentList">
                    {prevPrompt?.map((item, index) => (
                        <div
                            className="recent"
                            key={index}
                            onClick={() => {
                                sent(item);
                                if (isMobile) setOpen(false);
                            }}
                        >
                            <FaRegMessage />
                            {(extend || isMobile) && (
                                <p>{item.slice(0, 18)}...</p>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Sidebar;
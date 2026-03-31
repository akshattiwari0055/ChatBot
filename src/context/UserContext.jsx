import React, { createContext, useState } from 'react'
import main from '../gemini';

export const dataContext = createContext();

function UserContext(props) {

    const [input, setInput] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]); 
    function newChat(){
        setShowResult(false);
        setLoading(false);
    }

    async function sent(prompt){
        if(!prompt || prompt.trim() === "") return;

        setRecentPrompt(prompt);   
        setShowResult(true);
        setLoading(true);

        setPrevPrompt(prev => [...prev, prompt]); 
        let result = await main(prompt);   
        setResultData(result.split("**") && result.split("*"));
        setResultData(result);   
        setLoading(false);      
    }

    const data = {
        sent,
        input,
        setInput,
        showResult,
        loading,
        resultData,
        recentPrompt,
        prevPrompt,
        newChat   
    }

    return (
        <dataContext.Provider value={data}>
            {props.children}
        </dataContext.Provider>
    )
}

export default UserContext
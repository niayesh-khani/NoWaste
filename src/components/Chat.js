import * as React from 'react';
import * as MU from '@mui/material';
import Fab from '@mui/material/Fab';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { useState } from 'react';
import './Chat.css';


const  Chat= () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleFabClick = () => {
        setIsChatOpen(true);
    };

    return (
    <div>
        <Fab
            style={{ backgroundColor: "#ffa600", position: "fixed", left: "20px", bottom: "20px"}}
            aria-label="add"
            onClick={handleFabClick}
        >
            <HeadsetMicIcon />
            
        </Fab>
        {/* {isChatOpen && (
                // Render your chat box component here
            
        )} */}


    </div>
    );
}

export default Chat;
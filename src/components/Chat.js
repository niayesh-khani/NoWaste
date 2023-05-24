import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
// import ReactScrollToBottom from "react-scroll-to-bottom";
import './Chat.css'
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const [isChatOpen, setIsChatOpen] = useState(false);
    const handleFabClick = () => {
        setIsChatOpen(prevState => !prevState); 
    };

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    return (
        <div>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition >
            {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
                <Paper className='chatPage'>
                    <div className="chatContainer">
                        <Typography>
                            <div className="chat-header">
                                <h2 className='chat-title'>Support chat</h2>
                            </div>
                            <div className="chatBox">
                                salam
                            </div>
                            <div className="inputBox">
                                <input onKeyPress={(event) => event.key === 'Enter'} type="text" id="chatInput" />
                                <Button><SendIcon/></Button>
                            </div>
                        </Typography>
                    </div>
                </Paper>
            </Fade>
            )}
        </Popper>
        

















            <Fab
                style={{ backgroundColor: "#ffa600", position: "fixed", left: "20px", bottom: "20px" }}
                aria-label="add"
                // onClick={handleFabClick}
                onClick={handleClick('top')}
            >
                <HeadsetMicIcon />
            </Fab>
            {/* {isChatOpen && (
                <div className="chatPage">
                    <div className="chatContainer">
                    <div className="header">
                        <h2>Support</h2>
                        
                    </div>
                    </div>
    
                </div>
            )} */}
        </div>

        
    );
}

export default Chat;

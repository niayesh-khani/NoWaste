import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import './Chat.css'
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
// import {w3websocket} from "websocket";
import {useRef } from "react";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


const Chat = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    // const client = new w3websocket();
    const socket = useRef(null);
    socket.current = new WebSocket(
        `ws://localhost:8000/ws/socket-server/board/?token=${localStorage.getItem(
            "access_token"
        )}`
    );
    socket.current.onopen = () => {
        console.log("WebSocket connection opened");
        socket.current.send(
            JSON.stringify({
                type: "join_board_group",
                // data: { board_id: boardId },
            })
            );
        };

    socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        // dnd_socket(message, message.type);
        };
    
        socket.current.onclose = () => {
        console.log("WebSocket connection closed");
        };
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const onChange = (event) => {
        setUserMessage(event.target.value);
        
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };
    const sendMessage = () => {
        const updatedMessage = userMessage.trim();
        if (updatedMessage !== '') {
            setMessages((prevMessages) => [...prevMessages, updatedMessage]);
            setUserMessage('');
        }
    };
        

    


    return (
        <div>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition className='chat-poper'>
            {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
                <List sx={{ width: '100%' }}>  
                    <Paper className='chatPage'>
                        <Grid className="chatContainer">
                            
                            <Grid className="chat-header">
                                <h2 className='chat-title'>Support chat</h2>
                            </Grid>
                                
                                {messages.map((msg, index) => (
                                    <ListItem key={index} className='chat-listitem'>
                                        <ListItemText primary={msg} style={{ wordWrap: 'break-word' }}/>
                                    </ListItem>
                                ))}   
                            
                            <Grid className="inputBox">
                                <textarea onKeyPress={handleKeyPress} onChange={onChange} value={userMessage} id="chatInput" />
                                <Button disabled={userMessage.length < 1} onClick={sendMessage}><SendIcon className='chat-send'/></Button>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </List>
            </Fade>
            )}
        </Popper>
            <Fab
                style={{ backgroundColor: "#ffa600", position: "fixed", left: "20px", bottom: "20px" }}
                aria-label="add"
                onClick={handleClick('top')}
            >
                {open ? <CloseIcon /> : <HeadsetMicIcon />}
            </Fab>
        </div>

        
    );
}

export default Chat;

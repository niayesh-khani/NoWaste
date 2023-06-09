import React, { useEffect, useMemo, useState } from 'react';
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
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useEffectOnce } from './useEffectOnce';


const Chat = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    // const client = new w3websocket();
    const [times, setTimes] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [num, setNum] = useState(1);
    // const socket = useRef(null);
    const userId = localStorage.getItem('id');
    const restaurantId = localStorage.getItem('restaurantId');
    let room_name = userId < restaurantId ? userId + "_" + restaurantId: restaurantId + "_" + userId;
    // client = new WebSocket(
    //     // `ws://localhost:8000/ws/socket-server/board/?token=${localStorage.getItem(
    //     //     "access_token"
    //     // )}`
    //     // `http://5.34.195.16/chat/room/${userId}/${restaurantId}/`
    //     `ws://5.34.195.16:4000/chat/room/${room_name}/`
    // );
    const [client, setClient] = useState(null);
    useEffectOnce(() => {
        // setClient(new WebSocket(
        //     `ws://5.34.195.16:4000/chat/room/${room_name}/`
        // ));
        const client_1 = new WebSocket(
            `ws://5.34.195.16:4000/chat/room/${room_name}/`
        );
        client_1.onopen = () => {
            setNum(curr=>curr+1);
            console.log("WebSocket connection opened" + num);
            // setNum(2);
            // client.send(
            //     JSON.stringify({
            //         type: "join_board_group",
            //         // data: { board_id: boardId },
            //     })
            // );
        };
        client_1.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            // dnd_socket(message, message.type);
        };
        client_1.onclose = () => {
            console.log("WebSocket connection closed");
        };
        setClient(client_1);
    });
    // const client = useMemo(() => 
    //     new WebSocket(
    //         `ws://5.34.195.16:4000/chat/room/${room_name}/`
    //     )
    // , []);
    // client.onopen = () => {
    //     setNum(curr=>curr+1);
    //     console.log("WebSocket connection opened" + num);
    //     // setNum(2);
    //     // client.send(
    //     //     JSON.stringify({
    //     //         type: "join_board_group",
    //     //         // data: { board_id: boardId },
    //     //     })
    //     // );
    // };

    
    const effectHide = useRef(false);
    // client.onmessage = (event) => {
    //     const message = JSON.parse(event.data);
    //     console.log(message);
    //     // dnd_socket(message, message.type);
    // };
    
    // client.onclose = () => {
    //     console.log("WebSocket connection closed");
    // };
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const handleMessage = (event) => {
        setUserMessage(event.target.value);
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };
    // const messageHistory=
    const sendMessage = () => {
        const updatedMessage = userMessage.trim();
        if (updatedMessage !== '') {
            setMessages((prevMessages) => [...prevMessages, updatedMessage]);
            setUserMessage('');
            setTimes((prevTimes) => [...prevTimes, new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})]);
            client.send(
                JSON.stringify({
                    message : userMessage,
                    user_id : userId,
                    username : "Hanie",
                    room_name : room_name
                    // type: "join_board_group",
                    // data: { board_id: boardId },
                })
            );
        }
    };
    const handleCloseSocket = (e) => {
        client.close();
        // console.log("")
    }

    return (
        <div>
            <button onClick={handleCloseSocket}>Close socjet</button>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition className='chat-poper'>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <List sx={{ width: '100%' }}>  
                        <Paper className='chatPage'>
                            <Grid className="chatContainer">
                                <Grid className="chat-header">
                                    <h2 className='chat-title'>Support chat</h2>
                                </Grid>
                                <ReactScrollToBottom className="chatBox">
                                        {messages.map((msg, index) => (
                                            <ListItem key={index} className='chat-listitem-right'>
                                                <ListItemText primary={msg} style={{ wordWrap: 'break-word' }}/>
                                            {/* {index === messages.length - 1 && <p className='chat-time'>{new Date().toLocaleTimeString(undefined, options)}</p>} */}
                                            {/* {index === messages.length - 1 && (<p className='chat-time'>{formatTime(new Date(), options)}</p>)} */}
                                            <p className='chat-time'>{times[index]}</p>
                                            </ListItem>
                                        ))}   
                                </ReactScrollToBottom >
                                <Grid className="inputBox">
                                    <textarea onKeyPress={handleKeyPress} onChange={handleMessage} value={userMessage} id="chatInput" rows={1}/>
                                    <Button 
                                    // disabled={userMessage.length < 1} 
                                        onClick={sendMessage}>
                                        <SendIcon className='chat-send'/>
                                    </Button>
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

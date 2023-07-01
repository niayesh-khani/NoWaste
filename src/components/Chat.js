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
import axios from 'axios';
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
          main: '#e74c3c',
        },
        secondary: {
          main: '#ffa600',
        }
    },
    overrides: {
        MuiFormLabel: {
            asterisk: {
                color: '#db3131',
                '&$error': {
                color: '#db3131'
                },
            }
        }
    }
});

const Chat = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const restaurant_id = props.restaurant;
    const customer_id = props.customer;
    const sender_id = props.sender;
    let room_name = customer_id < restaurant_id ? customer_id + "_" + restaurant_id: restaurant_id + "_" + customer_id;
    useEffect(() => {
        axios.get(`http://5.34.195.16/chat/room/${customer_id}/${room_name}`,
        {headers : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "GET,PUT,PATCH",
        }})
        .then((response) => {
            setMessages(response.data);
        })
        .catch((error) => {
            console.log(error.response);
        })
    }, []);
    
    const [client, setClient] = useState(null);

    useEffectOnce(() => {
        const client_1 = new WebSocket(
            `ws://5.34.195.16:4000/chat/room/${room_name}/`
        );
        client_1.onopen = () => {
            // setNum(curr=>curr+1);
            console.log("WebSocket connection opened");
        };
        client_1.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // console.log(message);
        };
        client_1.onclose = () => {
            console.log("WebSocket connection closed");
        };
        setClient(client_1);
    });
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

    const sendMessage = () => {
        const updatedMessage = userMessage.trim();
        if (updatedMessage !== '') {
            const newMessage ={
                fields: {
                    message: updatedMessage,
                    sender: sender_id,
                    date_created: new Date().toISOString()
                }
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setUserMessage('');
            // setTimes((prevTimes) => [...prevTimes, new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})]);
            client.send(
                JSON.stringify({
                    message : userMessage,
                    user_id : sender_id,
                    room_name : room_name
                })
            );
        }
    };

    const handleOpenSocket = (e) => {
        if (client && client.readyState === WebSocket.CLOSED) {
            const clientCopy = new WebSocket(
                `ws://5.34.195.16:4000/chat/room/${room_name}/`
            );
        
            clientCopy.onopen = () => {
            //   setNum(curr => curr + 1);
              console.log("WebSocket connection opened");
            };
        
            clientCopy.onmessage = (event) => {
              const message = JSON.parse(event.data);
            //   console.log(message);
            };
        
            clientCopy.onclose = () => {
              console.log("WebSocket connection closed");
            };
            setClient(clientCopy);
        }   
    };
    const handleCloseSocket = (e) => {
        if (client && client.readyState === WebSocket.OPEN) {
            client.close();
          } else {
            console.log("WebSocket connection is already closed");
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
                                <ReactScrollToBottom className="chatBox">
                                        {messages.map((msg, index) => (
                                            <Message key={index} message={msg.message} />
                                            // <ListItem key={index} 
                                            //     className={msg.fields?.sender == sender_id ? 'chat-listitem-right' : 'chat-listitem-left'}
                                            // >
                                            //     <ListItemText primary={msg.fields?.message} style={{ wordWrap: 'break-word' }}/>
                                            //     <p className='chat-time'>
                                            //         {new Date(msg.fields.date_created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            //     </p>
                                            // </ListItem>
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
                {open ? <CloseIcon onClick={handleCloseSocket}/> : <HeadsetMicIcon onClick={handleOpenSocket}/>}
            </Fab>
        </div>

        
    );
}
const Message = ({ message }) => {
    const isBot = message.sender === "receiver";
    const align = isBot ? "flex-start" : "flex-end";
    const timeAlign = isBot ? "left" : "right";

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", justifyContent: align, mb: 2 }}>
                <Box sx={{ display: "flex", flexDirection: isBot ? "row" : "row-reverse", alignItems: "end" }} >
                    <Avatar sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}>
                        {isBot ? "C" : "U"}
                    </Avatar>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            ml: isBot ? 1 : 0,
                            mr: isBot ? 0 : 1,
                            backgroundColor: isBot ? "primary.light" : "secondary.light",
                            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                        }}
                    >
                        <Typography variant="body1" sx={{mt:-0.8}}>
                            {message.text}
                        </Typography>
                        <Box sx={{mt: -0.4, mb:-1.5}}>
                            <Typography variant="caption" sx={{textAlign: timeAlign}} >
                                {message.time}
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
export default Chat;
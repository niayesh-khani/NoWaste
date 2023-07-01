import * as React from "react";
import { Box, TextField, Button, Typography, Avatar, Grid, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "../components/Header";
import ReactScrollToBottom from "react-scroll-to-bottom";
import './RestaurantChats.css';
import '../components/Chat.css';
import Divider from '@material-ui/core/Divider';

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

function getRandomColor() {
    const colors = ['#FFA600', '#fff2bf', '#ffe480', '#a2332a' , '#E74C3C' , '#690000' , '#595959', '#3e3e3e' , '#C6C6C6', '#ABABAB', '#B9B9B9'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const messages = [
  { id: 1, text: "Hi there!", time: '11:00', sender: "bot" },
  { id: 2, text: "Hello!", time:'12:04', sender: "user" },
  { id: 3, text: "How can I assist you today?", time: '13:8', sender: "bot" },
  { id: 3, text: "How can I assist you today?", time: '13:8', sender: "bot" },
  { id: 3, text: "How can I assist you today?", time: '13:8', sender: "user" },
  { id: 3, text: "How can I assist you today?", time: '13:8', sender: "bot" },
  { id: 3, text: "How can I assist you today?", time: '13:8', sender: "user" },
  { id: 3, text: "How can I assist you today?", time: '13:8', sender: "user" },
  { id: 3, text: "How can I assist you today?How can I assist you today?How can I assist you today?", time: '13:8', sender: "bot" },
];
const users = [
    {id: 1, username: 'Hni asadi'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 2, username: 'hijd sdl'},
    {id: 3, username: 'kjldjs;'}
];

const Chat = () => {
    const [input, setInput] = React.useState("");
    const handleSend = () => {
        if (input.trim() !== "") {
        console.log(input);
        setInput("");
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Header />
            {/* <Box height='10vh' style={{backgroundColor: 'white',display: 'flex', alignItems: 'center', justifyContent: 'center' , marginTop: '-10px'}}>
                <Typography variant="h4">Chats</Typography>
            </Box> */}
            <Grid container spacing={2} backgroundColor="rgb(239, 235, 229)" >
                <Grid item md={3} sm={2} >
                    {/* <Grid item md={12} sm={12}> */}
                        <Box height='10vh' style={{backgroundColor: 'white',display: 'flex', alignItems: 'left', justifyContent: 'left' , marginTop: '-10px', marginLeft: '10px'}}>
                            <Typography variant="h4">Chats</Typography>
                        </Box>
                    {/* </Grid> */}
                    <Box style={{height: '80vh', overflowY: 'scroll', marginTop: '10px'}}>
                    {users.map((user, index) => (
                        <>
                        <Grid container spacing={2} style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Grid item md={1}></Grid>
                            <Grid item md={3}>
                                <Avatar className="users-avatar" style={{ backgroundColor: getRandomColor()}}>
                                    {user.username.charAt(0).toUpperCase()}
                                </Avatar>
                            </Grid>
                            <Grid item md={8} style={{ display: 'flex', alignItems: 'center' , marginLeft: '-10px'}}>
                                <Typography variant="h5" ml="-8%">
                                    {user.username}
                                </Typography>
                            </Grid> 
                        </Grid>
                        <Divider style={{marginTop: '10px', marginBottom: '10px'}}/>
                        </>
                    ))}</Box>
                </Grid>
                <Grid item md={9} sm={10} >
                    <Box className="chat-detail" width='100%' style={{ height: '12vh', marginBottom: '-4px',}}>
                        <Grid container spacing={2} alignItems="center" style={{ }}>
                            <Grid item md={1.5} sm={2}>
                                <Avatar className="users-avatar current-chat-avatar" style={{ backgroundColor: getRandomColor(), marginLeft: '10px'}}>
                                    H
                                </Avatar>
                            </Grid>
                            <Grid item md={10.5} sm={10}>
                                <Typography variant="h5" ml="-8%">
                                    Hni asadi
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            height: "80vh",
                            display: "flex",
                            flexDirection: "column",
                            bgcolor: "grey.200",
                            overflow: 'hidden'
                        }}
                        // className="restaurant-chat-root"
                    >
                        
                        <ReactScrollToBottom className="restaurant-chat-box" >
                            <Box sx={{ flexGrow: 1, overflow: 'auto',p: 2 }}>
                                {messages.map((message) => (
                                    <Message key={message.id} message={message} />
                                ))}
                            </Box>            
                        </ReactScrollToBottom>
                        <Box sx={{ p: 2,  backgroundColor: 'rgb(239, 235, 229)'}}>
                            <Grid container spacing={2} marginTop='-25px'>
                                <Grid item xs={11.5}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        placeholder="Type a message"
                                        variant="outlined"
                                        value={input}
                                        color="secondary"
                                        multiline
                                        onChange={handleInputChange}
                                        autoComplete="false"
                                    />
                                </Grid>
                                <Grid item xs={0.5} >
                                    <Button
                                        color="secondary"
                                        className="chat-send-icon"
                                        onClick={handleSend}
                                    >
                                        <SendIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

const Message = ({ message }) => {
    const isBot = message.sender === "bot";
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
                        <Typography variant="body1" sx={{mt:-0.8}}>{message.text}
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
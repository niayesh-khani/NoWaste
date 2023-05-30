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
import {w3websocket} from "websocket";

const Chat = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const client = new w3websocket();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const [commentValue, setCommentValue] = useState("");
    const onChange = (e) => {
        setCommentValue(e.target.value);
    }

    return (
        <div>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition className='chat-poper'>
            {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
                <Paper className='chatPage'>
                    <Grid className="chatContainer">
                        {/* <Typography> */}
                            <Grid className="chat-header">
                                <h2 className='chat-title'>Support chat</h2>
                            </Grid>
                            <Grid className="chatBox">
                                salam
                                <ListItem alignItems="flex-start">
                                    <ListItemText>
                                    
                                    </ListItemText>
                                </ListItem>
                            </Grid>
                            <Grid className="inputBox">
                                <textarea onKeyPress={(event) => event.key === 'Enter'} onChange={onChange} value={commentValue} id="chatInput" />
                                <Button className='chat-button' disabled={commentValue.length < 1}><SendIcon className='chat-send'/></Button>
                            </Grid>
                        {/* </Typography> */}
                    </Grid>
                </Paper>
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

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./ShowComments.css";
import { createTheme } from '@material-ui/core';
import { Avatar, Grid, ThemeProvider } from '@mui/material';
import { deepOrange, deepPurple,grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';

const theme = createTheme({
    palette: {
        primary: {
            main: '#dd9d46',
        },
        secondary: {
            main: '#a44704',
        }
    },
})    
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ShowComments() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Button 
                    onClick={handleOpen} 
                    variant="contained"
                    // className="field-show-comments submit-show-comments"
                    // className='cooment-field'
                    id='comment-submit'
                >
                    Comments
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="comment-box">
                        {/* <Avatar></Avatar> */}
                        <h2 className='title-show-comments'>Users comments</h2>
                        <Stack direction="row" spacing={2} >
                            <Avatar sx={{ bgcolor: grey[900] }} className='comment-avatar'>A</Avatar>
                            <Stack direction="column" spacing={2} >
                                <Typography variant="h6" className='comment-stack'>
                                    Mohammad
                                </Typography>
                                <h8 className='comment-date'>2020-04-03</h8>
                            </Stack>
                            
                        </Stack>
                        <Typography  className='comment-text' id="modal-modal-description" sx={{ mt: 2 }}>
                            It was very delicious. Thank you!
                        </Typography>

                        <hr className='comment-hr'></hr>
                        <Stack direction="row" spacing={2} >
                            <Avatar sx={{ bgcolor: grey[900] }} className='comment-avatar'>N</Avatar>
                            <Stack direction="column" spacing={2} >
                                <Typography variant="h6" className='comment-stack'>
                                    Negin
                                </Typography>
                                <h8 className='comment-date'>2016-02-11</h8>
                            </Stack>
                            
                        </Stack>
                        
                        <Typography className='comment-text' id="modal-modal-description" sx={{ mt: 2 }}>
                            Not bad. I suggest.
                        </Typography>
                        <hr className='comment-hr'></hr>
                        <Button 
                            onClick={handleClose} 
                            variant="contained"
                            className='close-comment'
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>
            </div>
        </ThemeProvider>
    );
}
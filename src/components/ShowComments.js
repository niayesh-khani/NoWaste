import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./ShowComments.css";
import { createTheme } from '@material-ui/core';
import { Avatar, ThemeProvider } from '@mui/material';

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
                        <h2 className='title-show-comments'>User comments</h2>
                        <Typography className='comment-title' id="modal-modal-title" variant="h6" component="h2" >
                            Ali
                        </Typography>
                        <h6 className='comment-date'>2020-04-03</h6>
                        <Typography  className='comment-text' id="modal-modal-description" sx={{ mt: 2 }}>
                            It was very delicious. Thank you!
                        </Typography>
                        <hr></hr>
                        <Typography className='comment-title' id="modal-modal-title" variant="h6" component="h2">
                            Negin
                        </Typography>
                        <h6 className='comment-date'>2016-02-11</h6>
                        <Typography className='comment-text' id="modal-modal-description" sx={{ mt: 2 }}>
                            Not bad. I suggest.
                        </Typography>
                        <hr></hr>
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
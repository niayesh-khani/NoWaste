import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import './ShowComment.css';


function MyVerticallyCenteredModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        {/* <Modal.Header closeButton> */}
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            User comments
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Ali</h4>
            <p>It was very delicious. Thank you!</p>
            <h4>Negin</h4>
            <p>Not bad. I suggest.</p>
        </Modal.Body>
        <Modal.Footer>
            {/* <Button onClick={props.onHide}>Close</Button> */}
            <Button onClick={props.onHide} variant="contained" className="field-close submit-show-comment" color="primary" >
                Close
            </Button>
        </Modal.Footer>
        </Modal>
    );
}


const ShowComment = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            {/* <Button variant="primary" onClick={() => setModalShow(true)}>
                See comments
            </Button> */}
            <Button onClick={() => setModalShow(true)} variant="contained" className="field-show-comment submit-show-comment" color="primary" >
                See comment
            </Button>
        
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default ShowComment;
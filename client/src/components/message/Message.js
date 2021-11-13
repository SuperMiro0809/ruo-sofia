import { Alert } from '@material-ui/core';

const Message = (props) => {
    return (
        <Alert severity={props.status}>{props.text}</Alert>
    );
}

export default Message;
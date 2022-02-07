import { useState, useEffect } from 'react';
import { 
    Card
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import JoditEditor from "jodit-react";

const ProtocolTextEditorResults = (props) => {
    const navigate = useNavigate();
    const [content, setContent] = useState(props.content);
    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    return (
        <Card {...props}>
            <JoditEditor
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { console.log(newContent) }}
            />
        </Card>
    );
};

export default ProtocolTextEditorResults;

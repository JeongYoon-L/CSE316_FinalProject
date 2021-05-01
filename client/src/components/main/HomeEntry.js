import React, { useState }  from 'react';
import { useHistory } from "react-router-dom";
import { WNavItem, WInput, WCol, WRow} from 'wt-frontend';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Region   from './Region';

const HomeEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    let history = useHistory();
    const RouteRegionID = "/region/" + props._id;

    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateMapName(props._id, value, preEdit);
    };

    const gotoRegionRouter= (e) => {   
        history.push(RouteRegionID);   
        
    }

    
    return (
        <WNavItem 
            className="list-item"  
        >
            {
                editing ?   <WInput className="list-item-edit" inputClass="list-item-edit-input"
                                onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                            />
                        :<WRow>
                            <WCol size = "10" className='list-text' onClick={gotoRegionRouter }>
                                {props.name}
                            </WCol>
                            <WCol size = "1" onClick={handleEditing}  >
                                E
                            </WCol>
                            <WCol size = "1">
                                X
                            </WCol>
                        </WRow>   
                            
            }
        </WNavItem>
    );
};

export default HomeEntry;
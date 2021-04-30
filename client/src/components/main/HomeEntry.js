import React, { useState }  from 'react';
import { useHistory } from "react-router-dom";
import { WNavItem, WInput } from 'wt-frontend';
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
        //props.updateListField(props._id, name, value, preEdit);
    };

    const gotoRegionRouter= (e) => {   
        history.replace(RouteRegionID);   
        
    }

    
    return (
        <WNavItem 
            className="list-item" onDoubleClick={handleEditing} 
            onClick={gotoRegionRouter } 
        >
            {
                editing ?   <WInput className="list-item-edit" inputClass="list-item-edit-input"
                                onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                            />
                        :   <div className='list-text'>
                                {props.name}
                            </div>
            }
        </WNavItem>
    );
};

export default HomeEntry;
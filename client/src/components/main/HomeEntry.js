import React, { useState }  from 'react';
import { useHistory } from "react-router-dom";
import { WNavItem, WInput, WCol, WRow} from 'wt-frontend';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Region   from './Region';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import Delete 							from '../modals/Delete';
import { useMutation, useQuery } 		from '@apollo/client';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAPS } 				from '../../cache/queries';

const HomeEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    let history = useHistory();
    const RouteRegionID = "/region/" + props._id;
    const [showDeleteMap, toggleShowDeleteMap] 	= useState(false);
    const [currentTopMap] 			= useMutation(mutations.TOP_MAP);
    
    const setShowDeleteMap = () => {
		toggleShowDeleteMap(!showDeleteMap)
	}
    
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

    const gotoRegionRouter= async (e) => {   
        const { data } = await currentTopMap({ variables: { mapID: props._id }, refetchQueries: [{ query: GET_DB_MAPS }] });
        //history.push(RouteRegionID);   
        props.setParentBranch([]);
        const regionName = props.name;
        history.push({
            pathname : RouteRegionID,
            state : {regionName : regionName}}
            );
        
    }

    
    return (
        <div>
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
                                <WButton className = "iconHandle">
                                    <i className = "material-icons ">
                                        edit
                                    </i>
                                </WButton>
                            </WCol>
                            <WCol size = "1">
                                <WButton className = "iconHandle" onClick = {setShowDeleteMap}>
                                    <i className = "material-icons ">
                                        delete
                                    </i>
                                </WButton>
                            </WCol>
                        </WRow>   
                            
            }
        </WNavItem>
            {
				showDeleteMap && (<Delete _id = {props._id} setShowDeleteMap={setShowDeleteMap} DeleteMapHere = {props.DeleteMapHere} setShowDeleteMap = {setShowDeleteMap} />)
			    }
        </div>
    );
};

export default HomeEntry;
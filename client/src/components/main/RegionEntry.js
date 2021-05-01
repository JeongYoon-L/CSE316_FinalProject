import React, { useState }  from 'react';
import { useHistory } from "react-router-dom";
import Viewer    from './Viewer';
import { WNavItem, WInput, WCol, WRow, WButton } from 'wt-frontend';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DeleteRegion 							from '../modals/DeleteRegion';

const RegionEntry = (props) => {
//    const { data } = props;
    const todo = props.todo;
    const name = props.todo.name;
    const capital = props.todo.capital;
    const leader = props.todo.leader;
    const landmark = props.todo.landmark;
    const flag = props.todo.Flag;
    const RouteSubRegionID = "/region/" + props._id;
    
    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);
    const [editingFlag, toggleFlagEdit] = useState(false);
    const [editingLandmark, toggleLandmarkEdit] = useState(false);
    const [showDeleteRegion, toggleShowDeleteRegion] 	= useState(false);
    
    
    let history = useHistory();
    const RouteViewerRegionID = "/viewer/" + props._id;
    const regionName = props.name;

    const setShowDeleteRegion = () => {
		toggleShowDeleteRegion(!showDeleteRegion)
	}


    const handleLandmarkEdit = (e) => {
        toggleLandmarkEdit(false);
        // const newAssign = e.target.value ? e.target.value : 'No Assigned';
        // const prevAssign = assigned_to;
        // if(newAssign !== prevAssign){
        //     props.editItem(data._id, 'assigned_to', newAssign, prevAssign);
        // }
    };

    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        // const newDate = e.target.value ? e.target.value : 'No Date';
        // const prevDate = due_date;
        // if(newDate !== prevDate){
        //     props.editItem(data._id, 'due_date', newDate, prevDate);
        // }
    };

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        // const newDescr = e.target.value ? e.target.value : 'No Description';
        // const prevDescr = description;
        // if(newDescr !== prevDescr){
        //     props.editItem(data._id, 'description', newDescr, prevDescr);
        // }
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        // const newStatus = e.target.value ? e.target.value : false;
        // const prevStatus = status;
        // if(newStatus !== prevStatus){
        //     props.editItem(data._id, 'completed', newStatus, prevStatus);
        // }
    };

    
    return (
        <WRow className='table-entry'>
            <WCol size = "1">
                <WButton>
                <i className = "material-icons " onClick = {setShowDeleteRegion}>
                    delete
                    </i>
                </WButton>
            </WCol>
            <WCol size="2">
                    <div className="table-text"
                    onClick={() => history.push({
                        pathname : RouteSubRegionID,
                        state : {regionName:regionName}}
                        )} 
                >
                {name}
                </div>
                
            </WCol>

            <WCol size="2">
                {
                   <div className="table-text"
                   onClick={() => toggleCapitalEdit(!editingCapital)}
               >{capital}
               </div>
                }
            </WCol>

            <WCol size="2">
                {
                    <div onClick={() => toggleLeaderEdit(!editingLeader)} >
                    {leader}
                </div>
                }
            </WCol>
            <WCol size="2">
                {
                    <div 
                    onClick={() => toggleFlagEdit(!editingFlag)} 
                >{flag}
                </div>

                }
            </WCol>
            <WCol size="3">
                {
                    <WButton 
                    onClick={() => history.push({
                        pathname : RouteViewerRegionID,
                        state : {todo : todo}}
                        )} 
                >{landmark}
                </WButton>
                }
            </WCol>
            {
				showDeleteRegion && (<DeleteRegion _id = {props._id} setShowDeleteRegion={setShowDeleteRegion} DeleteRegionHere = {props.DeleteRegionHere} setShowDeleteRegion = {setShowDeleteRegion} />)
			    }
        </WRow>
    );
};

export default RegionEntry;
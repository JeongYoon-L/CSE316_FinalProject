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
    const [showWelcome, toggleShowWelcome] 	= useState(true);
    
    
    let history = useHistory();
    const regionNameViewer = props.RegionNameHere;
    const RouteViewerRegionID = "/viewer/" + props._id;
    

    const setShowDeleteRegion = () => {
		toggleShowDeleteRegion(!showDeleteRegion)
	}

    const keydown = async () => {
		window.onkeydown = async (e) => {
		  if(e.keyCode === 37){ //left key
            if(editingCapital){
                toggleCapitalEdit(false);
                toggleNameEdit(true);
            }
			else if(editingLeader){
                toggleLeaderEdit(false);
                toggleCapitalEdit(true);
            }
		  }
		  if(e.keyCode === 39){ //right key
            if(editingCapital){
                toggleCapitalEdit(false);
                toggleLeaderEdit(true);
            }
			else if(editingName){
                toggleNameEdit(false);
                toggleCapitalEdit(true);
            }				
		  }
		  
		}
	
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
         const newCapital = e.target.value ? e.target.value : 'No Capital';
         const prevCapital = capital;
         if(newCapital !== prevCapital){
             props.editItem(props._id, 'capital', newCapital, prevCapital);
         }
    };

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = name;
        if(newName !== prevName){
            props.editItem(props._id, 'name', newName, prevName);
        }
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'No Leader';
        const prevLeader = leader;
        if(newLeader !== prevLeader){
            props.editItem(props._id, 'leader', newLeader, prevLeader);
        }
    };

    const changeRoute = async () => {
        props.setParentBranch([]);
        props.cleartransaction();
        history.push(RouteSubRegionID);
        
    }

    const changeRouteToLandmark = async () => {
        props.setParentBranch([]);
        props.cleartransaction();
        history.push({
            pathname : RouteViewerRegionID,
            state : {todo : todo,regionNameViewer : regionNameViewer}}
            );
        
    }
    
    keydown();
    return (
        <div>
        <WRow className='table-entry'>
            <WCol size = "1">
                <WButton  className = "regionDeleteButton buttonhover " >
                <i className = "material-icons " onClick = {setShowDeleteRegion}>
                    delete
                    </i>
                </WButton>
            </WCol>
            <WCol size="2">
            {
                    editingName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            autoFocus={true} defaultValue={name} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text-blue"
                        onClick={changeRoute } 
                        >{name}
                        </div>
                }                
            </WCol>

            <WCol size="2">
                {
                    editingCapital || capital === ''
                        ? <WInput
                            className='table-input' onBlur={handleCapitalEdit}
                            autoFocus={true} defaultValue={capital} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text"
                        onClick={() => toggleCapitalEdit(!editingCapital)}
                        >{capital}
                        </div>
                }
            </WCol>

            <WCol size="2">
            {
                    editingLeader || leader === ''
                        ? <WInput
                            className='table-input' onBlur={handleLeaderEdit}
                            autoFocus={true} defaultValue={leader} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text"
                        onClick={() => toggleLeaderEdit(!editingLeader)} >
                        {leader}
                    </div>
                }
            </WCol>
            <WCol size="2">
                {
                    <div className="table-text"
                    onClick={() => toggleFlagEdit(!editingFlag)} 
                >{flag}
                </div>

                }
            </WCol>
            <WCol size="3">
                {
                    <div 
                    className="table-text-blue"
                    onClick={changeRouteToLandmark} 
                >Insert Landmark
                </div>
                }
            </WCol>
        </WRow>
        {
            showDeleteRegion && (<DeleteRegion _id = {props._id} todo = {props.todo} setShowDeleteRegion={setShowDeleteRegion} DeleteRegionHere = {props.DeleteRegionHere} setShowDeleteRegion = {setShowDeleteRegion} />)
            }
            </div>
    );
};

export default RegionEntry;
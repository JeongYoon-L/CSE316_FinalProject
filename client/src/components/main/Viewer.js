import React, { useState } 				from 'react';
import {useLocation} from "react-router";
import LeftViewer    from './LeftViewer';
import RightViewer    from './RightViewer';
import { useHistory } from "react-router-dom";
import { WButton, WCHeader, WCContent, WCMedia, WCard, WRow, WCol } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { GET_DB_CHILDS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import CreateMapModal 							from '../modals/CreateMapModal';
import { AddLandmark_Transaction, EditLandmark_Transaction, EditParentRegion_Transaction} 				from '../../utils/jsTPS';
import { GET_DB_CURRENT_REGIONS } 				from '../../cache/queries';
import { GET_ALLPARENTS_BRANCHREGION } 				from '../../cache/queries';

const Viewer = (props) => {
    const location = useLocation();
    const ViewerInfomation =location.state.todo ;
    const ParentName =location.state.regionNameViewer ;
    const [addLandmarkfield] 			= useMutation(mutations.ADD_LANDMARK);
    const [editLandmarkfield] 			= useMutation(mutations.EDIT_LANDMARK_FIELD);
    const [updateParent_RegionIDField] 			= useMutation(mutations.EDIT_PARENT_REGION);
    const [landmarkInput, toggleInputLandmark] 	= useState("");
    const [checkUndo, togglecheckUndo] 	= useState(false);
	const [checkRedo, togglecheckRedo] 	= useState(false);

    let canUndo = checkUndo;
    let canRedo = checkRedo ;

    let todoNew = [];
    const { data : dataR, refetch : refetchR } = useQuery(GET_DB_CURRENT_REGIONS, {variables : {CurrentID : ViewerInfomation._id}, fetchPolicy:'no-cache'});
    if(dataR && dataR.getAllCurrentRegions && dataR.getAllCurrentRegions !== null) { 
        todoNew = dataR.getAllCurrentRegions; 
    }

    let allchild = [];
    const { data : dataChild, refetch : refetchChild } = useQuery(GET_DB_CHILDS, {variables : {CurrentID : ViewerInfomation._id}, fetchPolicy:'no-cache'});
    if(dataChild && dataChild.getAllChildInfo && dataChild.getAllChildInfo !== null) { 
        allchild = dataChild.getAllChildInfo; 
    }

    let pathname =useHistory().location.pathname;
    let connectedParendId = " ";
    
    connectedParendId = pathname.substring(8, pathname.length);
    console.log(connectedParendId);

    let parents = [];
    const { data : dataBranch, error: errorBranch, refetch:BranchRefetch } = useQuery(GET_ALLPARENTS_BRANCHREGION, {variables : {_id : connectedParendId}, fetchPolicy:'no-cache'});
       if(errorBranch) { console.log(errorBranch, 'error'); }
       if(dataBranch && dataBranch.getAllParentsBranchRegion && dataBranch.getAllParentsBranchRegion !== null) { 
           parents = dataBranch.getAllParentsBranchRegion;  
           console.log(parents);
       }
    
    const addLandmark = async () =>{
        if(landmarkInput !== "" && todoNew !== []){
            let itemID = todoNew._id;
            let prevLandmark = todoNew.landmark;
            let newLandmark = prevLandmark.concat(landmarkInput);
            let transaction = new AddLandmark_Transaction(itemID, prevLandmark, newLandmark, addLandmarkfield);
            props.tps.addTransaction(transaction);  
            tpsRedo();
        }

    }
    const editLandmark = async ( newLandmark, prevLandmark) =>{
            let itemID = todoNew._id;
            let transaction = new EditLandmark_Transaction(itemID, prevLandmark, newLandmark, editLandmarkfield);
            props.tps.addTransaction(transaction);  
            tpsRedo();
    }
    const editParentRegion = async ( newParentRegion, prevParentRegion) =>{
        let itemID = todoNew._id;
        let transaction = new EditParentRegion_Transaction(itemID, prevParentRegion, newParentRegion, updateParent_RegionIDField);
        props.tps.addTransaction(transaction);  
        tpsRedo();
        //props.setParentBranch([]);
        
}



const keydown = (e) => {
    window.onkeydown = async (e) => {

        var keyCode = e.keyCode ? e.keyCode : e.which;
      if(keyCode === 90 && e.ctrlKey){
        if(props.tps.hasTransactionToUndo()){
            tpsUndo();
            await refetchR();
            await BranchRefetch();
            await refetchChild();
        }
      }
      if(keyCode === 89 && e.ctrlKey){
        if(props.tps.hasTransactionToRedo()){                
            tpsRedo();
            await refetchR();
            await BranchRefetch();
            await refetchChild();
        }	
      }		  

    }
}
keydown();
    
 const tpsUndo = async () => {
    const retVal = await props.tps.undoTransaction();
    await refetchR();
    await BranchRefetch();
    await refetchChild();
    
    togglecheckUndo(props.tps.hasTransactionToUndo() && props.tps.getSize() !== 0 );
    togglecheckRedo(props.tps.hasTransactionToRedo() && props.tps.getSize() !== 0 );
    return retVal;
}

const tpsRedo = async () => {
    const retVal = await props.tps.doTransaction();
    await refetchR();
    await BranchRefetch();
    await refetchChild();
    togglecheckUndo(props.tps.hasTransactionToUndo() && props.tps.getSize() !== 0 );
    togglecheckRedo(props.tps.hasTransactionToRedo()&& props.tps.getSize() !== 0 );
    return retVal;
}

    return (
        <WCard wCard="header-content-media" className = "viewerPage">
			<WCHeader className = "ViewerHeader">
            <WRow>
                {canUndo ?            
                <WButton className = "subregionButton buttonhover " onClick={tpsUndo} >
                <i className="material-icons ">undo</i>
                </WButton>:
                <WButton className = "subregionButton-disabled ">
                <i className="material-icons ">undo</i>
                </WButton>
                }
               {canRedo ? 
                <WButton className = "subregionButton buttonhover "onClick={tpsRedo} >
                <i className="material-icons ">redo</i>
                </WButton>:
               <WButton className = "subregionButton-disabled " >
               <i className="material-icons ">redo</i>
               </WButton>               
                }
                <WCol size="1"></WCol>
                <WCol size="1"></WCol>
                <WCol size="1"></WCol>
                <WCol size="1"></WCol>
                <WCol size="1"></WCol>
                <WCol size="3">{
                    <div className = "VeiwerText "> Region Landmarks: </div>
                    }</WCol>
                <WCol size="1"></WCol>
                <WCol size="1"></WCol>
            </WRow>
			</WCHeader>

            <WRow >
            <WCol size="6"  >
                {
                    

			<WCContent >
            <LeftViewer  parents={parents} editParentRegion={editParentRegion}
                ViewerInfomation = {ViewerInfomation} ParentName = {ParentName} setParentBranch={props.setParentBranch} />
            
        </WCContent>
                }
            </WCol>

            <WCol size="6">
                {
                    <WCMedia   >
                               <RightViewer addLandmark={addLandmark} toggleInputLandmark= {toggleInputLandmark} landmarkInput= {landmarkInput} allchild= {allchild}
                ViewerInfomation = {ViewerInfomation} todoNew= {todoNew} editLandmark={editLandmark} />
            
                    </WCMedia>
                }
            </WCol>
            </WRow>
               
		</WCard>
		
        
    );
};

export default Viewer;
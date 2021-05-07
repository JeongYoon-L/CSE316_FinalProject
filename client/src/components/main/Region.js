import React, { useState , useEffect} 				from 'react';
import RegionHeader    from './RegionHeader';
import RegionNavbar    from './RegionNavbar';
import RegionContents    from './RegionContents';
import { useHistory } from "react-router-dom";
import { WButton, WCHeader, WCContent, WCMedia, WCard } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import { GET_DB_CURRENT_REGIONS } 				from '../../cache/queries';
import { GET_DB_CURRENT_MAPS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import CreateMapModal 							from '../modals/CreateMapModal';
import {useLocation} from "react-router";
import { UpdateListField_Transaction, 
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	SortItems_Transaction,
	EditItem_Transaction } 				from '../../utils/jsTPS';

const Region = (props) => {
    const [AddRegion] 			= useMutation(mutations.CREATE_SUBREGION);
    const [DeleteRegion] 			= useMutation(mutations.DELETE_REGION);
    const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD);
    const [checkUndo, togglecheckUndo] 	= useState(false);
	const [checkRedo, togglecheckRedo] 	= useState(false);
    const [showCreateMap, toggleShowCreateMap] 	= useState(false);
    let subregions 	= [];
    let pathname =useHistory().location.pathname;
    let connectedParendId = pathname.substring(8, pathname.length);
    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS, {variables : {parentID : connectedParendId}});

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data && data !== null) { 
        if(data.getAllRegions && data.getAllRegions !== null) { 
		// Assign subregions 
		for(let todo of data.getAllRegions) {
			subregions.push(todo)
		}
    }
    }

    //const location = useLocation();
    //const RegionNameHere =location.state.regionName ;
    let RegionNameHereM = "";
    let RegionNameHereR = "";
    let RegionNameHere = "";    

    const { data : dataM, error: errorM } = useQuery(GET_DB_CURRENT_MAPS, {variables : {CurrentID : connectedParendId}});
    if(errorM) { console.log(errorM, 'error'); }
    if(dataM && dataM.getAllCurrentMaps && dataM.getAllCurrentMaps !== null) { 
        RegionNameHereM = dataM.getAllCurrentMaps; 
    }

    const { data : dataR } = useQuery(GET_DB_CURRENT_REGIONS, {variables : {CurrentID : connectedParendId}});
    if(dataR && dataR.getAllCurrentRegions && dataR.getAllCurrentRegions !== null) { 
        RegionNameHereR = dataR.getAllCurrentRegions; 
    }
        
 if(RegionNameHereM.name == "" || RegionNameHereM.name == undefined ||RegionNameHereM.name == null){
        RegionNameHere = RegionNameHereR.name;
 }
 else{
    RegionNameHere = RegionNameHereM.name;
 }


 const tpsUndo = async () => {
    const retVal = await props.tps.undoTransaction();
    refetch();
    togglecheckUndo(props.tps.hasTransactionToUndo());
    togglecheckRedo(props.tps.hasTransactionToRedo());
    return retVal;
}

const tpsRedo = async () => {
    const retVal = await props.tps.doTransaction();
    refetch();
    togglecheckUndo(props.tps.hasTransactionToUndo());
    togglecheckRedo(props.tps.hasTransactionToRedo());
    return retVal;
}

    
    const setShowCreateMap = () => {
		toggleShowCreateMap(!showCreateMap)
	}
    const createNewSubRegion = async () => {
        const length = subregions.length;
		//const id = length >= 1 ? todolists[length - 1].id + Math.floor((Math.random() * 100) + 1) : 1;
		const Maxid = Math.max.apply(Math, subregions.map((field)  => { return field.id; }));
		const id = length >= 1 ? Maxid +1 : 1;	
        if(props.user){
            let list = {
                _id: " ",
                id: id,
                name : "Enter Name",
                capital: "Enter Capital",
                leader: "Who's Leader",
                Flag: "Flag",
                parentRegion: connectedParendId,
                landmark: [],            
            }
            const { data } = await AddRegion({ variables: { region: list } });
            refetch();
            
        }
		
    };

    const DeleteRegionHere = async (_id) => {
        const { data } = await DeleteRegion({ variables: { _id: _id}});
        refetch();
    }
    const editItem = async (itemID, field, value, prev) => {
//		let listID = activeList._id;
		let transaction = new EditItem_Transaction(itemID, field, prev, value, UpdateTodoItemField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

    return (
        
        <WCard wCard="header-content-media" className = "regionPage">
            <RegionNavbar 
                createNewSubRegion = {createNewSubRegion} RegionNameHere = {RegionNameHere} undo={tpsUndo} redo={tpsRedo}
                />
			<WCHeader className = "RegionHeader">
                <RegionHeader>

                </RegionHeader>
			</WCHeader>
			<WCContent  >
                <RegionContents 
                 setParentBranch = {props.setParentBranch } 
                    subregions = {subregions} DeleteRegionHere = {DeleteRegionHere} RegionNameHere = {RegionNameHere}
                    editItem = {editItem} />
                
			</WCContent>
            
                
		</WCard>
		
        
    );
};

export default Region;
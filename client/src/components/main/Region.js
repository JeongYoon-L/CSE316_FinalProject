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
    const [SortTodoItems] 		= useMutation(mutations.SORT_ITEMS);
    const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD);
    const [checkUndo, togglecheckUndo] 	= useState(false);
	const [checkRedo, togglecheckRedo] 	= useState(false);
    const [showCreateMap, toggleShowCreateMap] 	= useState(false);
    let subregions 	= [];
    let indexID = [];
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
            indexID.push(todo._id);          
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
    await refetch();
    togglecheckUndo(props.tps.hasTransactionToUndo() && props.tps.getSize() !== 0 );
    togglecheckRedo(props.tps.hasTransactionToRedo() && props.tps.getSize() !== 0 );
    return retVal;
}

const tpsRedo = async () => {
    const retVal = await props.tps.doTransaction();
    await refetch();
    togglecheckUndo(props.tps.hasTransactionToUndo() && props.tps.getSize() !== 0 );
    togglecheckRedo(props.tps.hasTransactionToRedo()&& props.tps.getSize() !== 0 );
    return retVal;
}
const [changefield, togglecheckField] 	= useState("");
const [changeindex, togglecheckIndex] 	= useState(-1);

const moveSubregionUpDown = async (field, index) => {
    togglecheckField(field);
    togglecheckIndex(index);
    //await refetch();
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
                _id: '',
                id: id,
                name : "Enter Name",
                capital: "Enter Capital",
                leader: "Who's Leader",
                Flag: "Flag",
                parentRegion: connectedParendId,
                landmark: [],   
                forOrder: "1",         
            }
            //indexID.push(list._id);
            let opcode = 1;
            let itemID = list._id;
            let transaction = new UpdateListItems_Transaction(itemID, list, opcode, AddRegion, DeleteRegion, indexID);
            props.tps.addTransaction(transaction);  
            tpsRedo();
            //const { data } = await AddRegion({ variables: { region: list } });
            //refetch();
        }
		
    };

    const DeleteRegionHere = async (todo) => {
        let opcode = 0;
        let itemID = todo._id;
        let list = {
            _id: todo._id,
            id: todo.id,
            name : todo.name,
            capital: todo.capital,
            leader: todo.leader,
            Flag: todo.Flag,
            parentRegion: todo.parentRegion,
            landmark: todo.landmark,     
            forOrder: todo.forOrder,       
        }
        let transaction = new UpdateListItems_Transaction(itemID, list, opcode, AddRegion, DeleteRegion, indexID);
        props.tps.addTransaction(transaction);  
        tpsRedo();
        //const { data } = await DeleteRegion({ variables: { _id: _id}});
        //refetch();
    }
    const editItem = async (itemID, field, value, prev) => {
//		let listID = activeList._id;
		let transaction = new EditItem_Transaction(itemID, field, prev, value, UpdateTodoItemField, indexID);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};
    const sortRegions = async (content) => {
        let prevList = [];
		let newList = [];
		if(subregions){
		let sorteditem = [];
		subregions.map(itemArray => {
			prevList.push(itemArray._id);
		});
		if(content === "Name")
		{
			sorteditem = subregions.slice().sort((a,b) => a.name.localeCompare(b.name));
			sorteditem.map(itemArray => {
				newList.push(itemArray._id);
			});
			let joinprev = prevList.slice().join('/');
			let joinnew = newList.slice().join('/');
			if(joinprev === joinnew){
				newList.reverse();
			}			
		}
		else if(content === "Capital")
		{
			sorteditem = subregions.slice().sort((a,b) => a.capital.localeCompare(b.capital));
			sorteditem.map(itemArray => {
				newList.push(itemArray._id);
			});
			let joinprev = prevList.slice().join('/');
			let joinnew = newList.slice().join('/');
			if(joinprev === joinnew){
				newList.reverse();
			}			
		}
		else if(content === "Leader")
		{
			sorteditem = subregions.slice().sort((a,b) => a.leader.localeCompare(b.leader));
			sorteditem.map(itemArray => {
				newList.push(itemArray._id);
			});
			let joinprev = prevList.slice().join('/');
			let joinnew = newList.slice().join('/');
			if(joinprev === joinnew){
				newList.reverse();
			}			
		}
		let transaction = new SortItems_Transaction(newList,prevList, SortTodoItems);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}
            };
	const cleartransaction = () => {
		props.tps.clearAllTransactions();
		togglecheckUndo(props.tps.hasTransactionToUndo());
		togglecheckRedo(props.tps.hasTransactionToRedo());
	}            
    return (
        
        <WCard wCard="header-content-media" className = "regionPage">
            <RegionNavbar 
                createNewSubRegion = {createNewSubRegion} RegionNameHere = {RegionNameHere} undo={tpsUndo} redo={tpsRedo}
                checkUndo= {checkUndo} checkRedo= {checkRedo} tps= {props.tps}
                />
			<WCHeader className = "RegionHeader">
                <RegionHeader sortRegions = {sortRegions} >
                </RegionHeader>
			</WCHeader>
			<WCContent  >
                <RegionContents 
                 setParentBranch = {props.setParentBranch } moveSubregionUpDown = {moveSubregionUpDown} changeindex = {changeindex} changefield = {changefield} togglecheckIndex={togglecheckIndex} togglecheckField={togglecheckField}
                    subregions = {subregions} DeleteRegionHere = {DeleteRegionHere} RegionNameHere = {RegionNameHere}
                    editItem = {editItem} cleartransaction = {cleartransaction} />
                
			</WCContent>
            
                
		</WCard>
		
        
    );
};

export default Region;
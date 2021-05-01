import React, { useState } 				from 'react';
import HomeContents    from './HomeContents';
import { WButton, WCHeader, WCContent, WCMedia, WCard, WRow, WCol } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { GET_DB_MAPS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import CreateMapModal 							from '../modals/CreateMapModal';
import GlobalMapImage from '../imageSrc/globalMap.png';

const Home = (props) => {
    const [CreateMap] 			= useMutation(mutations.CREATE_MAP);
    const [DeleteMap] 			= useMutation(mutations.DELETE_MAP);
    const [editMapName] 			= useMutation(mutations.EDIT_MAP_NAME);
    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
    const [showCreateMap, toggleShowCreateMap] 	= useState(false);
    let todolists 	= [];

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign todolists 
		for(let todo of data.getAllMaps) {
			todolists.push(todo)
		}
    }
    const setShowCreateMap = () => {
		toggleShowCreateMap(!showCreateMap)
	}
    
    const createNewMap = async (newname) => {
        const length = todolists.length;
		//const id = length >= 1 ? todolists[length - 1].id + Math.floor((Math.random() * 100) + 1) : 1;
		const Maxid = Math.max.apply(Math, todolists.map((field)  => { return field.id; }));
		const id = length >= 1 ? Maxid +1 : 1;	
        const newMapname = newname;
        if(props.user){
            let list = {
                _id: '',
                id : id,
                name: newMapname,
                owner: props.user._id                
            }
            const { data } = await CreateMap({ variables: { map: list }, refetchQueries: [{ query: GET_DB_MAPS }] });
            
        }
		
    };

    const DeleteMapHere = async (_id) => {
        const { data } = await DeleteMap({ variables: { _id: _id},refetchQueries: [{ query: GET_DB_MAPS }] });
    };

    const updateMapName = async (_id, value, prev) => {
		//let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateTodolistField);
		//props.tps.addTransaction(transaction);
		//tpsRedo();
        const { data } = await editMapName({ variables: { _id: _id,  name: value },refetchQueries: [{ query: GET_DB_MAPS }] });
        
    };
    return (
        <WCard wCard="header-content-media" className = "home">
			<WCHeader className = "MapHeader">
                Your Maps
			</WCHeader>

            <WRow >
            <WCol size="6" className = "MapLeft" >
                {
			    <WCContent >
                    <HomeContents 
                        updateMapName= {updateMapName}
                        DeleteMapHere = {DeleteMapHere}
                        todolists = {todolists} />
                </WCContent>
                }
            </WCol>
            <WCol size="6">
                <img src ={GlobalMapImage}></img>
                <WButton className = "createMapButton" onClick = {setShowCreateMap} wType="texted" >Create New Map</WButton>
            </WCol>
            </WRow>
                {
				showCreateMap && (<CreateMapModal setShowCreateMap={setShowCreateMap} createNewMap = {createNewMap} />)
			    }
		</WCard>
		
        
    );
};

export default Home;
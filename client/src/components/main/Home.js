import React, { useState } 				from 'react';
import HomeContents    from './HomeContents';
import { WButton, WCHeader, WCContent, WCMedia, WCard } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { GET_DB_MAPS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import CreateMapModal 							from '../modals/CreateMapModal';


const Home = (props) => {
    const [CreateMap] 			= useMutation(mutations.CREATE_MAP);
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
    return (
        <WCard wCard="header-content-media" className = "home">
			<WCHeader className = "MapHeader">
                Your Maps
			</WCHeader>
			<WCContent className = "MapLeft" >
                <HomeContents 
                    todolists = {todolists} />
                
			</WCContent>
            <WCMedia  className = "MapRight" >
            <WButton onClick = {setShowCreateMap} wType="texted" >Create New Map</WButton>
                </WCMedia>
                {
				showCreateMap && (<CreateMapModal setShowCreateMap={setShowCreateMap} createNewMap = {createNewMap} />)
			    }
		</WCard>
		
        
    );
};

export default Home;
import React, { useState } 				from 'react';
import RegionHeader    from './RegionHeader';
import RegionNavbar    from './RegionNavbar';
import RegionContents    from './RegionContents';
import { useHistory } from "react-router-dom";
import { WButton, WCHeader, WCContent, WCMedia, WCard } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import CreateMapModal 							from '../modals/CreateMapModal';
import {useLocation} from "react-router";

const Region = (props) => {
    const [AddRegion] 			= useMutation(mutations.CREATE_SUBREGION);
    const [DeleteRegion] 			= useMutation(mutations.DELETE_REGION);
    const [showCreateMap, toggleShowCreateMap] 	= useState(false);
    let subregions 	= [];
    let pathname =useHistory().location.pathname;
    let connectedParendId = pathname.substring(8, pathname.length);


    const location = useLocation();
    const RegionNameHere =location.state.regionName ;

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

    return (
        
        <WCard wCard="header-content-media" className = "regionPage">
            <RegionNavbar 
                createNewSubRegion = {createNewSubRegion} RegionNameHere = {RegionNameHere}
                />
			<WCHeader className = "RegionHeader">
                <RegionHeader>

                </RegionHeader>
			</WCHeader>
			<WCContent  >
                <RegionContents 
                    subregions = {subregions} DeleteRegionHere = {DeleteRegionHere}/>
                
			</WCContent>
            
                
		</WCard>
		
        
    );
};

export default Region;
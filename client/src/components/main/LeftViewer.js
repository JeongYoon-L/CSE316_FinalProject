import React        from 'react';
import { WNavItem, WButton, WCol, WRow } from 'wt-frontend';
import { useHistory } from "react-router-dom";
import { GET_DB_REGIONS } 				from '../../cache/queries';
import { useMutation, useQuery } 		from '@apollo/client';

const LeftViewer = (props) => {
    const ViewerInfomation = props.ViewerInfomation;
    const name = "Region Name : " + ViewerInfomation.name;
    const parentRegionID = props.ParentName;
    const capital = "Region Capital : " + ViewerInfomation.capital;
    const leader = "Region Leader : " + ViewerInfomation.leader;
    let subregions 	= [];
    let numOfSubRegion = 0;
    let history = useHistory();

    const gobacktoParentRegion = async () => {
        props.setParentBranch([]);
        const gotoParent = "/region/"+ ViewerInfomation.parentRegion;
        history.replace(gotoParent);

    };

    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS, {variables : {parentID : ViewerInfomation._id}});

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
    numOfSubRegion = subregions.length;
    const number = "# of Sub Regions : " + numOfSubRegion ;


    return (
        <WCol>
    <WRow className = " image " >Image</WRow>
    <div className = " viewerText ">{name}</div>
    <WRow>
        <WCol size = "1"></WCol>
		<WCol size="3">
			<div className = "viewerText" >Parent Region :</div>
		</WCol>
		<WCol size="3">
			<div className = "viewerTextBlue" onClick = {gobacktoParentRegion} >{parentRegionID}</div>
		</WCol>
		<WCol size = "4" className = "iconHandleViewer buttonhover " >
        <i className = "material-icons  ">edit</i>          
        </WCol>
	</WRow>


    <div className = " viewerText ">{capital}</div>
    <div className = " viewerText ">{leader}</div>
    <div className = " viewerText ">{number}</div>
    </WCol>
        
    );
};

export default LeftViewer;
import React, { useState } 				from 'react';
import { WNavItem, WButton, WCol, WRow } from 'wt-frontend';
import { useHistory } from "react-router-dom";
import { GET_DB_REGIONS } 				from '../../cache/queries';
import { useMutation, useQuery } 		from '@apollo/client';

const LeftViewer = (props) => {
    const [editingParentRegion, toggleParentRegionEdit] = useState(false);
    const ViewerInfomation = props.ViewerInfomation;
    const name = "Region Name : " + ViewerInfomation.name;
    let parentRegionID = "";
    if(props.parents[1]){
        parentRegionID = props.parents[1].name;
    }
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
    const handleParentRegionEdit = (e) => {
        toggleParentRegionEdit(false);
        const newParentRegion = e.target.value ? e.target.value : "";
        const prevParentRegion = ViewerInfomation.parentRegion;
        if(newParentRegion !== prevParentRegion){
            props.editParentRegion( newParentRegion, prevParentRegion);
            refetch();
        }
    };

    const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS, {variables : {parentID : ViewerInfomation._id, fetchPolicy:'no-cache'}});

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
        {editingParentRegion ? 
        <WCol size="7"><select
                        className='table-select' onBlur={handleParentRegionEdit}
                        autoFocus={true} 
                    >
                        {props.parents.map(item => {
                            return <option value={item._id}>{item.name}</option>
                        })}

                    </select>
        </WCol>
        :
<>
		<WCol size="3">
			<div className = "viewerTextBlue" onClick = {gobacktoParentRegion} >{parentRegionID}</div>
		</WCol>
		<WCol size = "4" className = "iconHandleViewer buttonhover " >
        
                    <div onClick={() => toggleParentRegionEdit(!editingParentRegion)} >
                            <i className = "material-icons  ">edit</i>   
                        </div>
        </WCol>
        </>
        }       
        
	</WRow>


    <div className = " viewerText ">{capital}</div>
    <div className = " viewerText ">{leader}</div>
    <div className = " viewerText ">{number}</div>
    </WCol>
        
    );
};

export default LeftViewer;
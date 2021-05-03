import React from 'react';
import { WButton} from 'wt-frontend';
import { useHistory } from "react-router-dom";
import NavigateToParentEntry 					from '../navbar/NavigateToParentEntry';
import { GET_ALLPARENTS_BRANCHREGION } 				from '../../cache/queries';
import { useMutation, useQuery } 		from '@apollo/client';

const NavigateToParent = (props) => {
    let history = useHistory();
    let pathname =useHistory().location.pathname;
    let connectedParendId = " ";
    
    connectedParendId = pathname.substring(8, pathname.length);
    console.log(connectedParendId);

    let parents = [];
 const { data : dataBranch, error: errorBranch, refetch:BranchRefetch } = useQuery(GET_ALLPARENTS_BRANCHREGION, {variables : {_id : connectedParendId}});
    if(errorBranch) { console.log(errorBranch, 'error'); }
    if(dataBranch && dataBranch.getAllParentsBranchRegion && dataBranch.getAllParentsBranchRegion !== null) { 
        parents = dataBranch.getAllParentsBranchRegion;  
    }

    if(pathname.startsWith("/viewer")){
        console.log(parents);
        let a = parents.slice(1);
        parents = a;
    }

    return (
        parents !== undefined && parents.length > 0 &&
        parents.slice(0).reverse().map(entry => (
            <NavigateToParentEntry
                data={entry} setParentBranch = {props.setParentBranch } 
            />
        ))
    );
};

export default NavigateToParent;
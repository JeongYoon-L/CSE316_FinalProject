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

    if(pathname.startsWith("/home")){
        connectedParendId = pathname.substring(6, pathname.length);
    }
    else if(pathname.startsWith("/welcome")){
        connectedParendId = pathname.substring(9, pathname.length);
    }

    let parents = [];
 const { data : dataBranch, error: errorBranch, refetch:BranchRefetch } = useQuery(GET_ALLPARENTS_BRANCHREGION, {variables : {_id : connectedParendId}, fetchPolicy: 'no-cache'});
    if(errorBranch) { console.log(errorBranch, 'error'); }
    if(dataBranch && dataBranch.getAllParentsBranchRegion && dataBranch.getAllParentsBranchRegion !== null) { 
        parents = dataBranch.getAllParentsBranchRegion;  
        // exports.hello = function() {
        //     BranchRefetch();
        //     return "Hello";
        //   }
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
                data={entry} setParentBranch = {props.setParentBranch } cleartransaction = {props.cleartransaction} BranchRefetch={BranchRefetch} fetchUser={props.fetchUser}
            />
        ))
    );
};

export default NavigateToParent;
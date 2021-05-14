import React from 'react';
import { WButton} from 'wt-frontend';
import { useHistory } from "react-router-dom";

const NavigateToParentEntry = (props) => {
    const { data } = props;    
    let history = useHistory();
    const changeRoute = async () => {
        props.cleartransaction();    
        props.setParentBranch([]);
        const routeHere = "/region/" + data._id;
        history.push(routeHere);
        
    }


    
    let printString = data.name + " > ";
    return (
        <div className='branch' onClick = {changeRoute} >
            {printString}
        </div>
    );
};

export default NavigateToParentEntry;
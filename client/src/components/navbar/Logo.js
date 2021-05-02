import React from 'react';
import { WButton} from 'wt-frontend';
import { useHistory } from "react-router-dom";

const Logo = (props) => {
    let history = useHistory();
    const changeRoute = async () => {
        props.setParentBranch([]);
        history.replace("/home")
        
    }
    
    return (
        <div className='logo'  onClick={changeRoute}>
            The World Data Mapper
        </div>
    );
};

export default Logo;
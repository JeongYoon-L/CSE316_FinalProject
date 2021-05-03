import React from 'react';
import { WButton} from 'wt-frontend';
import { useHistory } from "react-router-dom";

const Logo = (props) => {
    let history = useHistory();
    const changeRoute = async () => {
        props.setParentBranch([]);
        if(props.user == null){
            history.replace("/welcome");    
        }
        else{
        let UserRoute = "/home/" + props.user._id;
        history.replace(UserRoute);
        }
        
        
    }
    
    return (
        <div className='logo'  onClick={changeRoute}>
            The World Data Mapper
        </div>
    );
};

export default Logo;
import React from 'react';
import { WButton} from 'wt-frontend';
import { useHistory } from "react-router-dom";

const Logo = (props) => {
    let history = useHistory();
    return (
        <div className='logo'  onClick={() => history.replace("/home")}>
            The World Data Mapper
        </div>
    );
};

export default Logo;
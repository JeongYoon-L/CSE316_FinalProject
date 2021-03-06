import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';
import { useHistory } from "react-router-dom";
import NavigateToParent 					from '../navbar/NavigateToParent';

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);
    const userName = props.user === null ? " " : props.user.Name;
    let history = useHistory();


    const handleLogout = async (e) => {
        props.setShowWelcome(false);
        history.replace("/welcome");
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset) props.setActiveList({});
        }
    };

    return (
        <>
        <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options-purple" onClick={props.setShowUpdate} wType="texted" hoverAnimation="text-primary">
                    {userName}
                </WButton>
            </WNavItem>
        <WNavItem hoverAnimation="lighten">
            <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                Logout
            </WButton>
        </WNavItem >
        </>
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options-purple" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary"> 
                    Create Account
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? 
                
                 <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate}/>
                
                : 
                <LoggedIn fetchUser={props.fetchUser} setActiveList={props.setActiveList} logout={props.logout} user = {props.user} setShowUpdate = {props.setShowUpdate} 
                setShowWelcome={props.setShowWelcome} />
                
            }
        </>

    );
};

export default NavbarOptions;
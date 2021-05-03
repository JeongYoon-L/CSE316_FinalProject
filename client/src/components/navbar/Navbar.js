import React, { useState } 				from 'react';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import NavbarOptions 					from '../navbar/NavbarOptions';
import NavigateToParent 					from '../navbar/NavigateToParent';
import Logo 							from '../navbar/Logo';
import { GET_DB_MAPS } 				from '../../cache/queries';
import { useMutation, useQuery } 		from '@apollo/client';
import CreateAccount 					from '../modals/CreateAccount';
import UpdateAccount 					from '../modals/UpdateAccount';
import Login 							from '../modals/Login';

const Navbar = (props) => {
    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
    const [activeList, setActiveList] 		= useState({});
    const auth = props.user === null ? false : true;
    const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showWelcome, toggleShowWelcome] 	= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);

    const loadTodoList = (list) => {
		setActiveList(list);

	}

	const setShowUpdate = () => {
		toggleShowUpdate(!showUpdate);
		toggleShowCreate(false);
		toggleShowLogin(false);
	};

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
		toggleShowWelcome(true);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	};
	const setShowWelcome = () => {
		toggleShowWelcome(false);
		
	};	


    return (
        <WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' setParentBranch = {props.setParentBranch } user = {props.user} />
						</WNavItem>
					</ul>
					<ul>
						{showWelcome ?
					<NavigateToParent setParentBranch = {props.setParentBranch } />	:
					<></>
						}
					</ul> 
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} user = {props.user} setParentBranch = {props.setParentBranch }
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadTodos={refetch} 			setActiveList={loadTodoList}
							setShowWelcome={setShowWelcome} setShowUpdate = {setShowUpdate}
						/>
					</ul>

            {
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} reloadTodos={refetch}setShowLogin={setShowLogin}/>)
			}
			{
				showUpdate && (<UpdateAccount fetchUser={props.fetchUser} user = {props.user} reloadTodos={refetch}setShowUpdate={setShowUpdate}/>)
			}
				</WNavbar>
    );
};

export default Navbar;
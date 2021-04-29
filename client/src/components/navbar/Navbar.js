import React, { useState } 				from 'react';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import NavbarOptions 					from '../navbar/NavbarOptions';
import Logo 							from '../navbar/Logo';
import { GET_DB_MAPS } 				from '../../cache/queries';
import { useMutation, useQuery } 		from '@apollo/client';
import CreateAccount 					from '../modals/CreateAccount';
import Login 							from '../modals/Login';

const Navbar = (props) => {
    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
    const [activeList, setActiveList] 		= useState({});
    const auth = props.user === null ? false : true;
    const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showWelcome, toggleShowWelcome] 	= useState(true);

    const loadTodoList = (list) => {
		setActiveList(list);

	}

    
	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
		toggleShowWelcome(showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
		toggleShowWelcome(showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	};
	const setShowWelcome = () => {
		
	};	


    return (
        <WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadTodos={refetch} 			setActiveList={loadTodoList}
							setShowWelcome={setShowWelcome} 
						/>
					</ul>

            {
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} reloadTodos={refetch}setShowLogin={setShowLogin}/>)
			}
				</WNavbar>
    );
};

export default Navbar;
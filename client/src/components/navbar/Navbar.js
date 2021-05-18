import React, { useState } 				from 'react';
import { WNavbar, WSidebar, WNavItem , WRow, WCol} 	from 'wt-frontend';
import NavbarOptions 					from '../navbar/NavbarOptions';
import NavigateToParent 					from '../navbar/NavigateToParent';
import Logo 							from '../navbar/Logo';
import { GET_DB_MAPS, GET_DB_REGIONS } 				from '../../cache/queries';
import { useMutation, useQuery } 		from '@apollo/client';
import CreateAccount 					from '../modals/CreateAccount';
import UpdateAccount 					from '../modals/UpdateAccount';
import Login 							from '../modals/Login';
import * as mutations 					from '../../cache/mutations';
import { useHistory } from "react-router-dom";

const Navbar = (props) => {
    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
	const [findwithArrowViewer] 			= useMutation(mutations.ARROW_VIEWER);
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
	let history = useHistory();
	let toggleArrow = false;
	let pathname =useHistory().location.pathname;
	if(pathname.startsWith("/viewer")){
		toggleArrow = true;
	}
	else{
		toggleArrow = false;
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
	const cleartransaction = () => {		
		props.tps.clearAllTransactions();	
	}      
	const movetoNextViewer = async (direction) => {	
		props.tps.clearAllTransactions();
		props.setParentBranch([]);
		let pathname =history.location.pathname;
    	let currentID = pathname.substring(8, pathname.length);	
		const { data } = await findwithArrowViewer({ variables: {  _id : currentID, direction: direction}});
		let cur = data.findwithArrowViewer;
		if(cur !== null){
			const RouteViewerRegionID = "/viewer/" + cur._id;
			history.push({
				pathname : RouteViewerRegionID,
				state : {todo : cur, regionNameViewer : cur.parentName}}
				);
		}
		
        
	}      
    return (
        <WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' setParentBranch = {props.setParentBranch } user = {props.user} />
						</WNavItem>
					</ul>
					<ul className = "branchLeft">
						{showWelcome ?
					<NavigateToParent fetchUser={props.fetchUser} setParentBranch = {props.setParentBranch } cleartransaction = {cleartransaction} />	:
					<></>
						}
					</ul> 
					<ul className = "arrowMid" >
						{toggleArrow ?
						<WRow>
							{true ?    
							<WCol size = "1" className = "buttonhover ViewerleftButton " >
							<i className="material-icons " onClick = {() => movetoNextViewer("left")} >arrow_backward</i>
							</WCol>:
							<WCol  size = "1"  className = "buttonhover ViewerleftButton " >
							<i className="material-icons " >arrow_backward</i>
							</WCol>
							}
							<div>&nbsp;</div>
							{true ? 
							<WCol className = "buttonhover ViewerrightButton "  >
							<i className="material-icons " onClick = {() => movetoNextViewer("right")} >arrow_forward</i>
							</WCol>:
							<WCol className = "buttonhover ViewerrightButton "  >
							<i className="material-icons "  >arrow_forward</i>
							</WCol>
							}
							
						</WRow>

					:
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
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} reloadTodos={refetch} />)
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
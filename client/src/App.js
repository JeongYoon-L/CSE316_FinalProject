import React, { useState } 				from 'react';
import Home 					from './components/main/Home';
import Welcome 					from './components/main/Welcome';
import Region 					from './components/main/Region';
import Viewer 					from './components/main/Viewer';
import Navbar 					from './components/navbar/Navbar.js';
import NavigateToParent 					from './components/navbar/NavigateToParent.js';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
 
const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
	let refreshTps = false;
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);
	const [parentBranch, setParentBranch] = useState([]);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }
	return(
		<BrowserRouter>
		<WLayout wLayout="header" className = "basic">
			<WLHeader>
				<Navbar fetchUser={refetch} user={user} refreshTps={refreshTps} setParentBranch = {setParentBranch }>
					
				</Navbar>
			</WLHeader>
			<WLMain className = "maincolor" >
			
			<Switch>			
				<Route path = "/welcome" render={() => <Welcome />}/>		
				<Route path = "/home" render={() => <Home fetchUser={refetch} user={user} refreshTps={refreshTps} setParentBranch = {setParentBranch } />}/>
				<Route path = "/home/:id" children={<Child />}/>
            	<Route path = "/region" render={() => <Region user={user} fetchUser={refetch} setParentBranch = {setParentBranch } />}/>
				<Route path = "/region/:id" children={<Child />}/>
				<Route path = "/viewer" render={() => <Viewer user={user} fetchUser={refetch}  setParentBranch = {setParentBranch} />}/>
				<Route path = "/viewer/:id" children={<Child />}/>
		
			</Switch>

			</WLMain>
			</WLayout>
			
		</BrowserRouter>
	);
}

function Child(){
	let {id} = useParams();
	return (
		<div>
			<h3>
				ID: {id}
			</h3>
		</div>


	);
}

export default App;
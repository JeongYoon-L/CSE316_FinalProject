import React, { useState } 	from 'react';
import { useHistory } from "react-router-dom";
import { LOGIN } 			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WCol, WRow } from 'wt-frontend';

const Login = (props) => {
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Email/Password not found.";
	const [Login] = useMutation(LOGIN);
	let history = useHistory();

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {

		const { loading, error, data } = await Login({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			props.fetchUser();
			props.reloadTodos();
			toggleLoading(false)
			let UserRoute = "/home/" + data.login._id;
			history.replace(UserRoute);
			props.setShowLogin(false)
		};
	};

	return (
		<WModal className="login-modal" cover="true" visible={props.setShowLogin}>
			<WMHeader  className="modal-header" onClose={() => props.setShowLogin(false)}>
				Login To Your Account
			</WMHeader >

			{
				loading ? <div />
					: <WMMain className="main-login-modal ColorBlack ">

<div className="modal-spacer">&nbsp;</div>
							<WRow className="modal-col-gap signup-modal">
								<WCol size="3">
									<div className = "AccountText" >Email:</div>
									</WCol>
									<WCol size="7">
									<WInput 
										className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
										barAnimation="solid" labelText='"Enter Email Here"' wType="outlined" inputType="text" 
									/>
								</WCol>
								<WCol size = "1" ></WCol>
							</WRow>

							<div className="modal-spacer">&nbsp;</div>
							<WRow className="modal-col-gap signup-modal">
								<WCol size="3">
									<div className = "AccountText" >Password:</div>
									</WCol>
									<WCol size="7">
									<WInput 
										className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
										barAnimation="solid" labelText= '"Enter Password Here"' wType="outlined" inputType="password" 
									/>
								</WCol>
								<WCol size = "1" ></WCol>
							</WRow>
						{
							showErr ? <div className='modal-error'>
								{errorMsg}
							</div>
								: <div className='modal-error'>&nbsp;</div>
						}

					</WMMain >
			}
			<WMFooter className = "ColorBlack">
				<WButton className="modal-button grayButton-cancel" onClick={handleLogin} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Login
				</WButton>
				<label className="col-spacer">&nbsp;</label>
				<label className="col-spacer">&nbsp;</label>
				

				<WButton className="modal-button grayButton-cancel" onClick={() => props.setShowLogin(false)} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
                    Cancel
				</WButton>
			</WMFooter>
		</WModal >
	);
}

export default Login;
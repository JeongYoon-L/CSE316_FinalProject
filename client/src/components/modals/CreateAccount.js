import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', Name: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const [Register] = useMutation(REGISTER);
	const errorMsg = "User with that email already registered.";

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleCreateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Register({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			toggleLoading(false);
			if(data.register.email === 'already exists') {
				displayErrorMsg(true);
				//alert('User with that email already registered');
			}
			else {
				//props.fetchUser();
				//props.reloadTodos();
				//console.log(data);
				alert("Your Account is created. Please Login");
				props.setShowCreate(false);
			}
			

		};
	};

	return (
		<WModal className="signup-modal"  cover="true" visible={props.setShowCreate}>
			<WMHeader  className="modal-header" onClose={() => props.setShowCreate(false)}>
				Create A New Account
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className = "ColorBlack " >
							<WRow className="modal-col-gap signup-modal">
								<WCol size="3">
									<div className = "AccountText" >Name:</div>
									</WCol>
									<WCol size="7">
									<WInput 
										className="modal-input" onBlur={updateInput} name="Name" labelAnimation="up" 
										barAnimation="solid" labelText='"Enter Name Here"' wType="outlined" inputType="text" 
									/>
								</WCol>
								<WCol size = "1" ></WCol>
							</WRow>

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
										barAnimation="solid" labelText='"Enter Password Here"' wType="outlined" inputType="password" 
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


					</WMMain>
			}
			<WMFooter  className = "ColorBlack " >
			<label className="col-spacer">&nbsp;</label>
				<WButton className="modal-button grayButton" onClick={handleCreateAccount} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Create Account
				</WButton>

				<label className="col-spacer">&nbsp;</label>
				<label className="col-spacer">&nbsp;</label>
				

				<WButton className="modal-button grayButton-cancel" onClick={() => props.setShowCreate(false)} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
                    Cancel
				</WButton>
    
			</WMFooter>
			
		</WModal>
	);
}

export default CreateAccount;

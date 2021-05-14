import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';
import { useHistory } from "react-router-dom";
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', Name: '' });
	const [loading, toggleLoading] = useState(false);
	const [Update] = useMutation(UPDATE);
	let history = useHistory();
    const CurrentUser = props.user;
	const errorMsg = "User with that email already registered.";
	const [showErr, displayErrorMsg] = useState(false);
	
	const updateInput = (e) => {
		const { name, value } = e.target;
        if (value == null || value == undefined){
            value = CurrentUser.Name;
        }
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		for (let field in input) {
            if(!input[field]){
                if(field == "email"){
                    input[field] = CurrentUser.email;
                }
                if(field == "password"){
                    alert('You must enter at least one changed password');
				    return "B";
                }
                if(field == "Name"){
                    input[field] = CurrentUser.Name;
                }
            }
            
		}
        const CurrentUserId = CurrentUser._id;
		const CurrentUserEmail = CurrentUser.email;
		const { loading, error, data } = await Update({ variables: { ...input,  CurrentUserId, CurrentUserEmail } });

        console.log(input);
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			if(data.update.email === 'already exists') {
				displayErrorMsg(true);
				//alert('User with that email already registered');
			}
			else{
				console.log(data)
				toggleLoading(false);
				props.fetchUser();
				props.setShowUpdate(false);
				let UserRoute = "/home/" + data.update._id;
				history.replace(UserRoute);
			}
			

		};
	};

	return (
		<WModal className="signup-modal"  cover="true" visible={props.setShowUpdate}>
			<WMHeader  className="modal-header" onClose={() => props.setShowUpdate(false)}>
				Update Account
			</WMHeader>

			{
				loading ? <div />
					:  <WMMain className = "ColorBlack " >
					<WRow className="modal-col-gap signup-modal">
						<WCol size="3">
							<div className = "AccountText" >Name:</div>
							</WCol>
							<WCol size="7">
							<WInput 
								className="modal-input" onBlur={updateInput} name="Name" labelAnimation="up" 
								barAnimation="solid" labelText= {props.user.Name} wType="outlined" inputType="text" 
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
								barAnimation="solid" labelText={props.user.email} wType="outlined" inputType="text" 
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
								className="modal-input" onBlur={updateInput} name="password" 
								barAnimation="solid" placeholderText= "*****" wType="outlined" inputType="password" 
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
			<WButton className="modal-button grayButton-update " onClick={handleUpdateAccount} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" >
					Update
				</WButton>

				<label className="col-spacer">&nbsp;</label>
				<label className="col-spacer">&nbsp;</label>
				

				<WButton className="modal-button grayButton-cancel" onClick={() => props.setShowUpdate(false)} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
                    Cancel
				</WButton>
    
			</WMFooter>
			
		</WModal>
	);
}

export default UpdateAccount;

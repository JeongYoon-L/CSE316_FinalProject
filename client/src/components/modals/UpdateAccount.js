import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', Name: '' });
	const [loading, toggleLoading] = useState(false);
	const [Update] = useMutation(UPDATE);
    const CurrentUser = props.user;
	
	const updateInput = (e) => {
		const { name, value } = e.target;
        if (value == null || value == undefined){
            value = CurrentUser.name;
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
		const { loading, error, data } = await Update({ variables: { ...input,  CurrentUserId } });

        console.log(input);
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			props.fetchUser();
			props.setShowUpdate(false);

		};
	};

	return (
		<WModal className="signup-modal"  cover="true" visible={props.setShowUpdate}>
			<WMHeader  className="modal-header" onClose={() => props.setShowUpdate(false)}>
				Update Account
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
							<WRow className="modal-col-gap signup-modal">
								<WCol size="6">
									<WInput 
										className="" onBlur={updateInput} name="Name" labelAnimation="up" 
										barAnimation="solid" labelText="Name" wType="outlined" inputType="text" 
									/>
								</WCol>
							</WRow>

							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
								barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
							/>
							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
								barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
							/>
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Submit
				</WButton>
			</WMFooter>
			
		</WModal>
	);
}

export default UpdateAccount;

import React, { useState } 	from 'react';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const CreateMapModal = (props) => {
    const [showCreateMapErr, displayCreateMapErrorMsg] = useState(false);
    let newName = "";
    const CreateMaperrorMsg = "*Should Enter New Map Name";
    
    const updateInput = (e) => {
        newName = e.target.value;
    }

    const handleCreateMapHere = async () => {
        if(!newName){
            displayCreateMapErrorMsg(true);
        }
        else{
            props.createNewMap(newName);
            props.setShowCreateMap(false);
        }
    }
	return (
		<WModal className="login-modal" visible={true}>
			<WMHeader  className="modal-header" onClose={() => props.setShowCreateMap(false)}>
				Enter New Map Name
			</WMHeader >

            <WMMain className="main-login-modal">

            <WInput className="modal-input"  onBlur={updateInput} name='New Name' labelAnimation="up" barAnimation="solid" labelText="New Name" wType="outlined" inputType='text' />
            <div className="modal-spacer">&nbsp;</div>
            {
							showCreateMapErr ? <div className='modal-error'>
								{CreateMaperrorMsg}
							</div>
								: <div className='modal-error'>&nbsp;</div>
						}

            </WMMain >

			<WMFooter>
                <WButton className="modal-button" onClick={handleCreateMapHere} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Create
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowCreateMap(false)} wType="texted">
                    Cancel
				</WButton>

			</WMFooter>
		</WModal >
	);
}

export default CreateMapModal;
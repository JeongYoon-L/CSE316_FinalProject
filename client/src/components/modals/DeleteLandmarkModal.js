import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const DeleteLandmarkModal = (props) => {

    const handleDeleteLandmark = async () => {
        let landmarkArray = props.landmark;
        if(props.todo !== null){
            let newLandmarkArray = [];
            for(let i=0; i<landmarkArray.length ; i++){
                if(landmarkArray[i] == props.todo){
                    
                }
                else {
                    newLandmarkArray.push(landmarkArray[i]);
                }
            }
            props.editLandmark( newLandmarkArray, props.landmark);
            
        }
        props.setShowDeleteLandmark(false);
    }

    return (
        <WModal className="delete-modal" cover="true" visible={props.setShowDeleteLandmark}>
            <WMHeader  className="modal-header" onClose={() => props.setShowDeleteLandmark(false)}>
                Delete Landmark?
			</WMHeader >

            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDeleteLandmark(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDeleteLandmark} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
            </WMMain>

        </WModal >
    );
}

export default DeleteLandmarkModal;
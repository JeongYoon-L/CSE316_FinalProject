import React, { useState } 				from 'react';
import { WInput, WButton, WCol, WRow} from 'wt-frontend';
import DeleteLandmarkModal from '../modals/DeleteLandmarkModal';


const LandmarkTable = (props) => {
    const [editLandmark, toggleEditLandmark] 	= useState(false);
    const [showDeleteLandmark, toggleShowDeleteLandmark] 	= useState(false);
    let landmarkArray = props.landmark;
    const handleLandmarkEdit = (e) => {
        if(props.todo !== null){
            const newName = e.target.value ? e.target.value : props.todo ;
            let newLandmarkArray = [];
            for(let i=0; i<landmarkArray.length ; i++){
                if(landmarkArray[i] == props.todo){
                    newLandmarkArray.push(newName);
                }
                else {
                    newLandmarkArray.push(landmarkArray[i]);
                }
            }
            const prevName = props.todo;
            if(newName !== prevName){
                props.editLandmark( newLandmarkArray, props.landmark);
            }
        }
        toggleEditLandmark(false);
        
    };
    const setShowDeleteLandmark = () => {
		toggleShowDeleteLandmark(!showDeleteLandmark)
	}
    return (
        <>
        {
          
                    editLandmark ?   <WInput className="landmarkStyle-input" inputClass="landmarkStyle-input"
                                        name='name' onBlur={handleLandmarkEdit} autoFocus={true} defaultValue={props.todo} 
                                    />
                                :<WRow>
                                    <WCol size = "1">
                                        <WButton className = "closeButtonForLandmark buttonhover " onClick = {setShowDeleteLandmark}>
                                            <i className = "material-icons ">
                                                close
                                            </i>
                                        </WButton>
                                    </WCol>
                                    <WCol size = "10" className = "landmarkStyle" onClick={() => toggleEditLandmark(!editLandmark)}>
                                        {" " + props.todo}
                                    </WCol>
                                </WRow>         
             
        }
        {
            showDeleteLandmark && (<DeleteLandmarkModal todo = {props.todo} setShowDeleteLandmark={setShowDeleteLandmark} editLandmark = {props.editLandmark} setShowDeleteLandmark = {setShowDeleteLandmark} landmark = {props.landmark}/>)
            }
            
        </>
    );
};

export default LandmarkTable;
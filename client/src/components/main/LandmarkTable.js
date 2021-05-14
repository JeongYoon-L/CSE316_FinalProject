import React, { useState } 				from 'react';
import { WInput, WButton, WCol, WRow} from 'wt-frontend';


const LandmarkTable = (props) => {
    const [editLandmark, toggleEditLandmark] 	= useState(false);

    const handleSubmitLandmark = async () =>{
        toggleEditLandmark(false);
    }
    const openInput = async () =>{
        toggleEditLandmark(true);
    }
    return (
        <>
        {
          
                    editLandmark ?   <WInput className="landmarkStyle-input" inputClass="landmarkStyle-input"
                                        name='name' onBlur={handleSubmitLandmark} autoFocus={true} defaultValue={props.todo} 
                                    />
                                :<WRow>
                                    <WCol size = "1">
                                        <WButton className = "closeButtonForLandmark buttonhover " onClick = {() => toggleEditLandmark(true)}>
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
        
            
        </>
        
    );
};

export default LandmarkTable;
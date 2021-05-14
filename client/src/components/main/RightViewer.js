import React, { useState } 				from 'react';
import { WInput, WButton, WCol, WRow} from 'wt-frontend';
import LandmarkTable   from './LandmarkTable';


const RightViewer = (props) => {
    let landmark = props.todoNew.landmark;
    let canshowLandmark =landmark && (landmark !==[]);
    const handleLandmarkAdd = async (e) =>{
        props.toggleInputLandmark(e.target.value);
    }
    return (
        <>
        {
            <div className = "landmarkViewer">
                {canshowLandmark &&
                landmark.map((todo , index)=> (
                    <LandmarkTable      
                        todo= {todo} landmark= {landmark} editLandmark= {props.editLandmark}
                    />   
                ))
        }
        
            </div>
            }
           
            <WRow>
            <WCol size = "1" className = "addButtonHalf buttonhover "  wType="texted" onClick= {() =>props.addLandmark()} >
                <i className="material-icons ">add</i>
                </WCol>
                <WCol size = "9" >
                    <WInput className = "landmarkInput" 
							name="Enter Landmark" labelAnimation="up"  onBlur={handleLandmarkAdd}
                            autoFocus={true} defaultValue={props.landmarkInput} 
							barAnimation="solid" labelText="Enter Landmark" wType="outlined" inputType="text" 
			        />
                </WCol>
            </WRow>
        </>
        
    );
};

export default RightViewer;
import React        from 'react';
import { WInput, WButton, WCol, WRow} from 'wt-frontend';

const RightViewer = (props) => {
    return (
        <>
            {
                <div className = "landmarkViewer" >Landmark Here</div>
                
            }
            <WRow>
            <WCol size = "1" className = "addButtonHalf buttonhover "  wType="texted" >
                <i className="material-icons ">add</i>
                </WCol>
                <WCol size = "9" >
            <WInput className = "landmarkInput" 
									name="Enter Landmark" labelAnimation="up" 
									barAnimation="solid" labelText="Enter Landmark" wType="outlined" inputType="text" 
								/>
                                </WCol>
            </WRow>
        </>
        
    );
};

export default RightViewer;
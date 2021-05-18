import React from 'react';
//import { useHistory } from "react-router-dom";
import { WButton, WRow, WCol } from 'wt-frontend';

const RegionNavbar = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const headerStyle = props.disabled ? ' table-header-section-disabled ' : 'table-header-section ';
    let canUndo = (props.checkUndo);
    let canRedo = (props.checkRedo);
    // let history = useHistory();

    // const changeRouteToParent = async () => {
    //     alert();
    //     props.setParentBranch([]);
    //     props.cleartransaction();
    //     let ReouteParentRegionID = "/viewer/" + props.Region_IDHere;
    //     history.push(ReouteParentRegionID);
        
    // }
    
    return (
        <WRow className="regionNavbarPage">
            <WCol size="1">
                <WButton className = "addButton buttonhover " onClick = {() =>props.createNewSubRegion() } wType="texted" >
                <i className="material-icons  ">add</i>
                </WButton>
            </WCol>
            {canUndo ?            
                <WButton className = "subregionButton buttonhover " onClick={props.undo} >
                <i className="material-icons ">undo</i>
                </WButton>:
                <WButton className = "subregionButton-disabled ">
                <i className="material-icons ">undo</i>
                </WButton>
            }
            {canRedo ? 
                <WButton className = "subregionButton buttonhover "onClick={props.redo} >
                <i className="material-icons ">redo</i>
                </WButton>:
               <WButton className = "subregionButton-disabled " >
               <i className="material-icons ">redo</i>
               </WButton>               
            }
            <WCol size ="3" className = "RegionNameDesc" >
                <div>Region Name : 
                </div>
            </WCol>
            <WCol size ="4" className = "BlueRegionNameText"  >
                <div>{props.RegionNameHere}</div>
            </WCol>



        </WRow>
    );
};

export default RegionNavbar;
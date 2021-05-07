import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const RegionNavbar = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const headerStyle = props.disabled ? ' table-header-section-disabled ' : 'table-header-section ';
    
    return (
        <WRow className="regionNavbarPage">
            <WCol size="1">
                <WButton className = "addButton" onClick = {() =>props.createNewSubRegion() } wType="texted" >
                <i className="material-icons">add</i>
                </WButton>
            </WCol>
                <WButton className = "subregionButton" onClick={props.undo} >
                <i className="material-icons">undo</i>
                </WButton>
                <WButton className = "subregionButton "onClick={props.redo} >
                <i className="material-icons">redo</i>
                </WButton>
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
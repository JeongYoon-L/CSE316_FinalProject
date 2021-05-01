import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const RegionNavbar = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const headerStyle = props.disabled ? ' table-header-section-disabled ' : 'table-header-section ';
    
    return (
        <WRow className="regionNavbarPage">
            <WCol size="1">
                <WButton className={`${headerStyle}`} onClick = {() =>props.createNewSubRegion() } wType="texted" >+</WButton>
            </WCol>
            <WCol size ="4" className = "RegionNameDesc" >
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
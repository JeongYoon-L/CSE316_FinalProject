import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const RegionHeader = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const headerStyle = props.disabled ? ' table-header-section-disabled ' : 'table-header-section ';
    const clickDisabled = () => { };
    
    let canUndo = (props.checkUndo);
    let canRedo = (props.checkRedo);

    const closefunc = () => {
        props.cleartransaction();
        props.setActiveList({});
    }
    return (
        <WRow className="table-header">
            <WCol size="3">
                <WButton className={`${headerStyle}`} onClick = {props.disabled ? clickDisabled : () => props.sortItem( "Task") } wType="texted" >Name</WButton>
            </WCol>

            <WCol size="2">
                <WButton className={`${headerStyle}`} onClick = {props.disabled ? clickDisabled : () => props.sortItem( "Date")} wType="texted">Capital</WButton>
            </WCol>

            <WCol size="2">
                <WButton className={`${headerStyle}`} onClick = {props.disabled ? clickDisabled : () => props.sortItem( "Status")} wType="texted" >Leader</WButton>
            </WCol>
            
            <WCol size="2">
                <WButton className={`${headerStyle}`} onClick = {props.disabled ? clickDisabled : () => props.sortItem( "Assigned")}  wType="texted" >Flag</WButton>
            </WCol>
            <WCol size="3">
                <WButton className={`${headerStyle}`} onClick = {props.disabled ? clickDisabled : () => props.sortItem( "Assigned")}  wType="texted" >Landmark</WButton>
            </WCol>


        </WRow>
    );
};

export default RegionHeader;
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
            <WCol size="3" className = "NameHeader" >
                <WButton className={`${headerStyle}`} wType="texted" >
                    Name
                <i className="material-icons">arrow_downward</i></WButton>
                
            </WCol>

            <WCol size="2">
                <WButton className={`${headerStyle}`} wType="texted">Capital
                <i className="material-icons">arrow_downward</i></WButton>
            </WCol>

            <WCol size="2">
                <WButton className={`${headerStyle}`} wType="texted" >Leader
                <i className="material-icons">arrow_downward</i></WButton>
            </WCol>
            
            <WCol size="2">
                <WButton className={`${headerStyle}`}   wType="texted" >Flag
                <i className="material-icons">arrow_downward</i></WButton>
            </WCol>
            <WCol size="3">
                <WButton className={`${headerStyle}`}  wType="texted" >Landmark
                <i className="material-icons">arrow_downward</i></WButton>
            </WCol>


        </WRow>
    );
};

export default RegionHeader;
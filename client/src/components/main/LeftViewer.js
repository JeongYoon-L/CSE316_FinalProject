import React        from 'react';
import { WNavItem, WInput, WCol, WRow } from 'wt-frontend';

const LeftViewer = (props) => {
    const ViewerInfomation = props.ViewerInfomation;
    const name = "Region Name : " + ViewerInfomation.name;
    const parentRegionID = "Parent Region : " + ViewerInfomation.parentRegion;
    const capital = "Region Capital : " + ViewerInfomation.capital;
    const leader = "Region Leader : " + ViewerInfomation.leader;

    
    return (
        <WCol>
    <WRow className = " image " >Image</WRow>
    <div className = " viewerText ">{name}</div>
    <div className = " viewerText ">{parentRegionID}</div>
    <div className = " viewerText ">{capital}</div>
    <div className = " viewerText ">{leader}</div>
    </WCol>
        
    );
};

export default LeftViewer;
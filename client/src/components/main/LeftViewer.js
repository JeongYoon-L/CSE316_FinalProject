import React        from 'react';
import { WNavItem, WInput, WCol, WRow } from 'wt-frontend';
import { useHistory } from "react-router-dom";

const LeftViewer = (props) => {
    const ViewerInfomation = props.ViewerInfomation;
    const name = "Region Name : " + ViewerInfomation.name;
    const parentRegionID = "Parent Region : " + props.ParentName;
    const capital = "Region Capital : " + ViewerInfomation.capital;
    const leader = "Region Leader : " + ViewerInfomation.leader;

    let history = useHistory();

    const gobacktoParentRegion = async () => {
        const gotoParent = "/region/"+ ViewerInfomation.parentRegion;
        history.replace(gotoParent);

    };

    return (
        <WCol>
    <WRow className = " image " >Image</WRow>
    <div className = " viewerText ">{name}</div>
    <div className = " viewerTextBlue " onClick = {gobacktoParentRegion} >{parentRegionID}</div>
    <div className = " viewerText ">{capital}</div>
    <div className = " viewerText ">{leader}</div>
    </WCol>
        
    );
};

export default LeftViewer;
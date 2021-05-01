import React, { useState } 				from 'react';
import {useLocation} from "react-router";
import LeftViewer    from './LeftViewer';
import RightViewer    from './RightViewer';
import { WButton, WCHeader, WCContent, WCMedia, WCard, WRow, WCol } from 'wt-frontend';
import { useMutation, useQuery } 		from '@apollo/client';
import { GET_DB_MAPS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import CreateMapModal 							from '../modals/CreateMapModal';


const Viewer = (props) => {
    const location = useLocation();
    const ViewerInfomation =location.state.todo ;
    const ParentName =location.state.regionNameViewer ;


    return (
        <WCard wCard="header-content-media" className = "viewerPage">
			<WCHeader className = "ViewerHeader">
            <WRow>
                <WCol size="1"></WCol>
                <WCol size="1">
                    <WButton  wType="texted" className = "VeiwerText " >Undo</WButton>
                </WCol>
                <WCol size="1">
                    <WButton  wType="texted" className = "VeiwerText " >Redo</WButton>
                </WCol>
                <WCol size="1"></WCol>
                <WCol size="1"></WCol>
                <WCol size="1"></WCol>
                <WCol size="1"></WCol>
                <WCol size="3">{
                    <div className = "VeiwerText "> Region Landmark</div>
                    }</WCol>
                <WCol size="1"></WCol>
                <WCol size="1"></WCol>
            </WRow>
			</WCHeader>

            <WRow >
            <WCol size="6"  >
                {
                    

			<WCContent >
            <LeftViewer 
                ViewerInfomation = {ViewerInfomation} ParentName = {ParentName}/>
            
        </WCContent>
                }
            </WCol>

            <WCol size="6">
                {
                    <WCMedia   >
                               <RightViewer 
                ViewerInfomation = {ViewerInfomation} />
            
                    </WCMedia>
                }
            </WCol>
            </WRow>
               
		</WCard>
		
        
    );
};

export default Viewer;
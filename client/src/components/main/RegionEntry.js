import React, { useState, useEffect }  from 'react';
import { useHistory } from "react-router-dom";
import Viewer    from './Viewer';
import { WNavItem, WInput, WCol, WRow, WButton } from 'wt-frontend';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DeleteRegion 							from '../modals/DeleteRegion';

const RegionEntry = (props) => {
//    const { data } = props;
    const todo = props.todo;
    const name = props.todo.name;
    const capital = props.todo.capital;
    const leader = props.todo.leader;
    const landmark = props.todo.landmark; //string array
    const flag = props.todo.Flag;
    const RouteSubRegionID = "/region/" + props._id;

    let landmarkForSpreadsheet = "";
    landmark.map(item => {
        if(!landmarkForSpreadsheet || landmarkForSpreadsheet == ""){
            landmarkForSpreadsheet = item
        }
        else{landmarkForSpreadsheet = item +","+ landmarkForSpreadsheet;}
});

    
    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);
    const [editingFlag, toggleFlagEdit] = useState(false);
    const [editingLandmark, toggleLandmarkEdit] = useState(false);
    const [showDeleteRegion, toggleShowDeleteRegion] 	= useState(false);
    const [showWelcome, toggleShowWelcome] 	= useState(true);

    
    
    
    let history = useHistory();
    const regionNameViewer = props.RegionNameHere;
    const RouteViewerRegionID = "/viewer/" + props._id;
    useEffect(() => {        
      if (props.moveSubregionUpDown) {
 console.log(props.changeindex, props.index, props.changefield);
 console.log(editingName);
 console.log(editingCapital);
 console.log(editingLeader);

    if(props.changeindex === props.index){
        
        if(props.changefield == "Name"){
            toggleNameEdit(true);
        }
        else if(props.changefield == "Capital"){
            toggleCapitalEdit(true);
            
        }
        else if(props.changefield == "Leader"){
            toggleLeaderEdit(true);
        }
    }
          
        }
    }, [props.moveSubregionUpDown])

    

    const setShowDeleteRegion = () => {
		toggleShowDeleteRegion(!showDeleteRegion)
	}

  


    const leftRgihtArrow = (e) => {
        window.onkeydown = async (e) => {

            var keyCode = e.keyCode ? e.keyCode : e.which;
		  if(keyCode === 90 && e.ctrlKey){
			if(props.tps.hasTransactionToUndo()){
				props.undo();
                props.refetch();
			}
		  }
		  if(keyCode === 89 && e.ctrlKey){
			if(props.tps.hasTransactionToRedo()){                
				props.redo();
                props.refetch();
			}	
		  }		  


		  if(e.keyCode === 37){ //left key
            e.target.blur();
            props.moveSubregionUpDown("", props.index);
            if(editingCapital){
                toggleCapitalEdit(false);
                toggleNameEdit(true);
            }
			else if(editingLeader){
                toggleLeaderEdit(false);
                toggleCapitalEdit(true);
            }
            else if(editingName){
                toggleNameEdit(true);
            }
		  }
		  else if(e.keyCode === 39){ //right key
            e.target.blur();
            props.moveSubregionUpDown("", props.index);
            if(editingCapital){
                toggleCapitalEdit(false);
                toggleLeaderEdit(true);
            }
			else if(editingName){
                toggleNameEdit(false);
                toggleCapitalEdit(true);
            }				
            else if(editingLeader){
                toggleLeaderEdit(true);
            }
		  }
        }
    }
    leftRgihtArrow();
    const keydown = (e) => {        
          if(e.keyCode === 38 && (props.index !== 0)){ //up key
            console.log(editingCapital, props.index);
            if(editingCapital){
                e.target.blur();
                props.moveSubregionUpDown("Capital", props.index-1);
                console.log(props.index-1);
            }
			else if(editingName){
                e.target.blur();
                props.moveSubregionUpDown("Name", props.index-1);
            }		
            else if(editingLeader){
                e.target.blur();
                props.moveSubregionUpDown("Leader", props.index-1);
            }				
		  }
          else if(e.keyCode === 40 && (props.index !== props.subregions.length-1)){ //down key
            if(editingCapital){
                e.target.blur();
                props.moveSubregionUpDown("Capital", props.index+1);
            }
			else if(editingName){
                e.target.blur();
                props.moveSubregionUpDown("Name", props.index+1);
            }		
            else if(editingLeader){
                e.target.blur();
                props.moveSubregionUpDown("Leader", props.index+1);
            }			
		  }
		  
		 //}
	
	  }

    const handleLandmarkEdit = (e) => {
        toggleLandmarkEdit(false);
        // const newAssign = e.target.value ? e.target.value : 'No Assigned';
        // const prevAssign = assigned_to;
        // if(newAssign !== prevAssign){
        //     props.editItem(data._id, 'assigned_to', newAssign, prevAssign);
        // }
    };

    const handleCapitalEdit = (e) => {
        console.log(props.index);
        props.moveSubregionUpDown("", props.index);
         const newCapital = e.target.value ? e.target.value : 'No Capital';
         const prevCapital = capital;
         if(newCapital !== prevCapital){
             props.editItem(props._id, 'capital', newCapital, prevCapital);
         }
         toggleCapitalEdit(false);
    };

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        props.moveSubregionUpDown("", props.index);
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = name;
        if(newName !== prevName){
            props.editItem(props._id, 'name', newName, prevName);
        }
    
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        props.moveSubregionUpDown("", props.index);
        const newLeader = e.target.value ? e.target.value : 'No Leader';
        const prevLeader = leader;
        if(newLeader !== prevLeader){
            props.editItem(props._id, 'leader', newLeader, prevLeader);
        }

    };

    const changeRoute = async () => {
        props.setParentBranch([]);
        props.cleartransaction();
        history.push(RouteSubRegionID);
        
    }

    const changeRouteToLandmark = async () => {
        props.setParentBranch([]);
        props.cleartransaction();
        history.push({
            pathname : RouteViewerRegionID,
            state : {todo : todo,regionNameViewer : regionNameViewer}}
            );
        
    }

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        let imgName = name + " Flag.png";
        if(images[imgName]){
            return images[imgName];
        }
        return images["No Flag.png"];
      }
      
      const images = importAll(require.context('../imageSrc/The World', true, /\.(png|jpe?g|svg)$/));

    //keydown();
    return (
        <div>
        <WRow className='table-entry'>
            <WCol size = "1">
                <WButton  className = "regionDeleteButton buttonhover " >
                <i className = "material-icons " onClick = {setShowDeleteRegion}>
                    delete
                    </i>
                </WButton>
            </WCol>
            <WCol size="2" className = 'handleoverflow '>
            {
                    editingName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit} onKeyDown ={keydown}
                            autoFocus={true} defaultValue={name} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text-blue"
                        onClick={changeRoute } 
                        >{name}
                        </div>
                }                
            </WCol>

            <WCol size="2" className = 'handleoverflow '>
                {
                    editingCapital || capital === ''
                        ? <WInput
                            className='table-input' onBlur={handleCapitalEdit} onKeyDown ={keydown}
                            autoFocus={true} defaultValue={capital} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text"
                        onClick={() => toggleCapitalEdit(!editingCapital)}
                        >{capital}
                        </div>
                }
            </WCol>

            <WCol size="2" className = 'handleoverflow '>
            {
                    editingLeader || leader === ''
                        ? <WInput
                            className='table-input' onBlur={handleLeaderEdit} onKeyDown ={keydown}
                            autoFocus={true} defaultValue={leader} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text"
                        onClick={() => toggleLeaderEdit(!editingLeader)} >
                        {leader}
                    </div>
                }
            </WCol>
            <WCol size="2">
                {
                    <img className="table-text flagStyle" src = {images}></img>

                }
            </WCol>
            <WCol size="3" className = 'handleoverflow '>
                {
                    <div 
                    className="table-text-blue"
                    onClick={changeRouteToLandmark} 
                >{landmarkForSpreadsheet}
                </div>
                }
            </WCol>
        </WRow>
        {
            showDeleteRegion && (<DeleteRegion _id = {props._id} todo = {props.todo} setShowDeleteRegion={setShowDeleteRegion} DeleteRegionHere = {props.DeleteRegionHere} setShowDeleteRegion = {setShowDeleteRegion} />)
            }
            </div>
    );
};

export default RegionEntry;
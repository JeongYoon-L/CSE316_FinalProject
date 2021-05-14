import React, { useState , useEffect} 				from 'react';
import RegionEntry   from './RegionEntry';

const RegionContents = (props) => {
    // let field = "";
    // let changeindex = -1;
    // const [showWelcome, toggleShowWelcome] 	= useState(true);

    // const moveSubregionUpDown = (field, index) => {
    //     field = field;
    //     changeindex = index;
    //     alert(changeindex);
    //     return false;
    // }
    // useEffect(() => {
        
    //   if (!moveSubregionUpDown) {
    //     toggleShowWelcome(true);
    //     alert();
          
    //     }
    // }, [moveSubregionUpDown])
    return (
        <>
            {
                props.subregions &&
                props.subregions.map((todo , index)=> (
                    <RegionEntry togglecheckIndex={props.togglecheckIndex} togglecheckField={props.togglecheckField}
                    index = {index} moveSubregionUpDown={props.moveSubregionUpDown} changefield={props.changefield} changeindex= {props.changeindex}
                    subregions = {props.subregions} todo = {todo}  setParentBranch = {props.setParentBranch } cleartransaction= {props.cleartransaction}
                    id={todo.id} key={todo.id} name={todo.name} _id={todo._id} DeleteRegionHere = {props.DeleteRegionHere}
                    RegionNameHere = {props.RegionNameHere} editItem= {props.editItem}
                        
                    />
                ))
            }
        </>
        
    );
};

export default RegionContents;
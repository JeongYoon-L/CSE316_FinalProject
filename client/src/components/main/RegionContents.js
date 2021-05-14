import React        from 'react';
import RegionEntry   from './RegionEntry';

const RegionContents = (props) => {
    return (
        <>
            {
                props.subregions &&
                props.subregions.map(todo => (
                    <RegionEntry
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
import React        from 'react';
import RegionEntry   from './RegionEntry';

const RegionContents = (props) => {
    return (
        <>
            {
                props.subregions &&
                props.subregions.map(todo => (
                    <RegionEntry
                        todo = {todo}    
                    id={todo.id} key={todo.id} name={todo.name} _id={todo._id}
                        
                    />
                ))
            }
        </>
        
    );
};

export default RegionContents;
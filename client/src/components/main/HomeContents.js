import React        from 'react';
import HomeEntry   from './HomeEntry';

const HomeContents = (props) => {
    return (
        <>
            {
                props.todolists &&
                props.todolists.map(todo => (
                    <HomeEntry
                        id={todo.id} key={todo.id} name={todo.name} _id={todo._id} DeleteMapHere = {props.DeleteMapHere}
                        updateMapName = {props.updateMapName} 
                        
                    />
                ))
            }
        </>
        
    );
};

export default HomeContents;
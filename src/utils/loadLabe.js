import React from 'react';
import Loadable from 'react-loadable';

//通用的过场组件
const loadingComponent =()=>{
    return (
        <div>loading</div>
    ) 
}


export default Loadable({
    loader:import('./index.js'),
    loading:loadingComponent
});
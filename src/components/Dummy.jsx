import React from 'react'
import DummyData from './DummyData'

function Dummy(){
    return fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    ).then((response) => response.json())
    .then((data) => data.map(obj => 
        <DummyData name={obj.name} price={obj.price} image={obj.image} type={obj.type} />
        )
    ).catch(err => {
        console.log("Error has occurred: ", err);
        return null
    })
}

export default Dummy
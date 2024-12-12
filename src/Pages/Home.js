import React, { useState } from 'react'
import Slider from '../Components/Slider'
import Items from '../Components/Items'
import Dashboard from '../Components/Dashboard'
import { useSelector } from 'react-redux'

export default function Home() {
    //const cart=useSelector(state=>state);
    //console.log(cart);
    const [category,setCategory]=useState('all');
  return (
    <div >
        <Dashboard/>
        <Slider setActiveCategory={setCategory} activecategory={category}/>
       <Items category={category}/>
    </div>
  )
}

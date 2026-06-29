import React from 'react'
import {useState, useEffect} from 'react'
import '../App.css'

import SlimeCard from '../components/SlimeCard.jsx'
import './ViewSlimes.css'

const ViewSlimes = () => {
    const [slimes, setSlimes] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false)
    
    useEffect(()=>{
        const loadSlimes = async () => {
            const response = await fetch('/api/slimes')
            if (response.ok){
                const data = await response.json();
                setSlimes(data)
            }
            setPageLoaded(true)
        }
        loadSlimes();
    },[])

    if (!pageLoaded)
        return (<h3>Loading slimes...</h3>)

    if (slimes.length == 0){
        return (<h3>No slimes!</h3>)
    }

    return (
        <div className='card-container'>
            {slimes.map((el)=>
                <SlimeCard data={el} key={el.id}/>
            )}
        </div>
    )
}

export default ViewSlimes
import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h2>LoveSlime</h2></li>
            </ul>

            <ul>
                <li><Link to='/create' role='button'>Customize slime</Link></li>
                <li><Link to='/slimes' role='button'>View Slimes</Link></li>
            </ul>
            
        </nav>
    )
}

export default Navigation
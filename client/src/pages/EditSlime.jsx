import { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router'
import {deleteSlime, updateSlime} from '/src/utils.js'

import EditForm from '../components/EditForm'
import '../App.css'

const DEFAULT_SLIME = {
    texture: "jelly", 
    scent: "none", 
    slime_size: 'M',
    colors: ['white/clear'], 
    micas: ['none'], 
    toppings: ['none'], 
    glitters: ['none']
}

const EditSlime = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [slime, setSlime] = useState({});
    const [pageLoaded, setPageLoaded] = useState(false)
    const [selected, setSelected] = useState(DEFAULT_SLIME);

    useEffect(()=>{

        const loadSlime = async () => {
            const response = await fetch(`/api/slimes/${id}`)
            if (response.ok){
                const data = await response.json();
                console.log(data)
                
                const newSelected = {
                    texture: data.texture.name, 
                    scent: data.scent, 
                    slime_size: data.slime_size.name,
                    colors: data.colors.map(el=> el.name), 
                    micas: data.micas.map(el=> el.name), 
                    toppings: data.toppings.map(el=> el.name), 
                    glitters: data.glitters.map(el=> el.name)
                }
                console.log(newSelected)
                
                setSlime(data)
                setSelected(newSelected)
                
            }
            setPageLoaded(true)
        }

        loadSlime();
    },[])

    if (!pageLoaded)
        return (<h3>Loading slime...</h3>)

    if (!slime)
        return (<h3>Slime not found!</h3>)

    const buttons = (
        <div className='form-buttons'>
            <button onClick={() => {
                updateSlime(id, selected);
                navigate(`/slimes/${id}`);
            }}>Save</button>
            <button onClick={() => {
                deleteSlime(id);
                navigate('/slimes');
            }}>Delete</button>
        </div>
    )

    return (
        <EditForm 
            selected={selected}
            setSelected={setSelected}
            buttons={buttons}
        />
    )
}

export default EditSlime
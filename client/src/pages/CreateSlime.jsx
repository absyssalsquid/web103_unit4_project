import { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router'
import EditForm from '../components/EditForm'
import '../App.css'
import {createSlime} from '/src/utils.js'

const DEFAULT_SLIME = {
    texture: "jelly", 
    scent: "none", 
    slime_size: 'M',
    colors: ['white/clear'], 
    micas: ['none'], 
    toppings: ['none'], 
    glitters: ['none']
}

const CreateSlime = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(DEFAULT_SLIME);

    const buttons = (
        <div className='form-buttons'>
            <button onClick={async () => {
                const id = await createSlime(selected); 
                if (id) navigate(`/slimes/${id}`);
            }}>Submit</button>
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

export default CreateSlime
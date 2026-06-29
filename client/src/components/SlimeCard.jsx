import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

import './SlimeCard.css'
import ColorTag from '../components/ColorTag'
import ImageTile from '../components/ImageTile'

import {deleteSlime} from '/src/utils.js'

const SlimeCard = ({data}) => {
    const navigate = useNavigate();
    
    return (
        <div className='SlimeCard' >
            <table>
                <tbody>
                    <tr>
                        <td>Texture</td>
                        <td>
                            <img className='texture' src={data.texture.image} alt={data.texture.name} />
                        </td>
                    </tr>
                    <tr>
                        <td>Colors</td>
                        <td>
                            { 
                                data.colors.map((el)=> (<ColorTag name={el.name} hex={el.hex}/>)) 
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Mica</td>
                        <td>
                            {(
                                data.micas[0].name == 'none') ? "None" :
                                data.micas.map((el)=> (<ColorTag name={el.name} hex={el.hex}/>)
                            )}
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Toppings</td>
                        <td>
                            { (data.toppings[0].name == 'none') ? "None" :
                            data.toppings.map((el)=><ImageTile key={el.image} src={el.image}/>)}
                        </td>
                    </tr>

                    <tr>
                        <td>Glitter</td>
                        <td>
                            { (data.glitters[0].name == 'none') ? "None" :
                            data.glitters.map((el)=><ImageTile key={el.image} src={el.image}/>)}
                        </td>
                    </tr>
                    <tr>
                        <td>Size</td>
                        <td>
                            {data.slime_size.name}
                        </td>
                    </tr>
                    <tr>
                        <td>Scent</td>
                        <td>{data.scent}</td>
                    </tr>
                </tbody>
            </table>

            <div className='buttons'>
                <Link to={`/slimes/${data.id}`} role='button'>Details</Link>        
                <Link to={`/edit/${data.id}`} role='button'>Edit</Link>
                <button onClick={async () => {
                    await deleteSlime(data.id);
                    navigate(0);
                }}>Delete</button>
            </div>
                  
        </div>
    )
}

export default SlimeCard
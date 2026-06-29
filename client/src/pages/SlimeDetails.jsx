import { useState, useEffect } from 'react'
import {useParams} from 'react-router'
import {Link} from 'react-router-dom'

import ColorTag from '../components/ColorTag'
import ImageTile from '../components/ImageTile'

import '../App.css'
import './SlimeDetails.css'


const SlimeDetails = () => {
    const {id} = useParams();

    const [slime, setSlime] = useState({});
    const [pageLoaded, setPageLoaded] = useState(false)
    
    useEffect(()=>{
        const loadSlime = async () => {
            const response = await fetch(`/api/slimes/${id}`)
            if (response.ok){
                const data = await response.json();
                setSlime(data)
            }
            setPageLoaded(true)
        }
        loadSlime();
    },[])

    if (!pageLoaded)
        return (<h3>Loading slime...</h3>)

    if (!slime)
        return (<h3>Slime not found!</h3>)

    // calculate total price
    let total = 0;
    total += slime.texture.price;
    total += slime.toppings.reduce((acc, item) => acc + item.price, 0)
    total += slime.glitters.reduce((acc, item) => acc + item.price, 0)
    total += slime.micas.reduce((acc, item) => acc + item.price, 0)
    total *= slime.slime_size.price_mult;

    return (
        <div className='SlimeDetails'>
            <table>
                <tbody>
                    <tr>
                        <td className='col1'>Texture</td>
                        <td>
                            <div className='img-tile'>
                                <img className='texture' src={slime.texture.image} alt={slime.texture.name} /><br/>
                                <div className='caption'>{`${slime.texture.name} ($${slime.texture.price.toFixed(2)})`}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='col1'>Colors</td>
                        <td>{ slime.colors.map((el)=> (<ColorTag name={el.name} hex={el.hex}/>)) }</td>
                    </tr>
                    <tr>
                        <td className='col1'>Mica</td>
                        <td>
                            {(
                                slime.micas[0].name == 'none') ? "None" :
                                slime.micas.map((el)=> (<ColorTag name={`${el.name} (+$${el.price.toFixed(2)})`} hex={el.hex}/>)
                            )}
                        </td>
                    </tr>
                    
                    <tr>
                        <td className='col1'>Toppings</td>
                        <td>{
                            (slime.toppings[0].name == 'none') ? "None" :
                            slime.toppings.map((el)=>(
                                <ImageTile src={el.image} caption={`${el.name} (+$${el.price.toFixed(2)})`}/>
                            ))}
                        </td>
                    </tr>

                    <tr>
                        <td className='col1'>Glitter</td>
                        <td>{
                            (slime.glitters[0].name == 'none') ? "None" :
                            slime.glitters.map((el)=>(
                                <ImageTile src={el.image} caption={`${el.name} (+$${el.price.toFixed(2)})`}/>
                            ))}
                        </td>
                    </tr>
                    <tr>
                        <td className='col1'>Scent</td>
                        <td>{slime.scent}</td>
                    </tr>
                    <tr>
                        <td className='col1'>Size</td>
                        <td>
                            {slime.slime_size.name} - {slime.slime_size.qty}
                        </td>
                    </tr>
                    <tr>
                        <td className='col1'>Total</td>
                        <td>{'$' + total.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            
            <Link to={`/edit/${slime.id}`} role='button'>Edit</Link>           
            
        </div>
    )
}

export default SlimeDetails
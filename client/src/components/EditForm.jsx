import { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router'
import ColorTag from './ColorTag'
import ImageTile from './ImageTile'
import './EditForm.css'
import '../App.css'

const EditForm = ({selected, setSelected, buttons}) => {
    const [pageLoaded, setPageLoaded] = useState(false)

    const [textureOptions, setTextureOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [micaOptions, setMicaOptions] = useState([]);
    const [toppingOptions, setToppingOptions] = useState([]);
    const [glitterOptions, setGlitterOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [scentOptions, setScentOptions] = useState([]);

    const [selectedTexture, setSelectedTexture] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
        const loadPage = async () => {
            try {
                const mapping = {
                    'textures': setTextureOptions,
                    'colors': setColorOptions,
                    'micas': setMicaOptions,
                    'toppings': setToppingOptions,
                    'glitters': setGlitterOptions,
                    'sizes': setSizeOptions,
                    'scents': setScentOptions
                };

                // Load all options in parallel instead of sequentially
                await Promise.all(
                    Object.entries(mapping).map(async ([opt, setFn]) => {
                        const response = await fetch(`/api/options/${opt}`);
                        if (response.ok) {
                            const data = await response.json();
                            setFn(data);
                        } else {
                            throw new Error(`Failed to load ${opt}`);
                        }
                    })
                );

                setPageLoaded(true);
            } catch (error) {
                console.error('Error loading options:', error);
                setPageLoaded(true); // or handle differently based on your needs
            }
        };

        loadPage();
    }, []);

    useEffect(()=>{
        if (!pageLoaded) return;
        console.log(textureOptions)
        setSelectedTexture(textureOptions.filter(item => item.name == selected.texture)[0])
    },[pageLoaded])

    const calculatePrice = () => {
        let total = parseFloat(selectedTexture.price);
        total += toppingOptions.filter(item => selected.toppings.includes(item.name)).reduce((acc, item) => acc + parseFloat(item.price), 0)
        total += glitterOptions.filter(item => selected.glitters.includes(item.name)).reduce((acc, item) => acc + parseFloat(item.price), 0)
        total += micaOptions.filter(item => selected.micas.includes(item.name)).reduce((acc, item) => acc + parseFloat(item.price), 0)
        
        const selectedSize = sizeOptions.filter(item => item.name == selected.slime_size)[0]
        total *= parseFloat(selectedSize.price_mult);

        setTotalPrice(total)
    }

    useEffect(()=>{
        if (! selectedTexture.price) return;
        calculatePrice();
    }, [selectedTexture, selected])

    if (!pageLoaded || !selectedTexture )
        return (<h3>Loading form...</h3>)

    const updateTexture = (e) =>{
        setSelected(prev=>({...prev, texture: e.target.value}))
        const newSelectedTexture = textureOptions.filter(item => item.name == e.target.value)[0];
        setSelectedTexture(newSelectedTexture)
    }

    const handleCheckboxChange = (field, e) => {
        const { value, checked } = event.target;

        var selectedItems = selected[field];
        selectedItems = checked
            ? [...selectedItems, value]
            : selectedItems.filter((item) => item !== value)

        // if last item is none set to none
        selectedItems = (selectedItems.at(-1) == 'none')
            ? ['none']
            : selectedItems.filter((item) => item !== 'none')

        setSelected((prev) => ({...prev, [field]: selectedItems}));
    };

    return (
        <div className='SlimeDetails'>
            <table>
                <tbody>
                    <tr>
                        <td className='col1'>Texture</td>
                        <td>
                            <img className='texture' src={selectedTexture.image} alt={selectedTexture.name} /><br/>
                           
                            <select value={selected.texture} onChange={updateTexture}>
                                {
                                    textureOptions.map((el)=>
                                        <option key={el.name} value={el.name}>{`${el.name} - ($${parseFloat(el.price).toFixed(2)})`}</option>
                                    )
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className='col1'>Colors</td>
                        <td>
                            { colorOptions.map((el)=> {
                                const elID = 'color_' + el.name;
                                return (
                                    <>
                                        <input type="checkbox" 
                                            id={elID} value={el.name}
                                            checked={selected.colors.includes(el.name)}
                                            onChange={(e) => handleCheckboxChange('colors', e)}
                                        />
                                        <label htmlFor={elID}>
                                            <ColorTag name={el.name} hex={el.hex}/>
                                        </label>
                                    </>
                                )
                            }) }
                        </td>
                    </tr>
                    <tr>
                        <td className='col1'>Mica</td>
                        <td>
                            { micaOptions.map((el)=> {
                                const elID = 'mica_' + el.name;
                                return (
                                    <>
                                        <input type="checkbox" 
                                            id={elID} 
                                            value={el.name} 
                                            checked={selected.micas.includes(el.name)} 
                                            onChange={(e) => handleCheckboxChange('micas', e)}
                                        />
                                        <label htmlFor={elID}>
                                            <ColorTag name={el.name} hex={el.hex}/>
                                        </label>
                                    </>
                                )
                            }) }
                        </td>
                    </tr>
                    
                    <tr>
                        <td className='col1'>Toppings</td>
                        <td>
                            { toppingOptions.map((el)=> {
                                const elID = 'topping_' + el.name;
                                return (
                                    <>
                                        <input type="checkbox" 
                                            id={elID} 
                                            value={el.name} 
                                            checked={selected.toppings.includes(el.name)} 
                                            onChange={(e) => handleCheckboxChange('toppings', e)}
                                        />
                                        <label htmlFor={elID}>
                                            <ImageTile src={el.image} caption={`${el.name} (+$${parseFloat(el.price).toFixed(2)})`}/>
                                        </label>
                                    </>
                                )
                            }) }
                        </td>
                    </tr>

                    <tr>
                        <td className='col1'>Glitter</td>
                        <td>
                            { glitterOptions.map((el)=> {
                                const elID = 'glitter_' + el.name;
                                return (
                                    <>
                                        <input type="checkbox" 
                                            id={elID} 
                                            value={el.name} 
                                            checked={selected.glitters.includes(el.name)} 
                                            onChange={(e) => handleCheckboxChange('glitters', e)}
                                        />
                                        <label htmlFor={elID}>
                                            <ImageTile src={el.image} caption={`${el.name}`}/>
                                        </label>
                                    </>
                                )
                            }) }
                        </td>
                    </tr>
                    <tr>
                        <td className='col1'>Scent</td>
                        <td>
                            <select value={selected.scent} onChange={(e) => {setSelected(prev=>({...prev, scent: e.target.value}))}}>
                                {
                                    scentOptions.map((el)=>
                                        <option key={el.name} value={el.name}>{el.name}</option>
                                    )
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className='col1'>Size</td>
                        <td>
                            <select value={selected.slime_size} onChange={(e) => {setSelected(prev=>({...prev, slime_size: e.target.value}))}}>
                                {
                                    sizeOptions.map((el)=>
                                        <option key={el.name} value={el.name}>{`${el.name} - ${el.qty}`}</option>
                                    )
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className='col1'>Total</td>
                        <td>{'$' + totalPrice.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            {buttons}
        </div>
    )
}

export default EditForm
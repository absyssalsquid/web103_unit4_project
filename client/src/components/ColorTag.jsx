import './ColorTag.css'

const ColorTag = ({name, hex}) => {
    return(
        <div className='ColorTag'>
            <div className='color-block' style={{backgroundColor: hex}}/> 
            {name} 
        </div>
    )
}

export default ColorTag;


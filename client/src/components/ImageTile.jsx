import './ImageTile.css'

const ImageTile = ({src, caption}) => {
    return(
        <div className='ImageTile'>
            <div className='img-container'>
                <img src={src} />
            </div>

            <div className='caption'>{caption}</div>
        </div>
    )
}

export default ImageTile;


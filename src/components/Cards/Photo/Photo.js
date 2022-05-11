import './photo.css'
const Photo = ({ photo,width }) => {

    return (
        <img className = 'img-photo'style={{width:`${width}`,height : `${width}`}} src={photo.imageUrl}></img>
    )
}
export default Photo;
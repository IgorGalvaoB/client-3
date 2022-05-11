import Photo from '../Cards/Photo/Photo';
import './photos.css'
const Photos = ({ photos }) => {

    return(
        <div className="ct-photos">
            {photos.map(photo => { 
                return <Photo photo={photo} width='142px' key={photo._id}></Photo>
            })}
        </div>
    )


}
export default Photos;
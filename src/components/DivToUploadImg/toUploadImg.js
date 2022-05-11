import UploaderImg from "../UploaderImg/UploaderImg";
import './toUploadImg.css';


const ToUploadImg = ({ id, x, y,set,type }) => {
   
    return (
        <div className="container-div">
            <div>
                <p onClick={()=>set(null)}>X</p>
            </div>
            <UploaderImg id={id} x={x} y={y} set={set} type = {type}></UploaderImg>
        </div>
    )
}
export default ToUploadImg;
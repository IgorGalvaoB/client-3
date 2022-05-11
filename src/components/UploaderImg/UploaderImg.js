import React from "react";
import "./UploaderImg.css";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import { uploader } from "./UploaderImgFunctions";
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles'

const ThemeSlider = createTheme({
  overrides:{
    MuiSlider: {
      thumb:{
      color: "rgb(36, 36, 36)",
      },
      track: {
        color: 'rgb(237,239,241)'
      },
      rail: {
        color: 'rgb(24,25,26)'
      }
    }
}
});
const UploaderImg= ({id,x,y,set,type})=>{
	const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

	const upload = async  () => {
		
		await uploader(image, croppedArea,id,type);
		
		set(null);
	};
	
	return (
		<div className='container'>
			<div className='container-cropper'>
				
						<div className='cropper'>
							<Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={x/y}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>
						{image ? (
						<>
						<div className='slider'>
                            <ThemeProvider theme={ThemeSlider}>
                                <Slider
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(e.target.value)}
                                />
                            </ThemeProvider>
						</div>
					</>
				) : null}
			</div>

			<div className='container-buttons'>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>
				<button
					variant='contained'
					color='primary'
					onClick={triggerFileSelectPopup}
					className='btn-load'
				>
					Carregar
				</button>
				<button className="btn-load" type= 'button' onClick={()=> upload()}>
					Salvar
				</button>
			</div>
		</div>
	);
}
export default UploaderImg;
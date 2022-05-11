import ApiHandler from '../../utils/api.utils';

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

const getRadianAngle=(degreeValue) =>{
    return (degreeValue * Math.PI) / 180;
}

const getCroppedImg= async (imageSrc, pixelCrop, rotation = 0) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;


    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);


    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
        data,
        0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
        0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    );


    return canvas;

}

export const uploader = async (imageSrc, crop,id ,type) => {
	if (!crop || !imageSrc) {
        
        
		return;
	}
    
	const canvas = await getCroppedImg(imageSrc, crop);

	canvas.toBlob(
		async (file) => {
            console.log(type)
            if(type === 'profile')await ApiHandler.updateProfileImage(id, file)
            else if(type === 'cover')await ApiHandler.updateCoverImage(id, file)
        },
		"png",
		0.66
        );
    };
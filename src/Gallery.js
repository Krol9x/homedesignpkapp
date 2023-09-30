import React,{useState} from 'react';
import './css/gallery.css';
import CloseIcon from '@mui/icons-material/Close';

const Gallery = () => {
    let data = [
        {
            id: 1,
            imgSrc: 'https://drive.google.com/uc?id=1UaKdKxMJ51wuUkWrxg2spypfNb08R-YA&export=download'
        },
        {
            id: 2,
            imgSrc: 'https://drive.google.com/uc?id=1I0AHrYXQskG1to-W7m9bm6zTyFkYz5PI&export=download'
        },
        {
            id: 3,
            imgSrc: 'https://drive.google.com/uc?id=1EbDADtfaUVmKr88y8kWAuVMA1RATJBXf&export=download'
        },
        {
            id: 4,
            imgSrc: 'https://drive.google.com/uc?id=1p2Erv8rXXt6-FEaw_wJeiqAnBMHYAaqf&export=download'
        },

    ]

    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState('');

    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
    }
    return (
        <>
            <div className={model? "model open" : "model"}>
                <img src={tempimgSrc} />
                <CloseIcon onClick={()=> setModel(false)} />
            </div>
            <div className="gallery">
                {data.map((item, index) => {
                    return (
                        <div className="pics" key={index} onClick={() => getImg(item.imgSrc)}>
                            <img src={item.imgSrc} style={{ width: '100%' }} />
                        </div>
                    )
                })}
            </div>
        </>
     )
}
export default Gallery;
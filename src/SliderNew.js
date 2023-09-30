import {useState} from 'react'
import './css/newslider.css';


function SliderNew() {

    const slides = [
        "https://picsum.photos/id/1032/900/400",
        'https://scontent.flcj1-1.fna.fbcdn.net/v/t39.30808-6/292109840_138591552132504_4642562071120157582_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=0debeb&_nc_ohc=sOzF3U9AEhIAX-0jw46&_nc_ht=scontent.flcj1-1.fna&oh=00_AfCu1cKAAyqoi6Ujod99vGEmI-J5rbackTtO9iLbqm-u-A&oe=63A409C9',
        'https://scontent.flcj1-1.fna.fbcdn.net/v/t39.30808-6/285190499_130103056314687_3688742502226914788_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=0debeb&_nc_ohc=X8tYOUc6D_QAX9insVl&_nc_ht=scontent.flcj1-1.fna&oh=00_AfBgHNOeDv1YaLgzxVYL1wqRaT_a-OF5p4B_SxB6Sdl8lA&oe=63A523C7',
    ]


    return(

            <div className="carousel">
                <div className="carousel-inner">
                        {slides.map((slide, index) =>(
                            <div className="carousel-item">
                                    <img src={slide} />
                                
                            </div>
                        ))}
                </div>
            </div>


    )
}

export default SliderNew;
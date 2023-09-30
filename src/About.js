import React,{Fragment,useState} from 'react'
import './css/about.css';

const About = () => {
  const [ toggleTab, setToggleTab] = useState(1)
  const toggleState = (index) =>{
    setToggleTab(index)
  }







  return (
    <Fragment>

    <section className="about">

    <div className="row">

    <div className="column">
      <div className="about-img"></div>
    </div>

    <div className="column">

    <div className="tabs">

    <div className={toggleTab === 1 ? "single-tab active-tab": "single-tab"}
    onClick = {() => toggleState(1)}
    >
      <h2>O mnie</h2>
    </div>


    <div className={toggleTab === 2 ? "single-tab active-tab": "single-tab"}
    onClick = {() => toggleState(2)}
    >
      <h2>Doświadczenie</h2>
    </div>
      
    </div>

    <div className="tab-content">

    {/* About Content */}

    <div className={toggleTab === 1 ?"content active-content":"content"}>
      <h2>Moja Historia</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <h2>Architektura Wnętrz</h2>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, quae accusantium totam mollitia facilis debitis porro sunt repellat eveniet dignissimos.</p>
    </div>




       {/* Experience Content */}

    <div className={toggleTab === 2 ?"content active-content":"content"}>

    <div className="exp-column">
      <h2>Rysunek</h2>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim error rem dicta perferendis et qui obcaecati labore accusantium cupiditate libero.</p>
    </div>

    <div className="exp-column">
      <h2>Studia Architektóra Wnętrz</h2>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim error rem dicta perferendis et qui obcaecati labore accusantium cupiditate libero.</p>
    </div>

    <div className="exp-column">
      <h2>Designer Wnętrz</h2>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim error rem dicta perferendis et qui obcaecati labore accusantium cupiditate libero.</p>
    </div>
    
    </div>
        
    </div>

    </div>

    </div>

    </section>
    
    </Fragment>
  )
}

export default About
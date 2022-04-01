// const {ReactDraggable: Draggable, React, ReactDOM} = window;
import React, {useRef} from 'react';
import Draggable, {DraggableCore, ReactDraggable} from 'react-draggable';
import html2canvas from 'html2canvas';
import './../Workplace/css/Workplace.css';


// import Design_1 from './../Workplace/Design_1.js'
import Design_2 from '../Workplace/Design_2.js';
import Design_3 from '../Workplace/Design_3.js';
import Design_4 from '../Workplace/Design_4.js';
import Design_5 from '../Workplace/Design_5.js';
// import Design_6 from '../Workplace/Design_6.js';
import Design_7 from '../Workplace/Design_7.js';
import Design_8 from '../Workplace/Design_8.js';
import Design_9 from '../Workplace/Design_9.js';
// import Design_10 from '../Workplace/Design_10.js';
import Design_11 from '../Workplace/Design_11.js';
import Design_12 from '../Workplace/Design_12.js';

import Design_2_svg from './../../../src/images/svgs/final/Design_2.svg';
import Design_3_svg from './../../../src/images/svgs/final/Design_3.svg';
import Design_4_svg from './../../../src/images/svgs/final/Design_4.svg';
import Design_5_svg from './../../../src/images/svgs/final/Design_5.svg';
// import Design_6_svg from './../../../src/images/svgs/final/Design_6.svg';
import Design_7_svg from './../../../src/images/svgs/final/Design_7.svg';
import Design_8_svg from './../../../src/images/svgs/final/Design_8.svg';
import { Link } from 'react-router-dom';
// import Design_9_svg from './../../../src/images/svgs/final/Design_9.svg';
// import Design_10_svg from './../../../src/images/svgs/final/Design_10.svg';
// import Design_11_svg from './../../../src/images/svgs/final/Design_11.svg';
// import Design_12_svg from './../../../src/images/svgs/final/Design_12.svg';

class WorkPlace extends React.Component {

  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    },
    selectedCake: 'Design_2',
    cakesArray: [
      {name:'Design_2', img:Design_2_svg},
      {name:'Design_3', img:Design_3_svg},
      {name:'Design_4', img:Design_4_svg},
      {name:'Design_5', img:Design_5_svg},
      {name:'Design_7', img:Design_7_svg},
      {name:'Design_8', img:Design_8_svg},
      {name:'Design_8', img:Design_8_svg},
      {name:'Design_8', img:Design_8_svg},
      // {name:'Design_9', img:Design_9_svg},
      // {name:'Design_11', img:Design_11_svg},
      // {name:'Design_12', img:Design_12_svg}
    ],
    confirm: false
  };
  
  type = localStorage.getItem('type')
  userId = localStorage.getItem('userId')

  handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
  };

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
  };
  onDrop = (e) => {
    this.setState({activeDrags: --this.state.activeDrags});
    if (e.target.classList.contains("drop-target")) {
      alert("Dropped!");
      e.target.classList.remove('hovered');
    }
  };
  onDropAreaMouseEnter = (e) => {
    if (this.state.activeDrags) {
      e.target.classList.add('hovered');
    }
  }
  onDropAreaMouseLeave = (e) => {
    e.target.classList.remove('hovered');
  }

  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  };

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };
// ................................
  setConfirm = (val) =>{
    this.setState({
      confirm: val
    })
  }

  downloadImage = async(e) => {

    if (this.state.confirm == true) {
        const element = document.getElementById('wp-design-edit'),
        canvas = await html2canvas(element),
        data = canvas.toDataURL('image/jpg'),
        link = document.createElement('a');
        
        link.href = data;
        link.download = 'downloaded-image.jpg';
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.setState({
          confirm: false
        })
        
      }else{
        alert('Please confirm your design before download it.')
      }
    // e.target.style.display ="none"
  }
    userOnClick = () => {
        alert("You should have an account to make order")
        // navigate('/login')

    }

  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;
    return (
      <div className='workplace-wrapper'>
          <h1 className="text-center common-header" style={{zIndex:"3"}}>Cake WorkPlace</h1>
        <div className="row" style={{overflow:"hidden"}} width="100vw" >
         
          <div className='col-lg-4 col-3' >
              <div className='row container justify-content-center' style={{overflowY:"scroll", height:"100vh", overflowX:"hidden"}}>
                {
                this.state.cakesArray.map((item) => {
                  return(
                    <div className='col-12 col-lg-4 wp-cakelist-wrapper'>
                        <img src={item.img} className="wp-cakelist-img" onClick={(e) => {this.setState({selectedCake: item.name})}}/>
                    </div>
                  )
                })
              }
              </div>
          </div>
          
          <div className='col-lg-6 col-9 wp-design-edit-wrapper' >
            <Draggable  bounds={{top: 0, left: -75, right: 150, bottom: 150}}  {...dragHandlers} >
              <div className="box" id="wp-design-edit">                  
                    {
                      this.state.selectedCake == 'Design_2' ?
                      <Design_2 setConfirm={this.setConfirm} /> : <></>
                    }
                    {
                      this.state.selectedCake == 'Design_3' ?
                      <Design_3 setConfirm={this.setConfirm}/> : <></>
                    }
                    {
                      this.state.selectedCake == 'Design_4' ?
                      <Design_4 setConfirm={this.setConfirm}/> : <></>
                    }
                    {
                      this.state.selectedCake == 'Design_5' ?
                      <Design_5  setConfirm={this.setConfirm}/> : <></>
                    }
                    {
                      this.state.selectedCake == 'Design_7' ?
                      <Design_7  setConfirm={this.setConfirm}/> : <></>
                    }
                    {
                      this.state.selectedCake == 'Design_8' ?
                      <Design_8  setConfirm={this.setConfirm}/> : <></>
                    }
                    {
                      this.state.selectedCake == 'Design_9' ?
                      <Design_9  setConfirm={this.setConfirm}/> : <></>
                    }
                    {
                      this.state.selectedCake == 'Design_11' ?
                      <Design_11 setConfirm={this.setConfirm} /> : <></>
                    }
                    {
                      this.state.selectedCake == 'Design_12' ?
                      <Design_12 setConfirm={this.setConfirm} /> : <></>
                    }
              </div>
            </Draggable>
          </div>
          <div className='col-md-2 text-center wp-export-wrapper' > 
            <button className='btn wp-export-btn' onClick={this.downloadImage}> <span className='p-2'><i class="fas fa-download pl-2"></i></span></button>
            
            {
              this.type == 'customer' || this.type == 'cakemaker' ? <Link to={`/orders/indirect/${this.userId}`}><button className='btn wp-order-btn'> <span className='p-2'>Order</span></button></Link> : <button onClick={this.userOnClick} className='btn wp-order-btn'> <span className='p-2'>Order</span></button>
            }
          </div>          
        </div>
      </div>
    );
  }
}
export default WorkPlace;

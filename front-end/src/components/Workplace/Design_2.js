import React, { useState, useRef } from "react";
import './css/workplaceD2.css';

const Design_2 = ({setConfirm}) => {

    var [d1, setd1] = useState('#f4978e')
    var [d2, setd2] = useState('#f27288')
    var [d3, setd3] = useState('#f9c5af')
    var [d4, setd4] = useState('#ffdede')
    var [d5, setd5] = useState('#fcdfc8')


    return(
        <div className="row container justify-content-center design-container">

            <div className="col-2" id="design-2-input">
                <input value={d1} type="color" className="col-8" onChange={(e) => {setd1(e.target.value)}}/>
                <input value={d2} type="color" className="col-8" onChange={(e) => {setd2(e.target.value)}}/>
                <input value={d3} type="color" className="col-8" onChange={(e) => {setd3(e.target.value)}}/>
                <input value={d4} type="color" className="col-8" onChange={(e) => {setd4(e.target.value)}}/>
                <input value={d5} type="color" className="col-8" onChange={(e) => {setd5(e.target.value)}}/>
            </div>
            <div className="col-10" >
                {/* <ComponentToPrint ref={designRef} /> */}
                  {/* <button className='btn btn-primary' onClick={() => exportComponentAsJPEG(designRef)}><i class="fas fa-download"></i></button> */}

                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 161.15 216.38">
           
                
                <g class="cls-1"><g id="Layer_2" data-name="Layer 2">
                <g id="Objects">
                <ellipse class="cls-2" cx="80.58" cy="198.3" rx="80.58" ry="18.07"/>

                <path class="cls-2" d="M161.15,193.22v6H0v-6Z"/>
                
                <ellipse class="cls-3" cx="80.58" cy="193.22" rx="80.58" ry="18.07"/>
                
                <ellipse class="cls-2" cx="80.83" cy="190.94" rx="70.24" ry="15.75"/>
                
                <path class="cls-2" d="M151.07,188.25v2.69H10.58v-2.69Z"/>
                
                <ellipse class="cls-3" cx="80.83" cy="188.25" rx="70.24" ry="15.75"/>
                
                <path class="cls-4" style={{fill:d1}} d="M143.66,125.81v60.26a2.8,2.8,0,0,1-.15.91c-2.26,6.83-29.74,12.22-63.3,12.22s-61-5.39-63.31-12.22a2.64,2.64,0,0,1-.13-.68V125.81Z"/>
                
                <path class="cls-5" d="M49.7,197.22c15-2.36,40.65-16.4,41.16-49.8a44.44,44.44,0,0,0-5.68-21.61H16.77V186.3a2.64,2.64,0,0,0,.13.68c1.5,4.51,14,8.39,31.93,10.5A6.68,6.68,0,0,1,49.7,197.22Z"/>
                
                <path class="cls-6" style={{fill:d1}} d="M121.94,125.81c4.37,4.72,6.36,11.21,6.71,17.73a49.81,49.81,0,0,1-4.38,22.85c-3.51,7.75-9.7,14.11-16.63,18.92-9.89,6.86-21.28,10.79-32.92,13.84,1.81,0,3.64,0,5.49,0,33.56,0,61-5.39,63.3-12.22a2.8,2.8,0,0,0,.15-.91V125.81Z"/>
                
                <path class="cls-7" d="M144.12,125v5.83c0,7.21-28.52,13.1-63.64,13.1-34.41,0-62.4-5.65-63.52-12.67h-.19v-5.45l5.08,0L137.56,125Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M143.66,174v12.11a2.8,2.8,0,0,1-.15.91c-2.26,6.83-29.74,12.22-63.3,12.22s-61-5.39-63.31-12.22a2.64,2.64,0,0,1-.13-.68V174.18a2.8,2.8,0,0,0,.13.69c2.27,6.83,29.75,12.21,63.31,12.21s61-5.38,63.3-12.21A2.89,2.89,0,0,0,143.66,174Z"/>
                
                <path class="cls-9" style={{fill:d2}} d="M122.64,183.71c-11.24,2.1-26.11,3.37-42.43,3.37a271,271,0,0,1-31.75-1.76c-2,3.24-1.84,7.75-1.23,12a268.64,268.64,0,0,0,33,1.91c16.87,0,32.2-1.36,43.57-3.59A25.22,25.22,0,0,0,122.64,183.71Z"/>
                
                <path class="cls-10" style={{fill:d3}} d="M16.77,186.3a2.64,2.64,0,0,0,.13.68h-.13Z"/>
                
                <path class="cls-10" style={{fill:d3}} d="M143.66,186.07V187h-.15A2.8,2.8,0,0,0,143.66,186.07Z"/>
                
                <path class="cls-11" style={{fill:d4}}  d="M144.12,125.6c0,7.21-28.48,13.06-63.6,13.06s-63.6-5.85-63.6-13.06,28.48-13.06,63.6-13.06S144.12,118.38,144.12,125.6Z"/>
                
                <path class="cls-12" d="M141.2,129.51c-8.11,5.3-32.21,9.15-60.68,9.15-35.12,0-63.6-5.85-63.6-13.06,0-2.16,2.54-4.19,7-6-1.9,1.23-2.92,2.55-2.92,3.91,0,7.21,28.48,13.06,63.6,13.06C109.27,136.59,130.63,133.72,141.2,129.51Z"/>
                
                <path class="cls-10" style={{fill:d3}} d="M16.77,185.85v.45a1.77,1.77,0,0,1,0-.23A1.7,1.7,0,0,1,16.77,185.85Z"/>
                
                <path class="cls-10" style={{fill:d3}} d="M126.8,77.58v44.2a1.87,1.87,0,0,1-.11.66c-1.65,5-21.8,9-46.43,9s-44.76-4-46.41-9a1.62,1.62,0,0,1-.1-.54V77.58Z"/>
                
                <path class="cls-5" d="M73.13,77.58H33.75V121.9C33.75,122.09,74.09,127.87,73.13,77.58Z"/>
                
                <path class="cls-6" style={{fill:d1}} d="M111.31,77.58c-4.64,50-38.37,51.62-46.2,53.3,4.75.34,9.85.52,15.15.52,24.63,0,44.78-4,46.43-9a1.87,1.87,0,0,0,.11-.66V77.58Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M126.8,112v9.81a1.87,1.87,0,0,1-.11.66c-1.65,5-21.8,9-46.43,9s-44.76-4-46.41-9a1.62,1.62,0,0,1-.1-.54v-9.81a1.72,1.72,0,0,0,.1.55c1.65,5,21.8,9,46.41,9s44.78-4,46.43-9A2,2,0,0,0,126.8,112Z"/>
                
                <path class="cls-4" style={{fill:d1}} d="M33.75,121.9a1.62,1.62,0,0,0,.1.54h-.1Z"/>
                
                <path class="cls-4" style={{fill:d1}} d="M126.8,121.78v.66h-.11A1.87,1.87,0,0,0,126.8,121.78Z"/>
                
                <path class="cls-4" style={{fill:d1}} d="M33.75,121.66v.24a.72.72,0,0,1,0-.24Z"/>
                
                <path class="cls-13" style={{fill:d3}} d="M126.8,78.09V105a1.79,1.79,0,0,1-1.58-.8c-.65-.92-.13-2.18,0-2.64s.6-3.38-1.32-3.4c-2.67,0-3.19,6.68-2.41,8.52a8.23,8.23,0,0,1,.92,3.57,2.8,2.8,0,0,1-2.12,2.7,2.61,2.61,0,0,1-2.36-1.09,6,6,0,0,1-1-2.49c-.94-4.29-.26-8.76-.63-13.13-.19-2.25-.78-4.67-2.58-6a4.91,4.91,0,0,0-6.48.71,11.89,11.89,0,0,1-1.32,1.58,1.48,1.48,0,0,1-1.89.13c-1-1-1.52-2.34-2.55-1.58-.72.54-.87,1.55-1.16,2.41s-.66,1.68-1.56,1.52c-1.33-.23-.35-1.83-1.71-2.25-.7-.21-1.67.56-2.12,4.39-.4,3.55.7,7.12.56,10.7a32.45,32.45,0,0,1-.34,3.26c-.21,1.57-.75,3.49-2.31,3.75a2.57,2.57,0,0,1-2.57-1.65,7.32,7.32,0,0,1-.36-3.23A86.68,86.68,0,0,0,90,98.36a9.74,9.74,0,0,0-.85-3.62,4.15,4.15,0,0,0-2.79-2.29c-1.23-.22-2.69-.59-3,1.66-.05.31.36,2.71-.52,2.92-2.68.67-1.48-2.16-2.11-3.68-1.06-2.58-3.31-1.54-4.07-.6-1.87,2.31,2.83,10.69-3.23,10.78-4.66.06-3-6.21-5.08-10-.74-1.33-4.54-2.92-7.32-.81-1.22.93-1.62,2.57-1.95,4.07a51.16,51.16,0,0,0-1.12,14,9.12,9.12,0,0,1-.13,3,2.72,2.72,0,0,1-2,2c-1.71.32-3-1.57-3.42-3.24a27.65,27.65,0,0,1-.49-8.38c.12-2.78.23-5.58.36-8.37a13.39,13.39,0,0,0-.38-4.77,4.5,4.5,0,0,0-3.32-3.16c-1.58-.25-3.07.28-3.42,2.12-.07.33.85,2.89.06,4.09a1.24,1.24,0,0,1-2-.06c-1-1.73-.06-4.57-.9-5.88a2.18,2.18,0,0,0-2.81-1A4.4,4.4,0,0,0,37,90.09a12,12,0,0,0-.4,3.93c0,.84-.3,2-1.14,1.88-.66-.1-1.33-.71-1.5-2.49-.52-5.45.58-10.09.91-15.55Z"/>
                
                <path class="cls-14" style={{fill:d5}} d="M33.82,77.23c-.34,5.47-.91,10.15-.92,15.56,0,1.79.84,2.39,1.5,2.49.83.13,1.15-1,1.14-1.88a12.07,12.07,0,0,1,.4-3.93,4.4,4.4,0,0,1,2.53-2.88,2.18,2.18,0,0,1,2.81,1c.83,1.31-.12,4.15.9,5.88a1.47,1.47,0,0,0,2.19.37c.66-.8.54-2.48,0-4.14s1.59-2.63,3.17-2.39a4.52,4.52,0,0,1,3.31,3.17,13.2,13.2,0,0,1,.38,4.78q-.18,4.19-.35,8.36A28,28,0,0,0,51.4,112c.45,1.67,1.72,3.55,3.43,3.25a2.78,2.78,0,0,0,2-2.06,9.07,9.07,0,0,0,.13-3,51.24,51.24,0,0,1,1.12-14c.33-1.5.73-3.14,1.95-4.07,2.78-2.11,7-1.25,8.15.85,2.09,3.75-2,9.91,4.25,9.91,4.59,0,1.37-8.46,3.23-10.77.76-.94,3-2,4.07.6.63,1.52-.57,4.36,2.11,3.69.88-.22.47-2.61.51-2.93.3-2.25,1.76-1.88,3-1.66a4.15,4.15,0,0,1,2.79,2.29A10,10,0,0,1,89,97.74a88.21,88.21,0,0,1-.08,11.61,7.35,7.35,0,0,0,.37,3.24,2.56,2.56,0,0,0,2.57,1.65c1.56-.26,2.1-2.18,2.31-3.75a32.45,32.45,0,0,0,.34-3.26c.14-3.58-1-7.15-.56-10.7.44-3.83,1.42-4.6,2.12-4.38,1.36.41.38,2,1.71,2.24.89.16,1.25-.66,1.55-1.52s.44-1.87,1.17-2.41c1-.76,1.6.6,2.54,1.58a1.49,1.49,0,0,0,1.9-.13,11.89,11.89,0,0,0,1.32-1.58,4.91,4.91,0,0,1,6.48-.71c1.8,1.36,2.39,3.78,2.58,6,.37,4.37-.32,8.84.62,13.13a6.2,6.2,0,0,0,1,2.5,2.68,2.68,0,0,0,2.36,1.09,2.79,2.79,0,0,0,2.11-2.71,8.07,8.07,0,0,0-.91-3.56c-.79-1.85-.26-8.55,2.4-8.53,1.93,0,1.49,3,1.33,3.41a2.87,2.87,0,0,0,0,2.63c.47.65,2.2,1.94,2.87-1.23.86-4.09.2-8.37.21-12.56s-.48-8.2-.47-12.35Z"/>
                
                <g class="cls-15"><path class="cls-14" style={{fill:d5}} d="M39.4,86.42a2.91,2.91,0,0,0-.93.17,4.44,4.44,0,0,0-2.54,2.88,12.32,12.32,0,0,0-.39,3.93c0,.84-.31,2-1.14,1.88a1.29,1.29,0,0,1-.58-.23c.59-.17.83-1.13.83-1.86A12.34,12.34,0,0,1,35,89.26a4.4,4.4,0,0,1,2.54-2.87A2.24,2.24,0,0,1,39.4,86.42Z"/>
                
                <path class="cls-14" style={{fill:d5}} d="M46.69,87.09a3.25,3.25,0,0,1,.68.18c-1.56-.14-3.44.82-3,2.41s.62,3.34,0,4.14a1.44,1.44,0,0,1-1.69.13,1.14,1.14,0,0,0,.8-.33c.66-.81.54-2.48,0-4.14S45.1,86.84,46.69,87.09Z"/>
                
                <path class="cls-14" style={{fill:d5}} d="M64.82,91A6.33,6.33,0,0,0,60,92.14c-1.22.93-1.63,2.57-2,4.07a51.59,51.59,0,0,0-1.11,14,9.07,9.07,0,0,1-.13,3,2.73,2.73,0,0,1-2,2,1.94,1.94,0,0,1-1.24-.17,2.16,2.16,0,0,0,.35,0,2.75,2.75,0,0,0,2-2,8.87,8.87,0,0,0,.13-3,51.24,51.24,0,0,1,1.12-14c.33-1.49.74-3.14,2-4.06A6.43,6.43,0,0,1,64.82,91Z"/>
                
                <path class="cls-14" style={{fill:d5}} d="M77.66,91.1a2.89,2.89,0,0,0-2,1c-1.87,2.3,1.36,10.77-3.23,10.77a5.52,5.52,0,0,1-1.9-.28,6.11,6.11,0,0,0,1,.07c4.59,0,1.37-8.47,3.24-10.78A2.52,2.52,0,0,1,77.66,91.1Z"/>
                
                <path class="cls-14" style={{fill:d5}} d="M84.42,91.62a3.5,3.5,0,0,1,.49.14c-1.12-.2-2.32-.28-2.57,1.73,0,.31.35,2.71-.52,2.92a1.51,1.51,0,0,1-1.42-.12,2.85,2.85,0,0,0,.53-.08c.87-.22.47-2.61.51-2.93C81.73,91,83.2,91.4,84.42,91.62Z"/>
                
                <path class="cls-14" style={{fill:d5}} d="M95.14,91.94a1.38,1.38,0,0,1,.42.22c-.62.23-1.3,1.35-1.65,4.37-.41,3.55.69,7.12.56,10.7a32.45,32.45,0,0,1-.34,3.26c-.21,1.57-.76,3.49-2.31,3.75a2,2,0,0,1-1.18-.18,1.33,1.33,0,0,0,.28,0c1.56-.25,2.11-2.18,2.32-3.75.15-1.08.29-2.17.34-3.26.13-3.58-1-7.14-.56-10.7C93.46,92.49,94.43,91.72,95.14,91.94Z"/>
                
                <path class="cls-14" style={{fill:d5}} d="M100.76,90.29a1.52,1.52,0,0,0-.3.17c-.73.54-.87,1.55-1.17,2.41s-.66,1.68-1.56,1.52a.89.89,0,0,1-.48-.21c.61-.13.9-.81,1.14-1.52s.45-1.87,1.18-2.41A.86.86,0,0,1,100.76,90.29Z"/>
                
                <path class="cls-14" style={{fill:d5}} d="M110.58,88.77a4.87,4.87,0,0,0-4.36,1.56,11.24,11.24,0,0,1-1.33,1.58,1.49,1.49,0,0,1-1.8.19,1.78,1.78,0,0,0,.91-.39,10.61,10.61,0,0,0,1.32-1.59A5,5,0,0,1,110.58,88.77Z"/>
                
                <path class="cls-14" style={{fill:d5}} d="M122,97.36a1.37,1.37,0,0,1,.76.22c-2.55.19-3,6.71-2.27,8.52a8.19,8.19,0,0,1,.92,3.56,2.81,2.81,0,0,1-2.12,2.7,2.22,2.22,0,0,1-1.22-.18l.33,0a2.8,2.8,0,0,0,2.11-2.7,8.22,8.22,0,0,0-.91-3.57C118.8,104.05,119.33,97.34,122,97.36Z"/>
                
                <path class="cls-14" style={{fill:d5}} d="M127.06,102.38c-.48,2.25-1.49,2.25-2.2,1.83.51-.1,1-.63,1.3-2,.87-4.09.21-8.37.22-12.55s-.46-8.08-.47-12.15h.89c0,4.15.48,8.21.47,12.35S127.92,98.29,127.06,102.38Z"/>
                
                </g><ellipse class="cls-14" style={{fill:d5}} cx="80.27" cy="77.43" rx="46.53" ry="9.58"/>
                
                <path class="cls-12" d="M125,80.06c-5.54,4-23.48,7-44.75,7-25.69,0-46.52-4.29-46.52-9.58,0-1.52,1.7-2.94,4.72-4.21a3.46,3.46,0,0,0-1.77,2.62c0,5.29,20.83,9.58,46.53,9.58C101.57,85.42,117.45,83.23,125,80.06Z"/>
                
                <path class="cls-4" style={{fill:d1}} d="M112.6,46.39v28C112.56,78,98.12,81,80.32,81S48.08,78,48,74.34V46.39Z"/>
                
                <path class="cls-5" d="M73.14,47.15,48,46.39l.22,24.81C63.92,74.53,74.06,65.62,73.14,47.15Z"/>
                
                <path class="cls-6" style={{fill:d1}} d="M109.2,46.39a25.39,25.39,0,0,1-2.38,16.2c-5.71,10.88-18,14.06-29.34,15.61A72.69,72.69,0,0,1,51,77.09c5.09,2.3,16.31,3.9,29.35,3.9,17.8,0,32.24-3,32.28-6.65V46.39Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M112.6,66.08v8.26C112.56,78,98.12,81,80.32,81S48.08,78,48,74.34V66.08c0,3.67,14.47,6.65,32.28,6.65S112.56,69.75,112.6,66.08Z"/>
                
                <path class="cls-6" style={{fill:d1}} d="M112.6,46.39V60.23c-.58-.26-.48-3.81-1.06-4-2.2-.87-1.74,4.15-1.73,4.69,0,1.09,0,2.18,0,3.28,0,.66-.07,1.46-.67,1.75-.89.43-2.78-.47-2.54-5.19a20.46,20.46,0,0,0,0-4,5,5,0,0,0-1.8-3.46,4.92,4.92,0,0,0-3-.82,8.5,8.5,0,0,0-7.29,4.62c-.22.44-.46,1-1,1.1-.73.21-1.33-.62-1.52-1.37s-.32-1.62-1-2a1.69,1.69,0,0,0-1.86.46c-.5.47-.85,1.08-1.34,1.54a3.44,3.44,0,0,1-5-.66c-.44-.7-.72-1.65-1.52-1.85s-1.66.77-2,1.65a18.47,18.47,0,0,0-1.45,6.91c0,.79-.16,1.84-.94,1.94a1.79,1.79,0,0,1-2-1.55c-.78-4.37.62-9.48-3.77-10.53-1.91-.46-4.49-.23-5,3.58a3.44,3.44,0,0,1-.31,1.28.88.88,0,0,1-1.11.32c-1.93-.78-1.42-3.61-2.75-4.37a4.06,4.06,0,0,0-4.32.19c-1.69,1.27-1.9,3.7-2,5.82,0,.64-.27,1.49-.91,1.42a1.38,1.38,0,0,1-.77-.38c-1.95-2.18-.51-5.69-1.43-8.47a1,1,0,0,0-.43-.63c-.37-.19-2.13,0-2.4,3-.09,1.13.7,3.23-.43,3.37-1.57.5-.94-6.22-.55-11.4l8.63-.13Z"/>
                
                <path class="cls-11" style={{fill:d4}} d="M48,46.14c-.39,5.18-1,11.9.56,11.4,1.12-.14.33-2.24.43-3.37.26-3,2-3.24,2.39-3.05a1,1,0,0,1,.43.64c.92,2.77-.52,6.28,1.43,8.46a1.41,1.41,0,0,0,.77.38c.64.07.9-.78.92-1.42.06-2.12.27-4.55,2-5.82a4,4,0,0,1,4.32-.18c1.33.75.83,3.58,2.75,4.37a.89.89,0,0,0,1.11-.33A3.44,3.44,0,0,0,65.36,56c.52-3.83,3.09-4.06,5-3.59,4.38,1,3,6.16,3.76,10.53a1.79,1.79,0,0,0,2,1.55c.78-.1.94-1.15,1-1.94a18.08,18.08,0,0,1,1.44-6.91c.38-.87,1.12-1.87,2-1.64s1.09,1.15,1.53,1.84a3.4,3.4,0,0,0,5,.66c.51-.46.85-1.07,1.35-1.54a1.71,1.71,0,0,1,1.87-.46c.67.34.8,1.23,1,2s.79,1.58,1.52,1.37c.49-.14.73-.66,1-1.11a8.5,8.5,0,0,1,7.29-4.62,5,5,0,0,1,3,.82,5.14,5.14,0,0,1,1.8,3.46,21.27,21.27,0,0,1,0,4c-.23,4.72,1.66,5.62,2.54,5.19.6-.28.68-1.08.67-1.74,0-1.1,0-2.2,0-3.3,0-.53-.47-5.56,1.73-4.68.59.24.48,3.86,1.08,4.06.78.26,1.2-.89,1.21-1.71,0-3.65.1-7.3.11-11a2,2,0,0,0-1.41-2Z"/>
                
                <path class="cls-16" style={{fill:d4}} d="M50.66,51.09l.05,0c-.66.2-1.57.95-1.74,3-.1,1.13.69,3.23-.43,3.37a.45.45,0,0,1-.46-.09c.76-.42.1-2.27.19-3.3C48.53,51.13,50.29,50.9,50.66,51.09Z"/>
                
                <path class="cls-16" style={{fill:d4}} d="M59,52.65a3.67,3.67,0,0,0-2.12.71c-1.69,1.27-1.9,3.7-2,5.82,0,.64-.28,1.49-.92,1.42a1,1,0,0,1-.33-.1,1.66,1.66,0,0,0,.54-1.34c.07-2.13.28-4.56,2-5.83A3.87,3.87,0,0,1,59,52.65Z"/>
                
                <path class="cls-16" style={{fill:d4}} d="M68.83,52.19c-1.55.05-3.08.9-3.47,3.75a3.26,3.26,0,0,1-.31,1.28.87.87,0,0,1-1.11.32h0a.75.75,0,0,0,.43-.34,3.64,3.64,0,0,0,.3-1.28C65.12,52.64,67.07,52,68.83,52.19Z"/>
                
                <path class="cls-16" style={{fill:d4}} d="M79.89,53.92,80,54a2.71,2.71,0,0,0-1.47,1.64,18,18,0,0,0-1.44,6.91c0,.78-.17,1.83-1,1.93a1.85,1.85,0,0,1-.66,0c.76-.13.91-1.15.92-1.93a17.82,17.82,0,0,1,1.44-6.91C78.23,54.69,79,53.7,79.89,53.92Z"/>
                
                <path class="cls-16" style={{fill:d4}} d="M89.47,54.36a2.23,2.23,0,0,0-1,.55c-.5.47-.84,1.08-1.35,1.54a3.2,3.2,0,0,1-2.66.76,3.12,3.12,0,0,0,2-.78c.5-.46.85-1.07,1.34-1.55A1.82,1.82,0,0,1,89.47,54.36Z"/>
                
                <path class="cls-16" style={{fill:d4}} d="M100.39,52a7,7,0,0,1,.79,0h-.09a8.48,8.48,0,0,0-7.3,4.61c-.23.44-.47,1-1,1.1a.78.78,0,0,1-.6-.05,2,2,0,0,0,.85-1.08A8.49,8.49,0,0,1,100.39,52Z"/>
                
                <path class="cls-16" style={{fill:d4}} d="M110.09,55.76c-1.32.45-1,4.26-1,4.73,0,1.09,0,2.19,0,3.28,0,.66-.07,1.46-.67,1.75a1.07,1.07,0,0,1-.83,0l.14,0c.59-.29.67-1.09.67-1.75l0-3.29C108.41,59.93,108,55,110.09,55.76Z"/>
                
                <path class="cls-16" style={{fill:d4}} d="M113.25,47.2c0,3.65-.07,7.3-.11,11,0,.81-.43,2-1.21,1.7a.21.21,0,0,1-.12-.11,2.16,2.16,0,0,0,.63-1.62c0-3.66.1-7.31.11-11a2.06,2.06,0,0,0-1.24-1.94h.53A2,2,0,0,1,113.25,47.2Z"/>
                
                <path class="cls-11" style={{fill:d4}} d="M112.68,46.28c0,2.68-14.49,4.85-32.36,4.85S48,49,48,46.28s14.48-4.84,32.35-4.84S112.68,43.61,112.68,46.28Z"/>
                
                <path class="cls-12" d="M112,47.29c-3.09,2.19-16.09,3.84-31.65,3.84C62.45,51.13,48,49,48,46.29c0-.68.92-1.33,2.58-1.91-.47.33-.72.67-.72,1,0,2.68,14.48,4.85,32.35,4.85C95.57,50.25,107.06,49,112,47.29Z"/>
                
                <rect class="cls-17" x="55.94" y="-0.28" width="1.39" height="46.2" transform="matrix(0.98, -0.19, 0.19, 0.98, -3.29, 11.12)"/>
                
                <rect class="cls-17" x="104.58" y="-0.15" width="1.39" height="46.66" transform="translate(204.3 65.78) rotate(-169.14)"/>
                
                <path class="cls-18" d="M52.26,2.16c13.79,7.43,46,6.88,57.32,0"/>
                
                <path class="cls-8" style={{fill:d2}} d="M56.09,3.58a57.48,57.48,0,0,0,7.1,2L59,13Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M106.83,3.34a57.11,57.11,0,0,1-7.06,2.09l4.12,7.3Z"/>
                
                <polygon class="cls-19" points="66.23 6.12 74.06 7.02 69.92 15.04 66.23 6.12"/>
                
                <polygon class="cls-19" points="96.51 6.01 88.72 7.02 92.85 15.04 96.51 6.01"/>
                
                <polygon class="cls-17" points="85.29 7.19 77.58 7.21 81.65 15.69 85.29 7.19"/>
                
                <path class="cls-8" style={{fill:d2}} d="M104.46,34a15.5,15.5,0,0,1-2.5,5.61c-2.43,3.41-6.7,6-12.45,7.9-5.66-2.16-9.62-4.94-11.89-8.45a15.39,15.39,0,0,1-2.25-5.72c-.62-3.69,0-8.14,3.1-10.58a7.55,7.55,0,0,1,5.26-1.38A7.21,7.21,0,0,1,89,24.46a7,7,0,0,1,.69,1.22,7.16,7.16,0,0,1,.35.87,5.17,5.17,0,0,1,.39-.85,6.9,6.9,0,0,1,.73-1.19,7.25,7.25,0,0,1,5.46-2.83,7.51,7.51,0,0,1,5.19,1.61C104.87,25.87,105.25,30.35,104.46,34Z"/>
                
                <path class="cls-20" d="M82.2,29a8.08,8.08,0,0,0,6.89,4.28c3,.26,6.09-.49,7.88-3.13,1.68-2.47,1.83-5.48,1.54-8.36a7.71,7.71,0,0,0-1.85-.12,7.25,7.25,0,0,0-5.46,2.83,6.9,6.9,0,0,0-.73,1.19,5.17,5.17,0,0,0-.39.85,7.16,7.16,0,0,0-.35-.87A7,7,0,0,0,89,24.46a7.21,7.21,0,0,0-5.31-3.08,8.09,8.09,0,0,0-4.14.69A31.66,31.66,0,0,0,82.2,29Z"/>
                
                <path class="cls-9" style={{fill:d2}} d="M90.39,40.73c-5.53.19-10.77-2.35-14.74-6.15a15.49,15.49,0,0,0,2,4.48c2.27,3.51,6.23,6.29,11.89,8.45,5.75-1.9,10-4.49,12.45-7.9a15.5,15.5,0,0,0,2.5-5.61,14.45,14.45,0,0,0,.12-5.79C103.18,34.49,96.66,40.52,90.39,40.73Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M80.12,28.82A14.17,14.17,0,0,1,82,34.16c.52,3.81-.71,8.21-3.35,13.08-7.49,2.25-14.94,1-18.35-.76a9.11,9.11,0,0,1-4.57-9,6.78,6.78,0,0,1,2.65-4.2A6.57,6.57,0,0,1,63.84,32a7,7,0,0,1,1.22.4,5.87,5.87,0,0,1,.78.36,5.22,5.22,0,0,1-.28-.81,6.85,6.85,0,0,1-.25-1.26,6.59,6.59,0,0,1,1.86-5.31,6.84,6.84,0,0,1,4.48-2.14C75.29,23.09,78.36,25.87,80.12,28.82Z"/>
                
                <path class="cls-20" d="M61.25,32.21C63.19,36.59,67,38.43,71.73,38c4.12-.38,8-2.77,9.23-6.88a.54.54,0,0,1,.15-.23,14.55,14.55,0,0,0-1-2.07c-1.76-2.95-4.83-5.73-8.47-5.59a6.84,6.84,0,0,0-4.48,2.14,6.59,6.59,0,0,0-1.86,5.31,6.85,6.85,0,0,0,.25,1.26,5.22,5.22,0,0,0,.28.81,5.87,5.87,0,0,0-.78-.36,7,7,0,0,0-1.22-.4A6.54,6.54,0,0,0,61,32,.4.4,0,0,1,61.25,32.21Z"/>
                
                <path class="cls-9" style={{fill:d2}} d="M71.26,44.81c-11,1.29-14.16-3.46-15.53-4.8a9.22,9.22,0,0,0,4.54,6.47c3.41,1.81,10.86,3,18.35.76A25.94,25.94,0,0,0,82,37C79.6,41.28,76,44.26,71.26,44.81Z"/>
                
                <g class="cls-21"><text class="cls-22" transform="translate(63.42 40.77)">Love</text></g><text class="cls-22" transform="translate(62.99 40.48)">Love</text><polygon class="cls-23" points="120.15 76.71 119.89 76.66 124.03 58.23 124.3 58.28 120.15 76.71"/>
                
                <path class="cls-10" style={{fill:d3}} d="M135.49,51.57a10.67,10.67,0,0,1-2.25,3.55c-2,2.05-5.1,3.37-9.15,4.07-3.57-2-6-4.31-7.11-6.91a10.74,10.74,0,0,1-.92-4.1c0-2.56.81-5.51,3.16-6.84a5.08,5.08,0,0,1,3.67-.4,4.91,4.91,0,0,1,3.25,2.62,5.7,5.7,0,0,1,.33.9,4.7,4.7,0,0,1,.15.62,4.56,4.56,0,0,1,.34-.54,5.33,5.33,0,0,1,.62-.73,4.9,4.9,0,0,1,3.94-1.36,5.07,5.07,0,0,1,3.32,1.62C136.6,46.12,136.4,49.18,135.49,51.57Z"/>
                
                <path class="cls-20" d="M116.12,48.93a9.27,9.27,0,0,0,6.44,2c3.54-.39,6.25-4.33,5.93-7.85a5,5,0,0,0-.91.69,5.33,5.33,0,0,0-.62.73,4.56,4.56,0,0,0-.34.54,4.7,4.7,0,0,0-.15-.62,5.7,5.7,0,0,0-.33-.9,4.91,4.91,0,0,0-3.25-2.62,5.08,5.08,0,0,0-3.67.4c-2.35,1.33-3.2,4.28-3.16,6.84Q116.07,48.56,116.12,48.93Z"/>
                
                <path class="cls-24" style={{fill:d3}} d="M134.84,44.07a4.26,4.26,0,0,0-1.07-.86,10.82,10.82,0,0,1-4.39,9.52A12.93,12.93,0,0,1,119,55.26a20.63,20.63,0,0,0,5.12,3.93c4-.7,7.17-2,9.15-4.07a10.67,10.67,0,0,0,2.25-3.55C136.4,49.18,136.6,46.12,134.84,44.07Z"/>
                
                <path class="cls-20" d="M123.36,42.89c.15.84-.83,1.71-2.17,1.94s-2.56-.27-2.7-1.11.83-1.71,2.18-1.94S123.22,42.05,123.36,42.89Z"/>
                
                <rect class="cls-23" x="115.74" y="61.36" width="0.34" height="16.93" transform="translate(242.91 116.55) rotate(169.13)"/>
                
                <path class="cls-8" style={{fill:d2}} d="M107.61,61.73a7.23,7.23,0,0,0,1.53,2.4c1.34,1.4,3.46,2.29,6.21,2.77a10.86,10.86,0,0,0,4.82-4.69,7.08,7.08,0,0,0,.62-2.79c0-1.73-.55-3.73-2.14-4.64a3.46,3.46,0,0,0-2.49-.26,3.28,3.28,0,0,0-2.2,1.77,3.47,3.47,0,0,0-.23.61c0,.12-.08.28-.1.42a2.48,2.48,0,0,0-.23-.36,5,5,0,0,0-.42-.5,3.32,3.32,0,0,0-2.68-.92,3.49,3.49,0,0,0-2.25,1.09C106.86,58,107,60.11,107.61,61.73Z"/>
                
                <path class="cls-20" d="M120.76,59.94a6.35,6.35,0,0,1-4.38,1.38c-2.4-.27-4.23-2.94-4-5.33a3.49,3.49,0,0,1,.62.47,5,5,0,0,1,.42.5,2.48,2.48,0,0,1,.23.36c0-.14.07-.3.1-.42a3.47,3.47,0,0,1,.23-.61,3.28,3.28,0,0,1,2.2-1.77,3.46,3.46,0,0,1,2.49.26c1.59.91,2.17,2.91,2.14,4.64C120.79,59.6,120.77,59.77,120.76,59.94Z"/>
                
                <path class="cls-25" style={{fill:d1}} d="M108.05,56.63a3,3,0,0,1,.73-.58,7.34,7.34,0,0,0,3,6.46,8.79,8.79,0,0,0,7.07,1.72,14.26,14.26,0,0,1-3.47,2.67c-2.75-.48-4.87-1.37-6.21-2.77a7.23,7.23,0,0,1-1.53-2.4C107,60.11,106.86,58,108.05,56.63Z"/>
                
                <path class="cls-20" d="M115.84,55.84c-.1.57.56,1.16,1.48,1.32s1.73-.19,1.82-.76-.56-1.16-1.47-1.32S115.94,55.27,115.84,55.84Z"/>
                
                <polygon class="cls-23" points="41.76 76.76 42.03 76.71 37.39 58.11 37.12 58.16 41.76 76.76"/>
                
                <path class="cls-10" style={{fill:d3}} d="M25.93,51.45A10.49,10.49,0,0,0,28.19,55c2,2.06,5.1,3.37,9.15,4.08,3.57-2,5.94-4.32,7.1-6.92a10.35,10.35,0,0,0,.92-4.1c0-2.55-.8-5.5-3.16-6.84a5,5,0,0,0-3.66-.39,4.88,4.88,0,0,0-3.25,2.62,4.52,4.52,0,0,0-.33.89,3.43,3.43,0,0,0-.15.63,3.36,3.36,0,0,0-.35-.54,5.36,5.36,0,0,0-.61-.73,4.89,4.89,0,0,0-4-1.36,5.08,5.08,0,0,0-3.31,1.61C24.83,46,25,49.06,25.93,51.45Z"/>
                
                <path class="cls-20" d="M45.31,48.81a9.4,9.4,0,0,1-6.45,2c-3.53-.39-6.24-4.34-5.93-7.86a4.76,4.76,0,0,1,.92.7,5.36,5.36,0,0,1,.61.73,3.36,3.36,0,0,1,.35.54,3.43,3.43,0,0,1,.15-.63,4.52,4.52,0,0,1,.33-.89,4.88,4.88,0,0,1,3.25-2.62,5,5,0,0,1,3.66.39c2.36,1.34,3.21,4.29,3.16,6.84C45.36,48.3,45.33,48.56,45.31,48.81Z"/>
                
                <path class="cls-20" d="M38.06,42.77c-.14.84.83,1.71,2.18,1.94s2.55-.27,2.69-1.12-.83-1.71-2.17-1.94S38.21,41.92,38.06,42.77Z"/>
                
                <path class="cls-26" style={{fill:d3}} d="M29,51.68a7.55,7.55,0,0,0,1.59,2.5c1.39,1.45,3.59,2.37,6.44,2.87a11.2,11.2,0,0,0,5-4.87,7.33,7.33,0,0,0,.65-2.88c0-1.8-.57-3.88-2.22-4.82a3.63,3.63,0,0,0-2.59-.28,3.45,3.45,0,0,0-2.28,1.85,3.41,3.41,0,0,0-.24.63,3.64,3.64,0,0,0-.1.44,2.26,2.26,0,0,0-.24-.38,3.67,3.67,0,0,0-.44-.52,3.46,3.46,0,0,0-2.77-1A3.65,3.65,0,0,0,29.5,46.4C28.26,47.85,28.41,50,29,51.68Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M29.21,51.14a7.4,7.4,0,0,0,1.59,2.5c1.39,1.44,3.59,2.37,6.44,2.87a11.3,11.3,0,0,0,5-4.87,7.56,7.56,0,0,0,.65-2.89c0-1.79-.57-3.87-2.23-4.81a3.6,3.6,0,0,0-2.58-.28,3.5,3.5,0,0,0-2.29,1.84,5.33,5.33,0,0,0-.23.63,2.84,2.84,0,0,0-.1.44,2.65,2.65,0,0,0-.25-.37,3,3,0,0,0-.43-.52,3.47,3.47,0,0,0-2.78-1,3.63,3.63,0,0,0-2.33,1.14C28.43,47.31,28.57,49.46,29.21,51.14Z"/>
                
                <path class="cls-20" d="M42.85,49.29a6.59,6.59,0,0,1-4.54,1.43c-2.49-.27-4.39-3-4.17-5.53a4.19,4.19,0,0,1,.64.49,3,3,0,0,1,.43.52,2.65,2.65,0,0,1,.25.37,2.84,2.84,0,0,1,.1-.44,5.33,5.33,0,0,1,.23-.63,3.5,3.5,0,0,1,2.29-1.84,3.6,3.6,0,0,1,2.58.28c1.66.94,2.26,3,2.23,4.81C42.88,48.93,42.86,49.11,42.85,49.29Z"/>
                
                <path class="cls-25" style={{fill:d1}} d="M29.67,45.86a2.92,2.92,0,0,1,.75-.6A7.63,7.63,0,0,0,33.51,52a9.13,9.13,0,0,0,7.33,1.78,14.69,14.69,0,0,1-3.6,2.77c-2.85-.5-5.05-1.43-6.44-2.87a7.4,7.4,0,0,1-1.59-2.5C28.57,49.46,28.43,47.31,29.67,45.86Z"/>
                
                <path class="cls-20" d="M37.75,45c-.1.6.58,1.21,1.53,1.37s1.8-.19,1.9-.78-.59-1.21-1.54-1.37S37.85,44.44,37.75,45Z"/>
                
                <rect class="cls-23" x="46.06" y="60.35" width="0.34" height="16.93" transform="translate(73.91 146.96) rotate(-165.62)"/>
                
                <path class="cls-8" style={{fill:d2}} d="M42.16,58a7.31,7.31,0,0,0,.36,2.83c.62,1.83,2.16,3.54,4.44,5.15a10.84,10.84,0,0,0,6.36-2.2,7.12,7.12,0,0,0,1.75-2.25c.76-1.55,1.09-3.61,0-5.11A3.46,3.46,0,0,0,53,55.07a3.4,3.4,0,0,0-3.22,1.12,3.35,3.35,0,0,0-.26.34c0-.14,0-.31-.06-.43a4.37,4.37,0,0,0-.17-.62,3.34,3.34,0,0,0-2-2,3.48,3.48,0,0,0-2.5,0C43.06,54.29,42.29,56.23,42.16,58Z"/>
                
                <path class="cls-20" d="M54.82,61.93a6.36,6.36,0,0,1-4.55-.61c-2.06-1.26-2.58-4.46-1.37-6.54a3.56,3.56,0,0,1,.36.7,4.37,4.37,0,0,1,.17.62c0,.12,0,.29.06.43a3.5,3.5,0,0,1,.73-.79A3.31,3.31,0,0,1,53,55.07a3.46,3.46,0,0,1,2.14,1.3c1,1.5.72,3.56,0,5.11C55,61.63,54.91,61.78,54.82,61.93Z"/>
                
                <path class="cls-25" style={{fill:d1}} d="M44.73,53.53a3,3,0,0,1,.9-.21,7.36,7.36,0,0,0-.05,7.11A8.81,8.81,0,0,0,51.24,65a14.41,14.41,0,0,1-4.28.94c-2.28-1.61-3.82-3.32-4.44-5.15A7.31,7.31,0,0,1,42.16,58C42.29,56.23,43.06,54.29,44.73,53.53Z"/>
                
                <path class="cls-20" d="M52.11,56.13c-.33.47,0,1.29.78,1.82s1.64.57,2,.09,0-1.29-.78-1.82S52.45,55.65,52.11,56.13Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M89,188.06s26.57-11.93,28.65-9.81,3.54,18.69,1.69,20.19-30.45,1-30.45,1Z"/>
                
                <path class="cls-9" style={{fill:d2}} d="M89,188.06s26.57-11.93,28.65-9.81,3.54,18.69,1.69,20.19-30.45,1-30.45,1Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M117.8,178.42c-1,2.45-3.1,4.26-4.94,5.87a31.44,31.44,0,0,1-8,5A45.07,45.07,0,0,1,89,192.86l-.06,6.58s24.22,5.44,30.45-1C121.62,196.08,119.79,181.12,117.8,178.42Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M82.21,188.06s-26.58-11.93-28.65-9.81S50,196.94,51.87,198.44s30.44,1,30.44,1Z"/>
                
                <path class="cls-9" style={{fill:d2}} d="M82.21,188.06s-26.58-11.93-28.65-9.81S50,196.94,51.87,198.44s30.44,1,30.44,1Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M53.42,178.42c1,2.45,3.1,4.26,4.93,5.87a31.66,31.66,0,0,0,8,5,45.07,45.07,0,0,0,15.88,3.56l.06,6.58s-24.22,5.44-30.44-1C49.59,196.08,51.42,181.12,53.42,178.42Z"/>
                
                <rect class="cls-8" style={{fill:d2}} x="79.45" y="186.75" width="12.68" height="13.13" rx="1.94"/>
                
                <path class="cls-5" d="M86,186.75H81.42a2,2,0,0,0-2,1.94v5.89C83.49,194.55,87.38,191.05,86,186.75Z"/>
                
                <path class="cls-9" style={{fill:d2}} d="M90.17,186.75H89.6a11.37,11.37,0,0,1-3.27,8.8A14.12,14.12,0,0,1,80,199.22a2,2,0,0,0,1.46.66h8.75a2,2,0,0,0,2-1.94v-9.25A2,2,0,0,0,90.17,186.75Z"/>
                
                <path class="cls-8" style={{fill:d2}} d="M26.22,122.22A14.77,14.77,0,0,0,29.71,127c3,2.71,7.47,4.27,13.22,4.88,4.82-3.19,7.94-6.61,9.33-10.37a15,15,0,0,0,.91-5.83c-.18-3.59-1.64-7.65-5.07-9.31a7.13,7.13,0,0,0-5.18-.21,6.88,6.88,0,0,0-4.32,4,7.87,7.87,0,0,0-.38,1.28,5.69,5.69,0,0,0-.15.89,4.82,4.82,0,0,0-.54-.72,6.56,6.56,0,0,0-.93-1,6.91,6.91,0,0,0-5.66-1.55,7.16,7.16,0,0,0-4.5,2.58C24.16,114.67,24.72,119,26.22,122.22Z"/>
                
                <path class="cls-20" d="M53.16,116.72a13.07,13.07,0,0,1-8.86,3.46c-5-.22-9.16-5.5-9-10.47a6.64,6.64,0,0,1,2.28,1.86,4.82,4.82,0,0,1,.54.72,5.69,5.69,0,0,1,.15-.89,7.87,7.87,0,0,1,.38-1.28,6.88,6.88,0,0,1,4.32-4,7.13,7.13,0,0,1,5.18.21c3.43,1.66,4.89,5.72,5.07,9.31C53.18,116,53.17,116.37,53.16,116.72Z"/>
                
                <path class="cls-25" style={{fill:d1}} d="M26.44,111.63a6.29,6.29,0,0,1,1.41-1.31,15.25,15.25,0,0,0,7,13c5,3.36,9.77,3.63,14.84,2.58a29,29,0,0,1-6.81,6c-5.75-.61-10.26-2.17-13.22-4.88a14.77,14.77,0,0,1-3.49-4.76C24.72,119,24.16,114.67,26.44,111.63Z"/>
                
                <path class="cls-20" d="M42.43,108.92c-.12,1.19,1.33,2.32,3.24,2.52s3.55-.62,3.68-1.81-1.33-2.33-3.24-2.52S42.56,107.72,42.43,108.92Z"/>
                
                <path class="cls-10" style={{fill:d3}} d="M57.05,132.14a8.73,8.73,0,0,1-3.19,1.42c-2.32.53-5.1,0-8.23-1.36-1.55-3-2.15-5.73-1.77-8.07a8.75,8.75,0,0,1,1.25-3.27c1.14-1.79,3.08-3.45,5.33-3.3A4.24,4.24,0,0,1,53.17,119a4,4,0,0,1,1,3.31,4.08,4.08,0,0,1-.17.77,4.55,4.55,0,0,1-.19.5,2.89,2.89,0,0,1,.49-.21,3.93,3.93,0,0,1,.76-.23,4.08,4.08,0,0,1,3.37.87A4.23,4.23,0,0,1,60,126.62C60.32,128.86,58.78,130.89,57.05,132.14Z"/>
                
                <path class="cls-27" d="M44.8,121.41a7.75,7.75,0,0,0,3.54,4.38c2.64,1.35,6.33-.15,7.73-2.74a4.43,4.43,0,0,0-1,.06,3.93,3.93,0,0,0-.76.23,2.89,2.89,0,0,0-.49.21,4.55,4.55,0,0,0,.19-.5,4.08,4.08,0,0,0,.17-.77,4,4,0,0,0-1-3.31,4.24,4.24,0,0,0-2.73-1.41c-2.25-.15-4.19,1.51-5.33,3.3A4.29,4.29,0,0,0,44.8,121.41Z"/>
                
                <path class="cls-13" style={{fill:d3}} d="M60,126.62a3.5,3.5,0,0,0-.35-1.08,9,9,0,0,1-7.42,4.6,10.79,10.79,0,0,1-8.39-3,17.08,17.08,0,0,0,1.75,5.08c3.13,1.37,5.91,1.89,8.23,1.36a8.73,8.73,0,0,0,3.19-1.42C58.78,130.89,60.32,128.86,60,126.62Z"/>
                
                <path class="cls-20" d="M52.6,120.54c-.28.65-1.36.81-2.4.35s-1.65-1.36-1.36-2,1.36-.81,2.4-.35S52.89,119.89,52.6,120.54Z"/>
                
                </g></g></g></svg>
             <button className="wp-confirm-btn btn" onClick={(e)=>{
                document.querySelector('#design-2-input').style.display = "none";
                e.target.style.display ="none";
                setConfirm(true)
                }}>Confirm</button>
            </div>
        </div>
    )
}

export default Design_2
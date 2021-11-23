import React, {useState} from 'react'

function ImgFrame({ src, h, author }) {
    const [show, setShow] = useState(0);
  
    return (
      <div className={"imgframe " + (show ? 'pop' : '')} style={{ height: h }}>
        <img className={show ? "mainimgpop" : "mainimg"} src={src} height={h} alt='cake pictures shown'/>
        <span className={(show ? 'show' : 'close')} onClick={() => setShow(0)}>X</span>
        <div className="actions">
          <button className={show ? 'hide' : ''} onClick={() => setShow(show ? 0 : 1)}>查看作品資訊</button>
          <div className={show ? '' : 'hide'}>
            {author}
          </div>
          {/* <but ton onClick={() => window.location = src}>點擊看全版</button> */}
        </div>
      </div>
    )
  }
    
    export default ImgFrame
    
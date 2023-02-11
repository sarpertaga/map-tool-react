import {useState} from "react";
import './Menu.css'
import {geo} from './Map.js'

function Menu() {
    const [context, setContext] = useState(false)
    const [xyPosition, setxyPosition] = useState({x: 0, y:0})

    const showMenu = (e) => {
        e.prevent.default()
        setContext(false)

    const positionChange = {
        x: e.pageX,
        y: e.pageY
    }

    setxyPosition(positionChange)
    setContext(true)
    }
    const hideContext = (e) => {
        setContext(false)
    }

    const [choosen, setChoosen] = useState()
    const initMenu = (geo) => {
        setChoosen(geo)
    }

    return (
        <>
            <h2 className="mb-3">React Right Click Context Menu Example</h2>
                <div
                    className="contextContainer"
                    onContextMenu={showMenu}
                    onClick={hideContext}>

                {choosen && <h1>"{choosen}" is chosen</h1>}
                {context && (
                <div
                    style={{ top: xyPosition.y, left: xyPosition.x }}
                    className="rightClick"
                >
                    <div className="menuElement" onClick={() => initMenu("Get Info")}>
                    Get Info
                    </div>
                </div>
                )}
                </div>
        </>
    )
}

export default Menu
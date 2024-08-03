"use-client"

// Popup.js
import React from "react"
import "./popup.css" // Ensure you style your popup appropriately

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="popuptxt3">Please be patient. &#128153; </span>
        <br />
        <span className="popuptxt1">We are processing your claim...</span>
        <br />
        <span className="popuptxt2">
          By claiming,you are accepting <br />
          our terms and conditions. <br />
          Please do not close the site, It may take a bit
        </span>{" "}
        <br />
        <button className="popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Popup

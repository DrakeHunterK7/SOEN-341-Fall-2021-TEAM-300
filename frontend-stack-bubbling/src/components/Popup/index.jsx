import React from "react";
import "./index.css";

export default function Popup(props) {
  return props.tigger ? (
    <div className="popup">
      <div className="alert alert-primary alert-box" role="alert">
        <div className="description">{props.children}</div>
        <div className="close-btn">
          <button type="button" className="btn btn-danger" onClick={()=>props.setTiggerAlertBox(false)}>
            close
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

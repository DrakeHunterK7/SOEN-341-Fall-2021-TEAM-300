import React from "react";
import MyNavLink from "../MyNavLink";
import "./index.css";

export default function Popup(props) {
  return props.tigger ? (
    <div className="popup">
      <div
        className={
          props.isSuccess
            ? "alert alert-success alert-box"
            : "alert alert-danger alert-box"
        }
        role="alert"
      >
        
        <div className="description">{props.children}</div>

        <div className="close-btn">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => props.setTiggerAlertBox(false)}
          >
            close
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

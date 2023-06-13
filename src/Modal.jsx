import React from "react";
import "./Modal.css";

export function Modal(props) {
  if (props.show) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          <div className="modal-content">
            <div className="image-container">{props.children}</div>
            <button className="close" type="button" onClick={props.onClose}>
              &#x2715;
            </button>
          </div>
        </section>
      </div>
    );
  } else {
    return null;
  }
}

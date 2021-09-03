import React from 'react'

export default function CollapsibleForm(props) {
    var fieldText = "";
    function handleChange(val) {
        fieldText = val;
    }

    function sendVal(val) {
        props.handleSubmit(val);
    }
    
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center m-auto post">
          <h2>{props.heading}</h2>
          <button className="btn bg-grey white-hover dark-button"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            ar
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            {props.formTitle}
          </button>
        </div>
        <div className="collapse" id="collapseExample">
          <div className="card card-body mb-3 post m-auto collapsible-form ">
            <div className="form-group">
              <label for="exampleFormControlTextarea1">
                {props.txtAreaLabel}.
              </label>
              <textarea
                id="reply-input"
                className="form-control"
                rows="3"
                onChange={(e) => handleChange(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-1 d-inline post-button"
              data-toggle="collapse"
              data-target="#collapseExample"
              ar
              aria-expanded="false"
              aria-controls="collapseExample"
              onClick={() => sendVal(fieldText)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
}

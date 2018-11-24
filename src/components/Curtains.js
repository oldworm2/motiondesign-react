import React from "react";

const Curtains = props => {
  return (
    <React.Fragment>
      <Title />
      <div className="row table-area">
        <table className="table table-hover ">
          <thead>
            <tr className="table-success">
              <th scope="col">Room</th>
              <th scope="col">Length</th>
              <th scope="col">Width</th>
              <th scope="col">Pleats</th>
              <th scope="col">Style</th>
              <th scope="col">Notes</th>
              <th scope="col">
                {/* <button type="button" className="btn btn-sm btn-outline-info">+</button> */}
              </th>
            </tr>
          </thead>
          <tbody>
            {props.curtains.map((curtain, index) => (
              <tr key={index} id={index}>
                <td>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      name="room"
                      placeholder="Room"
                      value={props.curtains[index].room}
                      onChange={e => props.curtainChanged(e, index)}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      name="length"
                      placeholder="Length"
                      value={props.curtains[index].length}
                      onChange={e => props.curtainChanged(e, index)}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      name="width"
                      placeholder="Width"
                      value={props.curtains[index].width}
                      onChange={e => props.curtainChanged(e, index)}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      name="pleats"
                      placeholder="Pleats"
                      value={props.curtains[index].pleats}
                      onChange={e => props.curtainChanged(e, index)}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      name="style"
                      placeholder="Style"
                      value={props.curtains[index].style}
                      onChange={e => props.curtainChanged(e, index)}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      name="notes"
                      placeholder="Notes"
                      value={props.curtains[index].notes}
                      onChange={e => props.curtainChanged(e, index)}
                      onKeyDown={e => index + 1 === props.curtains.length 
                        && e.keyCode === 9 
                        && !e.shiftKey 
                        && props.addCurtain()}
                    />
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => props.removeCurtain(index)}
                    tabIndex="-1"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-sm text-right">
          <button
            onClick={() => props.addCurtain()}
            type="button"
            className="btn btn-sm btn-outline-info m-2"
          >
            ADD
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

const Title = props => {
  return (
    <div className="row m-2">
      <h4 className="text-left title">Curtains</h4>
    </div>
  );
};

export default Curtains;

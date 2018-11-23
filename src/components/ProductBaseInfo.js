import React from "react";

const ProductBaseInfo = props => {
  return (
    <div className="row">
      <div className="col-sm">
        <div className="form-group">
          <input
            onChange={e => props.formControlChanged(e)}
            name="customerName"
            value={props.product.customerName}
            type="text"
            className="form-control"
            placeholder="Customer Name"
          />
        </div>
      </div>
      <div className="col-sm">
        <div className="form-group">
          <select
            onChange={e => props.formControlChanged(e)}
            name="suburb"
            value={props.product.suburb}
            className="form-control"
          >
            <option>Suburb</option>
            {props.suburbs.map(suburb => (
              <option key={suburb.id}>
                {suburb.name}, {suburb.city}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-sm">
        <div className="form-group">
          <select
            onChange={e => props.formControlChanged(e)}
            name="material"
            value={props.product.material}
            className="form-control"
          >
            <option>Material</option>
            {props.materials.map(material => (
              <option key={material.id}>{material.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-sm">
        <div className="form-group">
          <select
            onChange={e => props.colorChanged(e)}
            value={props.product.color}
            style={{
              backgroundColor: `rgb(${props.selectedColor.red},
                ${props.selectedColor.green},
                ${props.selectedColor.blue})`,
              color: `rgb(${255 - props.selectedColor.red},
                ${255 - props.selectedColor.green},
                ${255 - props.selectedColor.blue})`
            }}
            className="form-control"
            id="color"
          >
            <option
              style={{
                backgroundColor: "white",
                color: "black"
              }}
            >
              Colour
            </option>
            {props.colors.map(color => (
              <option
                key={color.id}
                value={color.id}
                style={{
                  backgroundColor: `rgb(${color.red},
                    ${color.green},${color.blue})`,
                  color: `rgb(${255 - color.red},
                    ${255 - color.green},${255 - color.blue})`
                }}
              >
                {color.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductBaseInfo;

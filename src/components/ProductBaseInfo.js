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
            <option disabled value="">Suburb</option>
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
            <option disabled value="">Material</option>
            {props.materials.map(material => (
              <option key={material.id}>{material.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-sm">
        <div className="form-group">
          <select
            onChange={e => props.colourChanged(e)}
            value={props.product.colour}
            style={{
              backgroundColor: `rgb(${props.selectedColour.red},
                ${props.selectedColour.green},
                ${props.selectedColour.blue})`,
              color: `rgb(${255 - props.selectedColour.red},
                ${255 - props.selectedColour.green},
                ${255 - props.selectedColour.blue})`
            }}
            className="form-control"
            id="colour"
          >
            <option disabled value=""
              style={{
                backgroundColor: "white",
                colour: "black"
              }}
            >
              Colour
            </option>
            {props.colours.map(colour => (
              <option
                key={colour.id}
                value={colour.name}
                style={{
                  backgroundColor: `rgb(${colour.red},
                    ${colour.green},${colour.blue})`,
                  color: `rgb(${255 - colour.red},
                    ${255 - colour.green},${255 - colour.blue})`
                }}
              >
                {colour.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductBaseInfo;

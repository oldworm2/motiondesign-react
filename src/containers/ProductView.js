import React, { Component } from "react";
import ProductBaseInfo from "../components/ProductBaseInfo";
import Curtains from "../components/Curtains";

class ProductView extends Component {
  state = {
    product: {
      customerName: '',
      suburb: '',
      material: '',
      colour: '',
      curtains: []
    },
    curtain: {
      room: '',
      length: '',
      width: '',
      pleats: '',
      style: '',
      notes: ''
    },
    suburbs: [],
    materials: [],
    colours: [],
    selectedColour: {
      red: 255,
      green: 255,
      blue: 255,
    },
    showMessageBox: false,
    message: '',
    messageLevel: 'Error',
  };

  formControlChanged(event) {
    const product = {...this.state.product};
    product[event.target.name] = event.target.value;
    this.setState({
      product: product
    });
  }

  addCurtain() {
    const curtains = [...this.state.product.curtains];
    const curtain = {...this.state.curtain};
    curtains.push(curtain);
    this.setState({
      product: {
        ...this.state.product,
        curtains: curtains
      }
    });
  }

  removeCurtain(index) {
    const curtains = [...this.state.product.curtains];
    curtains.splice(index, 1);
    this.setState({
      product: {
        ...this.state.product,
        curtains: curtains
      }
    });
  }

  colourChanged(event) {
    if (event.target.value === 'Colour') {
      const selectedColour = {
        red: 255,
        green: 255,
        blue: 255,
      }
      this.setState({
        product: {
          ...this.state.product,
          colour: ''
        },
        selectedColour: selectedColour,
      });
    } else {
      const selectedColour = this.state.colours.find(
        colour => colour.id === Number(event.target.value)
      );
      this.setState({
        product: {
          ...this.state.product,
          colour: event.target.value
        },
        selectedColour: selectedColour,
      });
    }
  }

  curtainChanged(event, index) {
    const curtains = [...this.state.product.curtains];
    curtains[index][event.target.name] = event.target.value;

    this.setState({
      product: {
        ...this.state.product,
        curtains: curtains
      }
    });
  }

  async saveProduct() {
    try {
      const body = {...this.state.product}
      const response = await fetch('/data', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      });
      if (! response.ok) {
        throw new Error(response.statusText);
      } 
      this.reloadData();
      this.setState({
        showMessageBox: true,
        message: 'Saved',
        messageLevel: 'Success'
      });
      setInterval(() => this.setState({showMessageBox: false}), 3000);
    } catch(e) {
      console.error(e);
      this.setState({
        showMessageBox: true,
        message: e.message,
        messageLevel: 'Error'
      });
    }
  }

  async reloadData() {
    try {
      const res = await fetch('/data'); 
      if(res.statusText !== 'No Content'){
        const product = await res.json();
        let selectedColour = this.state.colours.find(
          colour => colour.id === Number(product.colour)
        );
        if(!selectedColour){
          selectedColour = {...this.state.selectedColour};
        }
        this.setState({
          product: product,
          selectedColour: selectedColour
        });
      }
    } catch(e) {
      console.error(e);
      this.setState({
        showMessageBox: true,
        message: e.message,
        messageLevel: 'Error'
      });
    }
  }

  closeShowMessageBox() {
    this.setState({showMessageBox: false});
  }

  async componentDidMount() {
    try {
      fetch('/suburbs').then((res) => {
          if(!res.ok) throw new Error(res.statusText);
          return res.json();
        }).then((data) => {
          this.setState({
            suburbs: data,
          });
        }).catch((e) => {
          console.error(e);
          this.setState({
            showMessageBox: true,
            message: e.message,
            messageLevel: 'Error'
          });
        }); 
      fetch('/materials').then((res) => {
          if(!res.ok) throw new Error(res.statusText);
          return res.json();
        }).then((data) => {
          this.setState({
            materials: data,
          });
        }).catch((e) => {
          console.error(e);
          this.setState({
            showMessageBox: true,
            message: e.message,
            messageLevel: 'Error'
          });
        });
       
      const coloursRes = await fetch('/colours');
      if(!coloursRes.ok) throw new Error(coloursRes.statusText);
      
      const colours = await coloursRes.json();

      this.setState({
        colours: colours,
      });

      const res = await fetch('/data'); 
      if(res.statusText !== 'No Content'){
        const product = await res.json();
        let selectedColour = colours.find(
          colour => colour.id === Number(product.colour)
        );
        if(!selectedColour){
          selectedColour = {...this.state.selectedColour};
        }
        this.setState({
          product: product,
          selectedColour: selectedColour
        });
      }
    } catch(e) {
      console.error(e);
      this.setState({
        showMessageBox: true,
        message: e.message,
        messageLevel: 'Error'
      });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Title title="Product View" />
        <ProductBaseInfo
          product={this.state.product}
          suburbs={this.state.suburbs}
          materials={this.state.materials}
          colours={this.state.colours}
          selectedColour={this.state.selectedColour}
          formControlChanged={this.formControlChanged.bind(this)}
          colourChanged={this.colourChanged.bind(this)}
        />
        <Curtains
          curtains={this.state.product.curtains}
          curtainChanged={(e, index) => this.curtainChanged(e, index)}
          removeCurtain={(e, index) => this.removeCurtain(e, index)}
          addCurtain={this.addCurtain.bind(this)}
        />
        <ActionButton 
          saveProduct={this.saveProduct.bind(this)}
        />
        <MessageBox 
          message={this.state.message} 
          messageLevel={this.state.messageLevel}
          closeShowMessageBox={this.closeShowMessageBox.bind(this)} 
          show={this.state.showMessageBox}
        />
      </div>
    );
  }
}

const MessageBox = props => {
  return (
    <div className="alert alert-dismissible alert-warning" 
      style={props.show 
        // ? {display: 'block', position: 'fixed' , top: 70, right: 40} 
        ? {display: 'block'} 
        : {display: 'none'}}>
      <button onClick={props.closeShowMessageBox} type="button" 
        className="close" data-dismiss="alert">&times;
      </button>
      <h4 className="alert-heading">{props.messageLevel}!</h4>
      <p className="mb-0"> {props.message} </p>
    </div>
  );
};

const Title = props => {
  return (
    <div className="row mb-4 mt-2">
      <h2 className="text-left title">{props.title}</h2>
    </div>
  );
};

const ActionButton = props => {
  return (
    <div className="row">
      <div className="col-sm text-left">
        <button type="button" className="btn btn-outline-primary m-2">
          BACK
        </button>

        <button onClick={() => props.saveProduct()} type="button" 
          className="btn btn-outline-success m-2">
          SAVE ALL CHANGES
        </button> 
      </div>
    </div>
  );
};

export default ProductView;

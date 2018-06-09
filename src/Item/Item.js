import React, { Component } from "react";
import "./Item.css";

class Item extends Component {
  constructor(props) {
    super(props);

    //Get the keys from the item prop
    this.id = props.item.id;
    this.title = props.item.title;
    this.description = props.item.description;
    this.price = props.item.price;
    this.images = props.item.images;
    this.parentClickHandler = props.clickHandler;
  }

  //Send click action to parent scope
  clickHandler = () => {
    this.parentClickHandler(this.id);
  };

  //Render the DOM
  render() {
    return (
      <div className="Item" onClick={this.clickHandler}>
      <div>
        <img src={this.images[1].original} alt={this.title} />
      </div>
        <h2>{this.title}</h2>
        <span className="Price">{this.price}</span>
      </div>
    );
  }
}

export default Item;

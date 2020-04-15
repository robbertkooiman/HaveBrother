import React, { Component } from "react";
import "./DetailItem.css";

class DetailItem extends Component {
  constructor(props) {
    super(props);
    //Get the keys from the item prop
    this.id = props.item.id;
    this.title = props.item.title;
    this.description = props.item.description;
    this.price = props.item.price;
    this.images = props.item.images;
    this.parentCloseHandler = props.closeHandler;
    this.parentAddComment = props.addComment;

    this.comment = {
      author: "",
      comment: "",
      item: this.id,
      id: Math.round(Math.random() * 99999999)
    };

    this.state = {
      selectedImage: 1,
      comments: props.comments
    };
  }

  //Input handlers
  nameChange = event => {
    let value = event.target.value;
    this.comment.author = value;
  };
  
  //Comment ID generator
  getRandomId() {
    return Math.round(Math.random() * 99999999);
  }

  //Input handlers
  commentChange = event => {
    let value = event.target.value;
    this.comment.comment = value;
  };

  //Send click action to parent scope
  closeHandler = () => {
    this.parentCloseHandler(this.id);
  };

  //Handle comment
  sendComment = event => {
    event.preventDefault();
    this.comment.id = Math.round(Math.random() * 99999999);
    const state = this.state;
    state.comments.push(JSON.parse(JSON.stringify(this.comment)));
    this.setState(state);
    this.parentAddComment(this.comment);
  };

  //View an image thumbnail
  selectImage = id => {
    const state = this.state;
    state.selectedImage = id;
    this.setState(this.state);
  };

  //Render the DOM
  render() {
    const images = [];
    for (let i = 0; i < this.images.length; i++) {
      images.push(
        <img
          key={i}
          src={this.images[i].original}
          alt="Product thumbnail"
          onClick={this.selectImage.bind(this, i)}
        />
      );
    }
    let comments = [];
    if (this.state.comments.length > 0) {
      for (let i = 0; i < this.state.comments.length; i++) {
        comments.push(
          <div className="Comment" key={this.state.comments[i].id}>
            <span className="Author">{this.state.comments[i].author}</span>
            <p>{this.state.comments[i].comment}</p>
          </div>
        );
      }
    } else {
      comments = <p>There are no comments yet.</p>;
    }
    return (
      <div className="DetailItem">
        <div className="Top">
          <button onClick={this.closeHandler}>Back</button>
          <h1>{this.title}</h1>
          <button>Add to cart</button>
        </div>
        <div className="DetailContent">
          <div>
            <img
              src={this.images[this.state.selectedImage].original}
              alt={this.title}
            />
            <div className="Images">{images}</div>
          </div>
          <div>
            <span className="Price">{this.price}</span>
            <p>{this.description}</p>
            <div className="Comments">{comments}</div>
            <form onSubmit={this.sendComment}>
              <input
                type="text"
                placeholder="Name"
                onChange={this.nameChange}
              />
              <textarea placeholder="Comment" onChange={this.commentChange} />
              <input type="submit" value="Send" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailItem;

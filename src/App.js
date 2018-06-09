import React, { Component } from "react";
import "./App.css";
import DetailItem from "./DetailItem/DetailItem.js";
import Item from "./Item/Item.js";
import Logo from "./Logo/Logo.js";
import DATA from "./data.json";
import grid from "./icons/grid.svg";
import list from "./icons/list.svg";

class App extends Component {
  constructor() {
    super();
    const cachedView = getLocalStorageItem("view");
    let cachedComments = getLocalStorageItem("comments");
    if (cachedComments) {
      cachedComments = JSON.parse(cachedComments);
    }
    this.state = {
      view: cachedView ? cachedView : "List",
      search: "",
      displayData: DATA,
      comments: cachedComments
        ? cachedComments
        : [
            {
              id: 68172352,
              item: 1,
              author: "Robbert Kooiman",
              comment: "Pretty cool!"
            }
          ],
      loading: true,
      openItem: null
    };
    this.toggleView = this.toggleView.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.addComment = this.addComment.bind(this);
    this.closeItem = this.closeItem.bind(this);
    this.loadingTimeout = setTimeout(() => {
      const state = this.state;
      state.loading = false;
      this.setState(state);
    }, 500);
  }

  //Toggle the view (action for the button)
  toggleView() {
    this.setView(this.state.view === "List" ? "Grid" : "List");
  }

  //Set the view and reset the state
  setView(view) {
    const state = this.state;
    state.view = view;
    setLocalStorageItem("view", view);
    this.setState(this.state);
  }

  //Filter found items with the given search query, then set the state and start the loading animation
  searchHandler(event) {
    this.closeItem();
    let query = event.target.value.toLowerCase(),
      displayData = DATA.filter(
        item =>
          item.title.toLowerCase().indexOf(query) !== -1 ||
          item.description.toLowerCase().indexOf(query) !== -1
      );
    const state = this.state;
    state.displayData = displayData;
    this.startLoading(state);
  }

  //Select an item and open it
  clickHandler(id) {
    const state = this.state;
    state.openItem = id;
    this.startLoading(state);
  }

  //Close detail view of item
  closeItem() {
    const state = this.state;
    state.openItem = null;
    this.startLoading(state);
  }

  //Add comment to localStorage
  addComment(comment) {
    const state = this.state;
    console.log(this.state.comments);
    state.comments.push(JSON.parse(JSON.stringify(comment)));
    setLocalStorageItem("comments", JSON.stringify(this.state.comments));
    this.setState(state);
    console.log(this.state.comments);
  }

  //Reset the loading bar animation, start it after one frame and then remove it when it's done
  startLoading(state) {
    clearTimeout(this.loadingTimeout);
    state.loading = false;
    this.setState(state);
    requestAnimationFrame(() => {
      state.loading = true;
      this.setState(state);
      this.loadingTimeout = setTimeout(() => {
        state.loading = false;
        this.setState(state);
      }, 500);
    });
  }

  render() {
    //Make a component list from items in data.json
    let listItems = [];
    this.state.displayData.forEach(item => {
      listItems.push(
        <Item item={item} key={item.id} clickHandler={this.clickHandler} />
      );
    });

    const listClass = [this.state.view, "Items"];
    const appClass = ["App"];
    if (this.state.loading) {
      appClass.push("Loading");
    }
    let item = null;
    const myComments = [];
    if (this.state.openItem) {
      item = DATA.find(item => item.id === this.state.openItem);
      for (let i = 0; i < this.state.comments.length; i++) {
        if (this.state.comments[i].item === this.state.openItem) {
          myComments.push(this.state.comments[i]);
        }
      }
    }

    //Render the DOM
    return (
      <div className={appClass.join(" ")}>
        <header className="Header">
          <Logo color="white" />
          <div className="Searchbar">
            <input
              className="Search"
              type="text"
              placeholder="Find something fun!"
              onChange={this.searchHandler}
            />
            {/* <div className="Tabs"><button>Nerf guns</button></div> */}
            <button onClick={this.toggleView}>
              <div className={this.state.view === "Grid" ? "Active" : ""}>
                <img alt="Grid view" src={grid} />
              </div>
              <div className={this.state.view === "List" ? "Active" : ""}>
                <img alt="List view" src={list} />
              </div>
            </button>
          </div>
        </header>
        {this.state.openItem ? (
          <DetailItem
            item={item}
            closeHandler={this.closeItem}
            comments={myComments}
            addComment={this.addComment}
          />
        ) : (
          <div className="Content">
            <div className={listClass.join(" ")}>{listItems}</div>
          </div>
        )}
        <div className="Overlay"></div>
      </div>
    );
  }
}

//Retrieve something from local storage by key (inside a try/catch so React likes it)
const getLocalStorageItem = item => {
  try {
    const cachedItem = localStorage.getItem(item);
    return cachedItem;
  } catch (e) {
    return null;
  }
};

//Set something to local storage by key and value (inside a try/catch so React likes it)
const setLocalStorageItem = (item, value) => {
  try {
    const cachedItem = localStorage.setItem(item, value);
    return cachedItem;
  } catch (e) {
    return null;
  }
};

export default App;

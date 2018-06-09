import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import data from "./data.json";

it("has an array of data", () => {
  expect(data instanceof Array).toBe(true);
});

it("has useful data to display", () => {
  const object = data[0];
  expect(typeof object.id).toBe('number');
  expect(typeof object.title).toBe('string');
  expect(typeof object.description).toBe('string');
  expect(typeof object.price).toBe('number');
  expect(object.images instanceof Array).toBe(true);
  expect(object.none).toBe(undefined);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from "react";
import { shallow } from "enzyme";

import Header from "../components/Header";
import Main from "../components/Main";
import App from "../App";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});

afterEach(() => {
  wrapper.update();
});

describe("App", () => {
  it("should contain a div", () => {
    expect(wrapper.find("div")).toHaveLength(1);
  });
  it("Contains one Header component", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
  it("should contain one Main component", () => {
    expect(wrapper.find(Main)).toHaveLength(1);
  });
});

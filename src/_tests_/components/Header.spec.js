import React from "react";
import { shallow } from "enzyme";

import Header from "../../components/Header";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Header />);
});

afterEach(() => {
  wrapper.update();
});

describe("Header", () => {
  it("should contain a div", () => {
    expect(wrapper.find("div")).toHaveLength(1);
  });
  
});

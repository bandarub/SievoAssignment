import React from "react";
import { shallow } from "enzyme";

import Main from "../../components/Main";

let wrapper;
let state;

jest.mock("../../services/api");

beforeEach(() => {
  wrapper = shallow(<Main />);
  setTimeout(() => {
    wrapper.update();
  });
});

afterEach(() => {
  wrapper.update();
});

describe("Main", () => {
  it("fetches data from api and renders them on mount", done => {
    state = wrapper.instance().state;
    expect(state.data.length).toEqual(3);
    expect(state.status).toEqual("done");
    done();
  });

  it("Loader should run", () => {
    wrapper.setState({ status: "loading" });
    expect(wrapper.find(".loader")).toHaveLength(1);
  });

  it("Loader should not run if Loading condition is false", () => {
    wrapper.setState({ status: "done" });
    expect(wrapper.find(".loader")).toHaveLength(0);
  });

  it("should contain class appContainer", () => {
    expect(wrapper.find(".appContainer")).toHaveLength(1);
  });

  it("select option length must match", () => {
    expect(wrapper.find("option")).toHaveLength(3);
  });

  it("contains class searchBox", () => {
    expect(wrapper.find(".searchBox")).toHaveLength(1);
  });

  it("search function should called when entering the text", () => {
    const event1 = { target: { value: "cat" } };
    const searchInput = wrapper.find("input");
    searchInput.simulate("change", event1);
    expect(wrapper.state().searchValue).toBe("cat");
  });

  it("sorting function ascending is called", () => {
    const searchSelect = wrapper.find("select");
    wrapper.setState({ sortingAction: "desc" });
    searchSelect.simulate("change");
    wrapper.update();
    expect(wrapper.state().sortingAction).toBe("asc");
  });

  it("sorting function descending is called", () => {
    const searchSelect = wrapper.find("select");
    wrapper.setState({ sortingAction: "asc" });
    searchSelect.simulate("change");
    wrapper.update();
    expect(wrapper.state().sortingAction).toBe("desc");
  });

  it("sorting function by ascending is working", () => {
    state = wrapper.instance().state;
    const mockData = wrapper.state().data;
    const sortedData = mockData.sort((a, b) => a.project - b.project);
    const searchSelect = wrapper.find("select");
    searchSelect.simulate("change");
    expect(wrapper.state().data).toEqual(sortedData);
  });

  it("sorting function by descending is working", () => {
    state = wrapper.instance().state;
    const mockData = wrapper.state().data;
    const sortedData = mockData.sort((a, b) => b.project - a.project);
    wrapper.setState({ sortingAction: "desc" });
    const searchSelect = wrapper.find("select");
    searchSelect.simulate("change");
    expect(wrapper.state().data).toEqual(sortedData);
  });
});

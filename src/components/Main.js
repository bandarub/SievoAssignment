import React, { Component } from "react";
import Dateformat from "dateformat";

import ApiRrequest from "../services/api";

class Main extends Component {
  state = {
    data: [],
    sortingAction: "asc",
    searchValue: "",
    status: "loading"
  };
  componentDidMount = async () => {
    let data = await ApiRrequest();
    this.setState({ data: data, status: "done" });
  };
  handleSort = () => {
    const dataToBeSort = [...this.state.data];
    const sortingAction = this.state.sortingAction;
    if (sortingAction === "asc") {
      dataToBeSort.sort((a, b) => a.project - b.project);
      this.setState({ data: dataToBeSort, sortingAction: "desc" });
    } else {
      dataToBeSort.sort((a, b) => b.project - a.project);
      this.setState({ data: dataToBeSort, sortingAction: "asc" });
    }
  };
  handleSearch = e => {
    this.setState({ searchValue: e.target.value });
  };
  render() {
    const { data, status, searchValue } = this.state;
    let filterData = data.filter(data =>
      data.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (
      <div className="main">
        {status === "loading" ? (
          <p className="loader">Loading ...</p>
        ) : (
          <div className="appContainer">
            <div className="functionContainer">
              <select className="selectStyle" onChange={this.handleSort}>
                <option defaultValue="Sort">Sort By Id</option>
                <option value="SEL1">Ascending</option>
                <option value="SEL2">Decending</option>
              </select>
              <div className="searchBox">
                <input
                  type="text"
                  onChange={this.handleSearch}
                  title="Case sensitive description"
                  placeholder="Search Description"
                />
                {searchValue !== "" && (
                  <div>
                    Found <b>{filterData.length}</b> results
                  </div>
                )}
              </div>
            </div>
            <ul>
              {" "}
              {filterData.map(eachData => {
                return (
                  <div className="project" key={Math.random()}>
                    {Object.entries(eachData).map(([key, value]) => {
                      return (
                        <li key={Math.random()}>
                          <span className="key">{key}:</span>
                          {value === "NULL" ? (
                            <span />
                          ) : key === "start date" ? (
                            <span>{Dateformat(value, "dd/mm/yyyy")}</span>
                          ) : (
                            <span className="value">{value}</span>
                          )}
                        </li>
                      );
                    })}
                  </div>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Main;

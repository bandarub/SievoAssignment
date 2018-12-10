import fakeData from "../../mockData";

export default async term => {
    return await new Promise(resolve => {
      resolve(fakeData);
    });
  };
export default function APIRequest() {
  return fetch("https://sievo-react-assignment.azurewebsites.net/api/data")
    .then(res => res.json())
    .then(data => {
      return data;
    });
}

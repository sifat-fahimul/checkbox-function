import React, { useEffect, useState } from "react";
import "./style.css";

export default function App() {
  const [data, setData] = useState([]);

  // fetch data from jsonplaceholder
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      const tempUser = data.map((e) => {
        return { ...e, isChecked: checked };
      });
      setData(tempUser);
    } else {
      const tempUser = data.map((e) =>
        e.name === name ? { ...e, isChecked: checked } : e
      );

      setData(tempUser);
    }
  };

  // get check box data
  useEffect(() => {
    const selectedValue = data.filter((e) => e.isChecked == true);

    console.log("selectedValue", selectedValue);
  }, [data]);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <table>
        <thead>
          <th>sl</th>
          <th>
            select
            <input
              type="checkbox"
              checked={data.filter((e) => e.isChecked !== true).length < 1}
              name="allselect"
              onChange={handleCheck}
            />
          </th>
          <th> address</th>
          {/* <th>comphany </th> */}
          <th>name</th>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr key={e?.id}>
                <td>{e?.id}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={handleCheck}
                    name={e.name}
                    checked={e?.isChecked || false}
                  />
                </td>
                <td>{e.address.city}</td>
                <td>{e.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import React, { useState } from "react";

type Props = {};

function CreateAidPackageTable({}: Props) {
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Supplier</td>
          <td>Description</td>
          <td>Period</td>
          <td>Total Cost</td>
        </tr>
      </thead>
      <tbody>
        {selectedNeeds.map((need, index) => (
          <tr key={index}>
            <td>Need {index}</td>
            <td>Unit {index}</td>
            <td>Period {index}</td>
            <td>Quantity Needed {index}</td>
            <td>Remaining Needed {index}</td>
            <td>Supplier {index}</td>
            <td>Max {index}</td>
            <td>Order Quantity {index}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CreateAidPackageTable;

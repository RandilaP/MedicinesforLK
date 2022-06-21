import dayjs from "dayjs";
import React, { useState } from "react";
import { MedicalNeedInfo, Period } from "types/entities/MedicalNeedInfo";

interface Props {
  requirement: MedicalNeedInfo;
}

function RequirementRow({ requirement }: Props) {
  const [activeSupplier, setActiveSupplier] = useState(0);

  function getFormattedDate(date: Period) {
    const unformattedDate = new Date(date.year, date.month, date.day);
    return dayjs(unformattedDate).format("DD MMM YYYY");
  }

  function getFormattedCurrency(value: number) {
    const formatter = new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
    return formatter.format(value);
  }

  function getSupplierSupply(supplierIndex: number) {
    const supplier = requirement.supplierQuotes[supplierIndex];
    return supplier?.availableQuantity;
  }

  return (
    <tr>
      <td>{requirement.needID}</td>
      <td>-</td>
      <td>{getFormattedDate(requirement.period)}</td>
      <td>Not Done Yet</td>
      <td>Not Done Yet</td>
      <td>
        <select name="supplier" value={activeSupplier}>
          {requirement.supplierQuotes.map((quote, quoteIndex) => (
            <option key={quoteIndex} value={quoteIndex}>
              <div className="requirementRow-supplierField">
                <p>{quote.supplier.name}</p>
                <p>{getFormattedCurrency(quote.unitPrice)}</p>
              </div>
            </option>
          ))}
        </select>
      </td>
      <td>{getSupplierSupply(activeSupplier)}</td>
      <td>
        <input
          type="number"
          placeholder="Number of units"
          max={getSupplierSupply(activeSupplier)}
        />
      </td>
    </tr>
  );
}

export default RequirementRow;

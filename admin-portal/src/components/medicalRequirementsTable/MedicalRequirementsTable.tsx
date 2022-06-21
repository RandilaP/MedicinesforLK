import RequirementRow from "components/medicalRequirementsTable/RequirementRow";
import dayjs from "dayjs";
import { useState } from "react";
import {
  MedicalNeedInfo,
  Period,
  Supplier,
} from "types/entities/MedicalNeedInfo";
import "./medicalRequirementsTable.css";

interface Props {
  requirements?: MedicalNeedInfo[];
}

function MedicalRequirementsTable({ requirements = [] }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <td>Need</td>
          <td>Unit</td>
          <td>Period</td>
          <td>Quantity Needed</td>
          <td>Remaining Needed</td>
          <td>Supplier</td>
          <td>Max</td>
          <td>Order Quantity</td>
        </tr>
      </thead>
      <tbody>
        {requirements.length === 0 && (
          <tr>
            <td colSpan={8}>
              <p className="reqTable-empty-statement">No Data Yet</p>
            </td>
          </tr>
        )}
        {requirements.map((requirement, requirementIndex) => (
          <RequirementRow key={requirementIndex} requirement={requirement} />
        ))}
      </tbody>
    </table>
  );
}

export default MedicalRequirementsTable;

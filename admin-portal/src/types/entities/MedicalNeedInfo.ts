import { Urgency } from "types/common";

export interface MedicalNeeds {
  medicalNeedInfo: MedicalNeedInfo[];
}

export interface MedicalNeedInfo {
  needID: number;
  period: Period;
  urgency: Urgency;
  supplierQuotes: SupplierQuote[];
  beneficiary: Beneficiary;
}

interface ProcessIndividual {
  name: string;
  shortName: string;
  email: string;
  phoneNumber: string;
}

export interface Beneficiary extends ProcessIndividual {
  beneficiaryID?: number;
  supplierID?: number;
}

export interface Supplier extends ProcessIndividual {
  supplierID: number;
}

export interface Period {
  year: number;
  month: number;
  day: number;
}

export interface SupplierQuote {
  quotationID: number;
  supplierID: number;
  brandName: string;
  availableQuantity: number;
  expiryDate: Period;
  unitPrice: number;
  regulatoryInfo: string;
  supplier: Supplier;
}

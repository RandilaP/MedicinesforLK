import { useState } from "react";
import { Stepper, Step } from "components/stepper";
import { PageSelection } from "types/pages";
import { Page } from "layout/page";

import "./newAidPackage.css";
import MedicalRequirementsTable from "components/medicalRequirementsTable/MedicalRequirementsTable";
import MedicalNeedService from "services/medicalNeedService";
import { useQuery } from "react-query";
import CreateAidPackageTable from "components/createAidPackageTable/CreateAidPackageTable";

function NewAidPackage() {
  const medicalNeedService = new MedicalNeedService();
  const [currentFormStep, setCurrentFormStep] = useState(0);

  const {
    data: medicalRequirements,
    isLoading,
    isError,
  } = useQuery("medicalNeeds", () => medicalNeedService.getMedicalNeeds());

  function handleStepChange() {
    setCurrentFormStep((prevStep) => (prevStep === 0 ? 1 : 0));
  }

  return (
    <Page selection={PageSelection.PACKAGE_CREATION}>
      <main>
        <h1>Create an Aid Package</h1>
        <Stepper activeStep={currentFormStep}>
          <Step title="Assign Suppliers" />
          <Step title="Manage Aid Packages" />
        </Stepper>
        {isLoading && <p>Loading...</p>}
        {isError && <p>There was an issue when we tried to get your data...</p>}
        {!isLoading && currentFormStep === 0 && (
          <MedicalRequirementsTable requirements={medicalRequirements} />
        )}
        {!isLoading && currentFormStep === 1 && <CreateAidPackageTable />}
        <button onClick={handleStepChange}>
          {currentFormStep === 0 ? "Next" : "Previous"}
        </button>
      </main>
    </Page>
  );
}

export default NewAidPackage;

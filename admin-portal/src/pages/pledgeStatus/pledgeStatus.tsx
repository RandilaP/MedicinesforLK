import React, { useEffect, useState } from "react";
import { PageSelection } from "../../types/pages";
import { Page } from "../../layout/page";
import { AidPackage } from "../../types/AidPackage";
import { Link, useNavigate, useParams } from "react-router-dom";
import DonorTable from "./donorTable/donorTable";
import "./pledgeStatus.css";
import ContributionsChart from "../../components/contributionsChart/contributionsChart";
import { AidPackageService } from "../../apis/services/AidPackageService";
import { Pledge } from "../../types/Pledge";
import { PledgeService } from "../../apis/services/PledgeService";

export default function PledgeStatus() {
  const { packageId } = useParams<{ packageId: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAidPackage();
    fetchPledges();
  }, []);

  const fetchAidPackage = async () => {
    const { data } = await AidPackageService.getAidPackage(packageId!);
    setAidPackage(data);
  };

  const fetchPledges = async () => {
    const { data } = await AidPackageService.getPledges(packageId!);
    setPledges(data);
  };

  const handlePledgeEdit = (pledge: Pledge) => {
    navigate(`pledges/${pledge.pledgeID}`);
  };

  const handlePledgeDelete = async (pledge: Pledge) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the pledge of ${pledge.donor?.orgName}?`
    );
    if (confirmed) {
      await PledgeService.deletePledge(pledge.pledgeID);
      fetchPledges();
    }
  };
  return (
    <Page selection={PageSelection.HOME}>
      <>
        {!aidPackage && <p>Loading Aid Package...</p>}
        {aidPackage && (
          <div className="pledgeStatus">
            <div>
              <Link to="/">Aid Packages</Link> &gt;{" "}
              <Link to={`/packages/${packageId}`}>{aidPackage.name}</Link> &gt;
              Pledge Status
            </div>
            <h1 className="heading">{aidPackage.name} - Pledge Status</h1>
            <div className="contributionsSummary">
              <div>
                <ContributionsChart
                  goalAmount={aidPackage.goalAmount}
                  receivedAmount={aidPackage.receivedAmount}
                />
              </div>
              <div>
                <p>Goal: ${aidPackage.goalAmount}</p>
                <p>Received: ${aidPackage.receivedAmount}</p>
                <p>Status: {aidPackage.status}</p>
              </div>
            </div>
            <DonorTable
              pledges={pledges}
              onPledgeEdit={handlePledgeEdit}
              onPledgeDelete={handlePledgeDelete}
            />
          </div>
        )}
      </>
    </Page>
  );
}

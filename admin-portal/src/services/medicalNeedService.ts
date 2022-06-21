import { ApiUrl } from "services/urlConstants";
import HttpService from "services/httpService";
import { MedicalNeedInfo, MedicalNeeds } from "types/entities/MedicalNeedInfo";

class MedicalNeedService extends HttpService {
  async getMedicalNeeds(): Promise<MedicalNeedInfo[]> {
    const data = await this.get<MedicalNeeds>(ApiUrl.MedicalNeeds);
    return data.medicalNeedInfo;
  }
}

export default MedicalNeedService;

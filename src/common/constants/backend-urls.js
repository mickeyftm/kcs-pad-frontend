import { backendBaseUrl } from "../app-config/app-config";

const gatherUrl = "gather-api/";
const BACKENDURL = {
  // Config
  getConfig: `${backendBaseUrl}api/get-config`,
  // Gather
  createGather: `${backendBaseUrl}${gatherUrl}gather/create-gather`,
  getAllGather: `${backendBaseUrl}${gatherUrl}gather/get-all`,
};
export default BACKENDURL;

let environment = "mainnet";
environment = "local";

let notifyTG = true;

let configuration = {};
if (environment === "local") {
  notifyTG = false;
  configuration = {
    isLoggingEnabled: false,
    // apiUrl: "http://127.0.0.1:8000/",
    unsupportedNetwork: !false,
  };
} else {
  configuration = {
    isLoggingEnabled: true,
    apiUrl: " ",
    unsupportedNetwork: true,
  };
}
export const isLoggingEnabled = configuration.isLoggingEnabled;

export const backendBaseUrl = configuration.apiUrl;

export const createGatherFormData = configuration.createGatherFormData;

export const unsupportedNetworkModal = configuration.unsupportedNetwork;
export const isTGNoticationOn = notifyTG;
export const trxBatch = 1;
export const estimateGasMultiplier = 1;
export const estimateGasMultiplierStartGather = 2;
export const chadEstimateGasMultiplier = 2;
export const decimalPlaces = 6;
export const sortDecimalPlaces = 4;
export const percentDecimalPlaces = 2;
export const dashboardPageSize = 5;
export const countUpDecimals = 2;
export const countUpDuration = 5;

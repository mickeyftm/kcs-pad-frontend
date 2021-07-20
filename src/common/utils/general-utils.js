import { ethers, utils } from "ethers";
import { decimalPlaces, sortDecimalPlaces } from "../app-config/app-config";
// const converter = require("hex2dec");

// Converts big unit to small Unit => Like ETH to WEI -> 1 USDT => 1000000, returns String
export const parseCurrency = (valueString, decimal) => {
  return ethers.utils.parseUnits(valueString.toString(), decimal).toString();
};
// Converts big unit to small Unit => Like ETH to WEI -> 1 USDT => 1000000, returns BigNumber
export const parseCurrencyToBigNumber = (valueString, decimal) => {
  return ethers.utils.parseUnits(valueString.toString(), decimal);
};

// Converts small unit to big unit => Like WEI to ETH -> 1000000 => 1 USDT, returns a String
export const currencyFormatter = (value, decimal) => {
  return ethers.utils.formatUnits(
    ethers.BigNumber.from(value.toString()),
    decimal
  );
};

// export const hexToOriginalFormatConverter = (value) => {
//   return converter.hexToDec(value);
// };

export const stringify = (value) => {
  return JSON.stringify(value);
};

export const digitsToCurrencyFormatter = (value) => {
  let amount = parseFloat(value).toFixed(decimalPlaces);
  return parseFloat(amount);
};

export const formatDecimalsToSortPlaces = (number) => {
  number = parseFloat(number);
  const numArray = number.toString().split(".");
  let decimalPlaces = 0;
  if (typeof numArray[1] !== "undefined") {
    decimalPlaces = numArray[1].length;
  }
  if (decimalPlaces > sortDecimalPlaces) {
    number = number * 10000;
    number = parseInt(number);
    number = number / 10000;
    return number;
  } else {
    return number;
  }
};

export const formatDecimalPlaces = (number) => {
  return parseFloat(number).toFixed(decimalPlaces);
};
export const isAddressConvertableToIcon = (address) => {
  if (address && address.length === 42) {
    return true;
  } else {
    return false;
  }
};

export const roundOffErrorFix = (number) => {
  return parseFloat(number).toFixed(decimalPlaces);
};

export const loggingEvent = (object, prefix) => {
  if (prefix) {
    console.log(prefix, object);
  } else {
    console.log(object);
  }
};

export const validateEmail = (email) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

export const convertDecimalToHexString = (decimal) => {
  return utils.hexStripZeros(utils.hexlify(decimal));
};

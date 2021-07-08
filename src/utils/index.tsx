import { ethers } from "ethers";

export const convertToBignumber = function (number:number) {
  return ethers.BigNumber.from(number)
};

export const formatNumber = function (bignumber: ethers.BigNumber) {
  return ethers.BigNumber.from(bignumber).toNumber();
};

export const formatEther = function (amount: ethers.BigNumber) {
  return ethers.utils.formatEther(amount);
};

export const formatDate = function (time: ethers.BigNumber) {
  const timestamp = +ethers.BigNumber.from(time).toString();

  var date = new Date(timestamp * 1000);

  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  // month = (month < 10 ? "0" : "") + month;
  // day = (day < 10 ? "0" : "") + day;
  // hour = (hour < 10 ? "0" : "") + hour;
  // min = (min < 10 ? "0" : "") + min;
  // sec = (sec < 10 ? "0" : "") + sec;

  var str =
    date.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    "_" +
    hour +
    ":" +
    min +
    ":" +
    sec;

  /*alert(str);*/

  return str;
};

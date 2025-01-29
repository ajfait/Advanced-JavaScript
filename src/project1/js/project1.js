"use strict";

const calculateFederalTax = (grossPay) => {
  let federalTax = 0;

  return federalTax;
};

const calculateWisconsinTax = (grossPay) => {
  let wisconsinTax = 0;

  return wisconsinTax;
};

const calculateMedicareTax = (grossPay) => {
  const RATE_MEDICARE_LOWER = 0.0145;
  const RATE_MEDICARE_UPPER = 0.0235;
  const LIMIT_MEDICARE = 200000;

  let medicareTax = 0;

  if (grossPay > LIMIT_MEDICARE) {
    medicareTax = RATE_MEDICARE_LOWER * LIMIT_MEDICARE;
    medicareTax += RATE_MEDICARE_UPPER * (grossPay - LIMIT_MEDICARE);
  } else {
    medicareTax = RATE_MEDICARE_LOWER * grossPay;
  }

  return medicareTax;
};

const calculateSocialSecurityTax = (grossPay) => {
  const RATE_SOCIAL_SECURITY = 0.62;
  const LIMIT_SOCIAL_SECURITY = 168600;

  let socialSecurityTax = 0;

  if (grossPay > LIMIT_SOCIAL_SECURITY) {
    socialSecurityTax = RATE_SOCIAL_SECURITY * LIMIT_SOCIAL_SECURITY;
  } else {
    socialSecurityTax = RATE_SOCIAL_SECURITY * grossPay;
  }

  return socialSecurityTax;
};

const calculateTotalTax = (
  federalTax,
  wisconsinTax,
  socialSecurityTax,
  medicareTax
) => {
  let totalTax = federalTax + wisconsinTax + socialSecurityTax + medicareTax;

  return totalTax;
};

const calculateNetPay = (grossPay, totalTax) => {
  let netPay = grossPay - totalTax;

  return netPay;
};

const init = () => {
  let grossPay = document.querySelector("#salary").value;

  return grossPay;

  calculateFederalTax(grossPay);
  calculateWisconsinTax(grossPay);
  calculateSocialSecurityTax(grossPay);
  calculateMedicareTax(grossPay);
  calculateTotalTax(federalTax, wisconsinTax, socialSecurityTax, medicareTax);
  calculateNetPay(grossPay, totalTax);
};

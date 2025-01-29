const calculateFederalTax = (grossPay) => {
  let federalTax = 0;

  return federalTax;
};

const calculateWisconsinTax = (grossPay) => {
  let wisconsinTax = 0;

  return wisconsinTax;
};

const calculateMedicareTax = (grossPay) => {
  let medicareTax = 0;

  return medicareTax;
};

const calculateSocialSecurityTax = (grossPay) => {
  let socialSecurityTax = 0;

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

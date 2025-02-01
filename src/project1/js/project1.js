"use strict";

const validateInput = () => {
  let grossPayString = document.querySelector("#salary").value;

  let grossPayCleaned = grossPayString.replace(/[\$,]/g, "");

  let grossPay = parseFloat(grossPayCleaned);

  let message;

  document.querySelector("#salary").value = "";

  if (isNaN(grossPay) || grossPay < 1 || grossPay > 999999999) {
    message = "Enter a valid salary between $1 and $999,999,999.";

    document.querySelector("#message").innerHTML = message;
    document.querySelector("#message").classList.remove("invisible");
    console.log(message);
    return;
  } else {
    document.querySelector("#message").classList.add("invisible");
  }

  console.log("validateInput(): success");
  console.log(grossPay);

  displayResults(grossPay);
};

function formatUSD(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

const displayResults = (grossPay) => {
  const federalTax = calculateFederalTax(grossPay);
  const wisconsinTax = calculateWisconsinTax(grossPay);
  const medicareTax = calculateMedicareTax(grossPay);
  const socialSecurityTax = calculateSocialSecurityTax(grossPay);
  const totalTax = calculateTotalTax(
    federalTax,
    wisconsinTax,
    medicareTax,
    socialSecurityTax
  );
  const netPay = calculateNetPay(grossPay, totalTax);

  document.querySelector("#grossPay").innerHTML = formatUSD(grossPay);
  document.querySelector("#totalTax").innerHTML = formatUSD(totalTax);
  document.querySelector("#federalTax").innerHTML = formatUSD(federalTax);
  document.querySelector("#wisconsinTax").innerHTML = formatUSD(wisconsinTax);
  document.querySelector("#medicareTax").innerHTML = formatUSD(medicareTax);
  document.querySelector("#socialSecurityTax").innerHTML =
    formatUSD(socialSecurityTax);
  document.querySelector("#netPay").innerHTML = formatUSD(netPay);
};

const calculateFederalTax = (grossPay) => {
  const RATE_FEDERAL_BRACKET1 = 0.1;
  const RATE_FEDERAL_BRACKET2 = 0.12;
  const RATE_FEDERAL_BRACKET3 = 0.22;
  const RATE_FEDERAL_BRACKET4 = 0.24;
  const RATE_FEDERAL_BRACKET5 = 0.32;
  const RATE_FEDERAL_BRACKET6 = 0.35;
  const RATE_FEDERAL_BRACKET7 = 0.37;
  const LIMIT_FEDERAL_BRACKET1 = 11600;
  const LIMIT_FEDERAL_BRACKET2 = 47150;
  const LIMIT_FEDERAL_BRACKET3 = 100525;
  const LIMIT_FEDERAL_BRACKET4 = 191950;
  const LIMIT_FEDERAL_BRACKET5 = 243725;
  const LIMIT_FEDERAL_BRACKET6 = 609350;

  let federalTax = 0;

  if (grossPay > LIMIT_FEDERAL_BRACKET6) {
    federalTax += RATE_FEDERAL_BRACKET7 * (grossPay - LIMIT_FEDERAL_BRACKET6);
    grossPay = LIMIT_FEDERAL_BRACKET6;
  }

  if (grossPay > LIMIT_FEDERAL_BRACKET5) {
    federalTax += RATE_FEDERAL_BRACKET6 * (grossPay - LIMIT_FEDERAL_BRACKET5);
    grossPay = LIMIT_FEDERAL_BRACKET5;
  }

  if (grossPay > LIMIT_FEDERAL_BRACKET4) {
    federalTax += RATE_FEDERAL_BRACKET5 * (grossPay - LIMIT_FEDERAL_BRACKET4);
    grossPay = LIMIT_FEDERAL_BRACKET4;
  }

  if (grossPay > LIMIT_FEDERAL_BRACKET3) {
    federalTax += RATE_FEDERAL_BRACKET4 * (grossPay - LIMIT_FEDERAL_BRACKET3);
    grossPay = LIMIT_FEDERAL_BRACKET3;
  }

  if (grossPay > LIMIT_FEDERAL_BRACKET2) {
    federalTax += RATE_FEDERAL_BRACKET3 * (grossPay - LIMIT_FEDERAL_BRACKET2);
    grossPay = LIMIT_FEDERAL_BRACKET2;
  }

  if (grossPay > LIMIT_FEDERAL_BRACKET1) {
    federalTax += RATE_FEDERAL_BRACKET2 * (grossPay - LIMIT_FEDERAL_BRACKET1);
    grossPay = LIMIT_FEDERAL_BRACKET1;
  }

  federalTax += RATE_FEDERAL_BRACKET1 * grossPay;

  console.log(federalTax);

  return federalTax;
};

const calculateWisconsinTax = (grossPay) => {
  const RATE_WISCONSIN_BRACKET1 = 0.0354;
  const RATE_WISCONSIN_BRACKET2 = 0.0465;
  const RATE_WISCONSIN_BRACKET3 = 0.053;
  const RATE_WISCONSIN_BRACKET4 = 0.0765;
  const LIMIT_WISCONSIN_BRACKET1 = 12760;
  const LIMIT_WISCONSIN_BRACKET2 = 25520;
  const LIMIT_WISCONSIN_BRACKET3 = 280950;

  let wisconsinTax = 0;

  if (grossPay > LIMIT_WISCONSIN_BRACKET3) {
    wisconsinTax +=
      RATE_WISCONSIN_BRACKET4 * (grossPay - LIMIT_WISCONSIN_BRACKET3);
    grossPay = LIMIT_WISCONSIN_BRACKET3;
  }

  if (grossPay > LIMIT_WISCONSIN_BRACKET2) {
    wisconsinTax +=
      RATE_WISCONSIN_BRACKET3 * (grossPay - LIMIT_WISCONSIN_BRACKET2);
    grossPay = LIMIT_WISCONSIN_BRACKET2;
  }

  if (grossPay > LIMIT_WISCONSIN_BRACKET1) {
    wisconsinTax +=
      RATE_WISCONSIN_BRACKET2 * (grossPay - LIMIT_WISCONSIN_BRACKET1);
    grossPay = LIMIT_WISCONSIN_BRACKET1;
  }

  wisconsinTax += RATE_WISCONSIN_BRACKET1 * grossPay;

  console.log(wisconsinTax);

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

  console.log(medicareTax);

  return medicareTax;
};

const calculateSocialSecurityTax = (grossPay) => {
  const RATE_SOCIAL_SECURITY = 0.062;
  const LIMIT_SOCIAL_SECURITY = 168600;

  let socialSecurityTax = 0;

  if (grossPay > LIMIT_SOCIAL_SECURITY) {
    socialSecurityTax = RATE_SOCIAL_SECURITY * LIMIT_SOCIAL_SECURITY;
  } else {
    socialSecurityTax = RATE_SOCIAL_SECURITY * grossPay;
  }

  console.log(socialSecurityTax);

  return socialSecurityTax;
};

const calculateTotalTax = (
  federalTax,
  wisconsinTax,
  medicareTax,
  socialSecurityTax
) => {
  let totalTax = federalTax + wisconsinTax + medicareTax + socialSecurityTax;

  console.log(totalTax);

  return totalTax;
};

const calculateNetPay = (grossPay, totalTax) => {
  let netPay = grossPay - totalTax;

  console.log(netPay);

  return netPay;
};

const init = () => {
  document.querySelector("#calculate").addEventListener("click", validateInput);
};

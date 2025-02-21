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
    document.querySelector("#message").classList.remove("d-none");

    console.log(message);

    return;
  } else {
    document.querySelector("#message").classList.add("d-none");
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
  let federalTaxBrackets = [
    { rate: 0.1, limit: 11600 },
    { rate: 0.12, limit: 47150 },
    { rate: 0.22, limit: 100525 },
    { rate: 0.24, limit: 191950 },
    { rate: 0.32, limit: 243725 },
    { rate: 0.35, limit: 609350 },
    { rate: 0.37, limit: 609350 },
  ];
  let federalTax = 0;

  if (grossPay > federalTaxBrackets[5].limit) {
    federalTax +=
      federalTaxBrackets[6].rate * (grossPay - federalTaxBrackets[5].limit);
    grossPay = federalTaxBrackets[5].limit;
  }

  if (grossPay > federalTaxBrackets[4].limit) {
    federalTax +=
      federalTaxBrackets[5].rate * (grossPay - federalTaxBrackets[4].limit);
    grossPay = federalTaxBrackets[4].limit;
  }

  if (grossPay > federalTaxBrackets[3].limit) {
    federalTax +=
      federalTaxBrackets[4].rate * (grossPay - federalTaxBrackets[3].limit);
    grossPay = federalTaxBrackets[3].limit;
  }

  if (grossPay > federalTaxBrackets[2].limit) {
    federalTax +=
      federalTaxBrackets[3].rate * (grossPay - federalTaxBrackets[2].limit);
    grossPay = federalTaxBrackets[2].limit;
  }

  if (grossPay > federalTaxBrackets[1].limit) {
    federalTax +=
      federalTaxBrackets[2].rate * (grossPay - federalTaxBrackets[1].limit);
    grossPay = federalTaxBrackets[1].limit;
  }

  if (grossPay > federalTaxBrackets[0].limit) {
    federalTax +=
      federalTaxBrackets[1].rate * (grossPay - federalTaxBrackets[0].limit);
    grossPay = federalTaxBrackets[0].limit;
  }

  federalTax += federalTaxBrackets[0].rate * grossPay;

  console.log(federalTax);

  return federalTax;
};

const calculateWisconsinTax = (grossPay) => {
  let wisconsinTaxBrackts = [
    { rate: 0.0354, limit: 12760 },
    { rate: 0.0465, limit: 25520 },
    { rate: 0.053, limit: 280950 },
    { rate: 0.0765, limit: 280950 },
  ];
  let wisconsinTax = 0;

  if (grossPay > wisconsinTaxBrackts[2].limit) {
    wisconsinTax +=
      wisconsinTaxBrackts[3].rate * (grossPay - wisconsinTaxBrackts[2].limit);
    grossPay = wisconsinTaxBrackts[2].limit;
  }

  if (grossPay > wisconsinTaxBrackts[1].limit) {
    wisconsinTax +=
      wisconsinTaxBrackts[2].rate * (grossPay - wisconsinTaxBrackts[1].limit);
    grossPay = wisconsinTaxBrackts[1].limit;
  }

  if (grossPay > wisconsinTaxBrackts[0].limit) {
    wisconsinTax +=
      wisconsinTaxBrackts[1].rate * (grossPay - wisconsinTaxBrackts[0].limit);
    grossPay = wisconsinTaxBrackts[0].limit;
  }

  wisconsinTax += wisconsinTaxBrackts[0].rate * grossPay;

  console.log(wisconsinTax);

  return wisconsinTax;
};

const calculateMedicareTax = (grossPay) => {
  let medicareTaxBrackets = [
    { rate: 0.0145, limit: 200000 },
    { rate: 0.0235, limit: 200000 },
  ];
  let medicareTax = 0;

  if (grossPay > medicareTaxBrackets[0].limit) {
    medicareTax = medicareTaxBrackets[0].rate * medicareTaxBrackets[0].limit;
    medicareTax +=
      medicareTaxBrackets[1].rate * (grossPay - medicareTaxBrackets[1].limit);
  } else {
    medicareTax = medicareTaxBrackets[0].rate * grossPay;
  }

  console.log(medicareTax);

  return medicareTax;
};

const calculateSocialSecurityTax = (grossPay) => {
  let socialSecurityBrackets = [{ rate: 0.062 }, { limit: 168600 }];
  let socialSecurityTax = 0;

  if (grossPay > socialSecurityBrackets[0].limit) {
    socialSecurityTax =
      socialSecurityBrackets[0].rate * socialSecurityBrackets[0].limit;
  } else {
    socialSecurityTax = socialSecurityBrackets[0].rate * grossPay;
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

window.onload = init;

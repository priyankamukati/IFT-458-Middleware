
module.exports = (htmlStr, customer, amountOwed)=>{ // fat arrow function or lambda
    let output = htmlStr.replace(/{%NAME%}/g, customer.customerName);
    output = output.replace(/{%IMAGE%}/g, customer.customerImage);
    output = output.replace(/{%NUMBER%}/g, customer.phoneNumber);
    output = output.replace(/{%ADDRESS%}/g, customer.address);
    output = output.replace(/{%AMOUNT%}/g, customer.loanAmount);
    output = output.replace(/{%RATE%}/g, customer.interest);
    output = output.replace(/{%YEARS%}/g, customer.loanTermYears);
    output = output.replace(/{%TYPE%}/g, customer.loanType);
    output = output.replace(/{%DESCRIPTION%}/g, customer.description);
    output = output.replace(/{%AMOUNTOWED%}/g, amountOwed);
    return output;
}
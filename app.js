const navslide = () => {
  const navbar = document.querySelector(".nav-bar");
  const menu = document.querySelector(".nav-links");
  const burger = document.querySelector(".burger");

  burger.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  });
};
navslide();

const calculateTotalBill = () => {
  const inputFields = document.querySelectorAll(
    '.menu-items input[type="number"]:not([data-label="GST(%)"])'
  );
  let totalBill = 0;
  let gstAmount = 0;
  let gstPercentage = 0;

  inputFields.forEach((input) => {
    totalBill += parseFloat(input.value) || 0;
  });

  const gstInput = document.querySelector(
    '.menu-items input[data-label="GST(%)"]'
  );

  gstPercentage = parseFloat(gstInput.value) || 0;
  gstAmount = (totalBill * gstPercentage) / 100;

  let tip = 0;
  const finalBill = totalBill + gstAmount;
  if (finalBill > 5000) {
    tip = 500;
  } else {
    tip = 250;
  }
  let finalTotalBill = finalBill + tip;

  return {
    totalBill: totalBill.toFixed(2),
    gstAmount: gstAmount.toFixed(2),
    gstPercentage: gstPercentage,
    finalBill: finalBill.toFixed(2),
    tipAmount: tip.toFixed(2),
    finalTotalBill: finalTotalBill.toFixed(2),
  };
};

const displaycustomerDetails = () => {
  const customerDetails = document.querySelector(".customer-details");
  const inputFields = customerDetails.querySelectorAll("input");

  let customerDetailsHTML = "<h2>Customer Details</h2>";

  inputFields.forEach((input) => {
    const label = input.getAttribute("data-label");
    const value = input.value;
    customerDetailsHTML += `<p>${label}: ${value}</p>`;
  });

  const {
    totalBill,
    gstAmount,
    gstPercentage,
    finalBill,
    tipAmount,
    finalTotalBill,
  } = calculateTotalBill();

  customerDetailsHTML += `
    <h2>Order Summary</h2>
    <p>Total Bill of Food: ${totalBill}</p>
    <p>GST Amount: ${gstAmount}</p>
    <p>Final Bill is: ${finalBill} (with ${gstPercentage}% GST)</p>
    <p>Tip Amount: ${tipAmount}</p>
    <p>With a tip of ${tipAmount} Rupees, the final total bill is: ${finalTotalBill}</p>
    <h4>Note:If Bill Reaches more then 5000 pay 500 Rupees of tip if bill is lesser then 5000 pay 250  Rupees of tip </h4>
`;

  customerDetails.innerHTML = customerDetailsHTML;

  inputFields.forEach((input) => {
    input.value = ""; 
  });
};

const payment = document.querySelector(".pay-button button");
payment.addEventListener("click", (e) => {
  e.preventDefault();
  displaycustomerDetails();
});

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

const priceInput = document.getElementById("item-price");
const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const historyTable = document.querySelector("#history-table tbody");
const resetHistoryBtn = document.getElementById("reset-history-btn");

let transactionCount = 0;

purchaseBtn.addEventListener("click", () => {
  let price = Number(priceInput.value);
  let cash = Number(cashInput.value);

  if (!price || price <= 0) {
    changeDue.textContent = "⚠️ Please enter a valid item price.";
    return;
  }

  if (!cash || cash <= 0) {
    changeDue.textContent = "⚠️ Please enter a valid cash amount.";
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    let result = "✅ No change due - customer paid with exact cash";
    changeDue.textContent = result;
    logTransaction(price, cash, result);
    return;
  }

  let changeNeeded = +(cash - price).toFixed(2);
  let totalCid = +(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

  if (totalCid < changeNeeded) {
    let result = "❌ Status: INSUFFICIENT_FUNDS";
    changeDue.textContent = result;
    logTransaction(price, cash, result);
    return;
  }

  if (totalCid === changeNeeded) {
    let result = formatChange(getChange(changeNeeded, cid), "CLOSED");
    changeDue.innerHTML = result;
    logTransaction(price, cash, stripHTML(result));
    return;
  }

  let result = getChange(changeNeeded, cid);
  if (!result.success) {
    let text = "❌ Status: INSUFFICIENT_FUNDS";
    changeDue.textContent = text;
    logTransaction(price, cash, text);
  } else {
    let text = formatChange(result.change, "OPEN");
    changeDue.innerHTML = text;
    logTransaction(price, cash, stripHTML(text));
  }
});

function getChange(changeNeeded, cid) {
  let changeArr = [];
  let drawer = JSON.parse(JSON.stringify(cid)).reverse();

  for (let [unit, amount] of drawer) {
    let unitValue = currencyUnit[unit];
    let used = 0;

    while (changeNeeded >= unitValue && amount > 0) {
      changeNeeded = +(changeNeeded - unitValue).toFixed(2);
      amount = +(amount - unitValue).toFixed(2);
      used += unitValue;
    }

    if (used > 0) {
      changeArr.push([unit, used]);
    }
  }

  return {
    success: changeNeeded === 0,
    change: changeArr
  };
}

function formatChange(changeArr, status) {
  if (status === "CLOSED") {
    return `🔒 Status: CLOSED<br>` +
      changeArr.map(x => `${x[0]}: $${x[1].toFixed(2)}`).join("<br>");
  }

  return `💰 Status: OPEN<br>` +
    changeArr.map(x => `${x[0]}: $${x[1].toFixed(2)}`).join("<br>");
}

function logTransaction(price, cash, result) {
  transactionCount++;
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${transactionCount}</td>
    <td>$${price.toFixed(2)}</td>
    <td>$${cash.toFixed(2)}</td>
    <td>${result}</td>
  `;
  historyTable.appendChild(row);
}

function stripHTML(html) {
  let div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// Reset history functionality
resetHistoryBtn.addEventListener("click", () => {
  historyTable.innerHTML = "";
  transactionCount = 0;
});

function checkLogin() {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

async function loadBills() {
  const res = await fetch("bills.json");
  const data = await res.json();

  const container = document.getElementById("bills-container");
  container.innerHTML = "";

  for (let company in data) {
    const section = document.createElement("div");
    section.innerHTML = `<h2>${company.toUpperCase()}</h2>`;
    data[company].forEach(bill => {
      section.innerHTML += `
        <div class="bill">
          <b>Date:</b> ${bill.date} | <b>Bill No:</b> ${bill.billNo} | <b>Total:</b> ${bill.total} <br>
          <b>Items:</b> ${bill.items.map(i => `${i.name} x${i.qty}`).join(", ")} <br>
          <img src="${bill.photo}" width="200" />
        </div>
      `;
    });
    container.appendChild(section);
  }
}

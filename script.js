const API_URL = 'YOUR_SCRIPT_URL_HERE'; // Replace with your Google Apps Script Web App URL

async function loadData() {
  const sheet = document.getElementById('sheet').value;
  const url = `${API_URL}?sheet=${sheet}&action=get`;

  const res = await fetch(url, { method: 'POST' });
  const data = await res.json();

  const table = document.getElementById('dataTable');
  table.innerHTML = '';

  const headerRow = document.createElement('tr');
  data[0].forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  for (let i = 1; i < data.length; i++) {
    const row = document.createElement('tr');
    data[i].forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      row.appendChild(td);
    });
    table.appendChild(row);
  }
}

async function addData() {
  const sheet = document.getElementById('sheet').value;
  const row = JSON.parse(document.getElementById('jsonInput').value);

  const url = `${API_URL}?sheet=${sheet}&action=add`;

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(row),
    headers: { 'Content-Type': 'application/json' }
  });

  alert('Row added!');
  loadData();
}

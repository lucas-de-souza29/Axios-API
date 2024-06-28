const url = "https://brasilapi.com.br/api/feriados/v1/2024"

function getHolidays() {
    axios.get(url)
        .then(response => {
            const data = response.data;
            showHolidays(data);
        })
        .catch(error => console.log(error));
}

function formatShortDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

function showHolidays(data) {
    
    const renderData = document.getElementById('renderHolidays');
    renderData.innerHTML = '';

    // Table
    const table = document.createElement('table');
    table.className = 'table table-striped table-bordered';

    // Table head
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Data</th>
            <th>Nome</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // Table body
    const tbody = document.createElement('tbody');
    data.forEach(holiday => {
        const formattedDate = formatShortDate(holiday.date);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${holiday.name}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    renderData.appendChild(table);
}

document.addEventListener('DOMContentLoaded', getHolidays);
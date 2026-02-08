function getData() {
    let data = localStorage.getItem("complaints");   // get data from localStorage
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

function saveData(data) {
    localStorage.setItem("complaints", JSON.stringify(data));       // save data to localStorage
}

function createId() {    
    let count = localStorage.getItem("count");    // generate complaint id
    if (!count) {
        count = 1;
    }

    let id = "CMP" + count;
    localStorage.setItem("count", parseInt(count) + 1);

    return id;
}

// USER SIDE

let form = document.getElementById("complaintForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let subject = document.getElementById("subject").value;
        let description = document.getElementById("description").value;

        if (name === "" || email === "" || subject === "" || description === "") {
            alert("Please fill all fields");
            return;
        }

        let complaints = getData();

        let newComplaint = {
            id: createId(),
            name: name,
            email: email,
            subject: subject,
            description: description,
            status: "Pending"
        };

        complaints.push(newComplaint);
        saveData(complaints);

        document.getElementById("message").innerText =
            "Complaint Submitted! Your ID is " + newComplaint.id;

        form.reset();
    });
}

// ADMIN SIDE

function loadComplaints() {
    let table = document.getElementById("complaintList");
    if (!table) return;

    let complaints = getData();
    table.innerHTML = "";

    for (let i = 0; i < complaints.length; i++) {

        let row = `
            <tr>
                <td>${complaints[i].id}</td>
                <td>${complaints[i].name}</td>
                <td>${complaints[i].subject}</td>
                <td>
                    <select onchange="changeStatus(${i}, this.value)">
                        <option value="Pending" ${complaints[i].status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Resolved" ${complaints[i].status === "Resolved" ? "selected" : ""}>Resolved</option>
                        <option value="Rejected" ${complaints[i].status === "Rejected" ? "selected" : ""}>Rejected</option>
                    </select>
                </td>
                <td>
                    <button onclick="deleteComplaint(${i})">Delete</button>
                </td>
            </tr>
        `;

        table.innerHTML += row;
    }
}

function changeStatus(index, newStatus) {
    let complaints = getData();
    complaints[index].status = newStatus;
    saveData(complaints);
    loadComplaints();
}

function deleteComplaint(index) {
    let complaints = getData();
    complaints.splice(index, 1);
    saveData(complaints);
    loadComplaints();
}

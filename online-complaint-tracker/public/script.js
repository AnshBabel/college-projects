// ================= USER PAGE =================

const form = document.getElementById("complaintForm");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const description = document.getElementById("description").value;

        const response = await fetch("/complaints", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, subject, description })
        });

        const data = await response.json();

        document.getElementById("message").innerText =
            "Complaint submitted successfully! Your ID is: " + data.id;

        form.reset();
    });
}


// ================= ADMIN PAGE =================

async function loadComplaints() {
    const response = await fetch("/complaints");
    const complaints = await response.json();

    const table = document.getElementById("complaintList");
    table.innerHTML = "";

    complaints.forEach(c => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.subject}</td>
            <td>${c.status}</td>
            <td>
                <button onclick="updateStatus(${c.id}, 'resolved')">Resolve</button>
                <button onclick="updateStatus(${c.id}, 'rejected')">Reject</button>
                <button onclick="deleteComplaint(${c.id})">Delete</button>
            </td>
        `;

        table.appendChild(row);
    });
}

async function updateStatus(id, status) {
    await fetch("/complaints/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    });

    loadComplaints();
}

async function deleteComplaint(id) {
    await fetch("/complaints/" + id, {
        method: "DELETE"
    });

    loadComplaints();
}

async function loadComplaints() {
    const res = await fetch("/complaints");
    const data = await res.json();

    const list = document.getElementById("complaintList");
    list.innerHTML = "";

    data.forEach(c => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.subject}</td>
            <td>
                <span class="status-tag ${c.status}">
                    ${c.status.toUpperCase()}
                </span>
            </td>
            <td class="actions">
                ${renderButtons(c)}
            </td>
        `;

        list.appendChild(tr);
    });
}

function renderButtons(c) {
    if (c.status === "pending") {
        return `
            <button class="btn-action resolve" onclick="updateStatus(${c.id}, 'resolved')">✅ Resolve</button>
            <button class="btn-action reject" onclick="updateStatus(${c.id}, 'rejected')">❌ Reject</button>
            <button class="btn-action delete" onclick="deleteComplaint(${c.id})">🗑 Delete</button>
        `;
    }

    return `
        <button class="btn-action disabled">—</button>
        <button class="btn-action disabled">—</button>
        <button class="btn-action delete" onclick="deleteComplaint(${c.id})">🗑 Delete</button>
    `;
}

async function updateStatus(id, status) {
    const res = await fetch(`/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    });

    if (!res.ok) {
        const err = await res.json();
        alert(err.message);
    }

    loadComplaints();
}

async function deleteComplaint(id) {
    await fetch(`/complaints/${id}`, { method: "DELETE" });
    loadComplaints();
}

/* USER FORM */
const form = document.getElementById("complaintForm");
if (form) {
    form.addEventListener("submit", async e => {
        e.preventDefault();

        const data = {
            name: name.value,
            email: email.value,
            subject: subject.value,
            description: description.value
        };

        await fetch("/complaints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        form.reset();
        message.textContent = "Complaint submitted successfully";
    });
}

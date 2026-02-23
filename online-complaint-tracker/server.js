const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let complaints = [];
let currentId = 1;


app.get("/complaints", (req, res) => {
    res.json(complaints);
});


app.post("/complaints", (req, res) => {
    const { name, email, subject, description } = req.body;

    const newComplaint = {
        id: currentId++,
        name,
        email,
        subject,
        description,
        status: "pending"
    };

    complaints.push(newComplaint);
    res.status(201).json(newComplaint);
});


app.put("/complaints/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const complaint = complaints.find(c => c.id === id);
    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }

    
    if (complaint.status !== "pending") {
        return res.status(400).json({
            message: "Status cannot be changed once resolved or rejected"
        });
    }

    if (!["resolved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    complaint.status = status;
    res.json(complaint);
});


app.delete("/complaints/:id", (req, res) => {
    const id = parseInt(req.params.id);
    complaints = complaints.filter(c => c.id !== id);
    res.json({ message: "Complaint deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

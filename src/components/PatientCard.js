import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/patients/";

export default function PatientCard({ patients, setPatients }) {
  const [form, setForm] = useState({
    email: "",
    full_name: "",
    date_of_birth: "",
    gender: "M",
    blood_type: "",
    phone_number: "",
    address: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    allergies: "",
    chronic_conditions: "",
    insurance_provider: "",
    insurance_number: "",
  });

  const handleAdd = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: form.email,
          full_name: form.full_name,
          role: "patient",
        },
        date_of_birth: form.date_of_birth,
        gender: form.gender,
        blood_type: form.blood_type,
        phone_number: form.phone_number,
        address: form.address,
        emergency_contact_name: form.emergency_contact_name,
        emergency_contact_phone: form.emergency_contact_phone,
        allergies: form.allergies,
        chronic_conditions: form.chronic_conditions,
        insurance_provider: form.insurance_provider,
        insurance_number: form.insurance_number,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients([...patients, data]);
        setForm({
          email: "",
          full_name: "",
          date_of_birth: "",
          gender: "M",
          blood_type: "",
          phone_number: "",
          address: "",
          emergency_contact_name: "",
          emergency_contact_phone: "",
          allergies: "",
          chronic_conditions: "",
          insurance_provider: "",
          insurance_number: "",
        });
      })
      .catch((err) => console.log("Add error:", err));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setPatients(patients.filter((p) => p.id !== id));
      })
      .catch((err) => console.log("Delete error:", err));
  };

  return (
    <div className="section">
      <h2>👤 Patients</h2>

      <div className="form">
        <input placeholder="Full Name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <input placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input type="date"
          value={form.date_of_birth}
          onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
        />

        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <input placeholder="Blood Type"
          value={form.blood_type}
          onChange={(e) => setForm({ ...form, blood_type: e.target.value })}
        />

        <input placeholder="Phone Number"
          value={form.phone_number}
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
        />

        <input placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input placeholder="Emergency Contact Name"
          value={form.emergency_contact_name}
          onChange={(e) => setForm({ ...form, emergency_contact_name: e.target.value })}
        />

        <input placeholder="Emergency Contact Phone"
          value={form.emergency_contact_phone}
          onChange={(e) => setForm({ ...form, emergency_contact_phone: e.target.value })}
        />

        <input placeholder="Allergies"
          value={form.allergies}
          onChange={(e) => setForm({ ...form, allergies: e.target.value })}
        />

        <input placeholder="Chronic Conditions"
          value={form.chronic_conditions}
          onChange={(e) => setForm({ ...form, chronic_conditions: e.target.value })}
        />

        <input placeholder="Insurance Provider"
          value={form.insurance_provider}
          onChange={(e) => setForm({ ...form, insurance_provider: e.target.value })}
        />

        <input placeholder="Insurance Number"
          value={form.insurance_number}
          onChange={(e) => setForm({ ...form, insurance_number: e.target.value })}
        />

        <button onClick={handleAdd} className="btn">
          ➕ Add Patient
        </button>
      </div>

      <div className="list">
        {patients.map((p) => (
          <div className="card" key={p.id}>
            <h3>{p.user?.full_name || "No Name"}</h3>
            <p> {p.user?.email}</p>
            <p> {p.phone_number}</p>
            <p> Blood: {p.blood_type}</p>
            <p> Age: {p.age}</p>

            <button onClick={() => handleDelete(p.id)} className="delete">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

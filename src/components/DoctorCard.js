import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/doctors/";

export default function DoctorCard({ doctors, setDoctors }) {
  const [form, setForm] = useState({
    full_name: "",
    specialization: "GEN",
    license_number: "",
    years_of_experience: "",
    consultation_fee: "",
  });

  // ADD DOCTOR
  const addDoctor = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          full_name: form.full_name,
          email: `${form.full_name}@hospital.com`,
          role: "doctor",
        },
        specialization: form.specialization,
        license_number: form.license_number,
        years_of_experience: form.years_of_experience,
        consultation_fee: form.consultation_fee,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDoctors([...doctors, data]);

        setForm({
          full_name: "",
          specialization: "GEN",
          license_number: "",
          years_of_experience: "",
          consultation_fee: "",
        });
      });
  };

  // DELETE DOCTOR
  const deleteDoctor = (id) => {
    fetch(`${API_URL}${id}/`, { method: "DELETE" }).then(() => {
      setDoctors(doctors.filter((d) => d.id !== id));
    });
  };

  return (
    <div className="section">
      <h2>🩺 Doctors</h2>

      <div className="form">
        <input
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <select
          value={form.specialization}
          onChange={(e) =>
            setForm({ ...form, specialization: e.target.value })
          }
        >
          <option value="GEN">General Medicine</option>
          <option value="CAR">Cardiology</option>
          <option value="DER">Dermatology</option>
          <option value="NEU">Neurology</option>
          <option value="PED">Pediatrics</option>
        </select>

        <input
          placeholder="License Number"
          value={form.license_number}
          onChange={(e) =>
            setForm({ ...form, license_number: e.target.value })
          }
        />

        <input
          placeholder="Experience (years)"
          value={form.years_of_experience}
          onChange={(e) =>
            setForm({ ...form, years_of_experience: e.target.value })
          }
        />

        <input
          placeholder="Fee"
          value={form.consultation_fee}
          onChange={(e) =>
            setForm({ ...form, consultation_fee: e.target.value })
          }
        />

        <button onClick={addDoctor} className="btn">
          ➕ Add Doctor
        </button>
      </div>

      <div className="list">
        {doctors.map((d) => (
          <div className="card" key={d.id}>
            <h3>Dr. {d.user?.full_name}</h3>

            <p> Specialization: {d.specialization}</p>
            <p> Fee: {d.consultation_fee}</p>
            <p> License: {d.license_number}</p>
            <p> Experience: {d.years_of_experience} years</p>

            <button className="delete" onClick={() => deleteDoctor(d.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

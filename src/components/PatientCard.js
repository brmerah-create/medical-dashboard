import { useState } from "react";

export default function PatientCard({ patients, setPatients }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    region: "",
    phone: "",
    age: "",
    blood: "",
    problem: "",
  });

  const handleAdd = () => {
    const newPatient = { ...form, id: Date.now() };
    setPatients([...patients, newPatient]);
  };

  const handleDelete = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  const handleChange = (id, field, value) => {
    setPatients(
      patients.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div>
      <h2>👤 Patients</h2>

      
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ))}
      <button onClick={handleAdd}>Add Patient</button>

      
      {patients.map((p) => (
        <div className="card" key={p.id}>
          <input
            value={p.first_name}
            onChange={(e) => handleChange(p.id, "first_name", e.target.value)}
          />
          <input
            value={p.last_name}
            onChange={(e) => handleChange(p.id, "last_name", e.target.value)}
          />
          <input
            value={p.region}
            onChange={(e) => handleChange(p.id, "region", e.target.value)}
          />
          <input
            value={p.phone}
            onChange={(e) => handleChange(p.id, "phone", e.target.value)}
          />
          <input
            value={p.age}
            onChange={(e) => handleChange(p.id, "age", e.target.value)}
          />
          <input
            value={p.blood}
            onChange={(e) => handleChange(p.id, "blood", e.target.value)}
          />
          <input
            value={p.problem}
            onChange={(e) => handleChange(p.id, "problem", e.target.value)}
          />

          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

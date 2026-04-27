import { useState } from "react";

export default function DoctorSection({ doctors, setDoctors }) {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    fee: "",
  });

  const addDoctor = () => {
    if (!form.name) return;

    setDoctors([...doctors, { ...form, id: Date.now() }]);

    setForm({ name: "", specialization: "", fee: "" });
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter((d) => d.id !== id));
  };

  return (
    <div>
      <h2>🩺 Doctors</h2>

      <div className="form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Specialization"
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
        />

        <input
          placeholder="Fee"
          value={form.fee}
          onChange={(e) => setForm({ ...form, fee: e.target.value })}
        />

        <button className="btn btn-add" onClick={addDoctor}>
          Add
        </button>
      </div>

      {/* LIST */}
      {doctors.map((d) => (
        <div className="card-vertical" key={d.id}>
          <div className="card-title"> {d.name}</div>

          <div className="card-item">
            Specialization:{d.specialization}
          </div>
          <div className="card-item"> {d.fee} DZD</div>

          <button className="btn btn-delete" onClick={() => deleteDoctor(d.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

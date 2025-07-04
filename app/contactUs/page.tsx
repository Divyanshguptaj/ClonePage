"use client";
import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    time: "",
    consent: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    )
      newErrors.email = "Invalid email.";
    if (!formData.message.trim()) newErrors.message = "This field is required.";
    if (!formData.time.trim()) newErrors.time = "Preferred time is required.";
    if (!formData.consent) newErrors.consent = "Consent is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Form Data Submitted:", formData);
    alert("Form submitted!");
  };

  return (
    <div className="min-h-screen bg-[#e7edeb] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white border border-[#1b4c42] rounded-lg shadow-md p-6 font-serif">
        <h2 className="text-center text-2xl font-semibold text-[#1b4c42] mb-1">
          Get In Touch
        </h2>
        <p className="text-center text-sm text-[#1b4c42] mb-5 leading-relaxed">
          Simply fill out the brief fields below and Dr. Norman will be in touch with you soon, usually within one business day. This form is safe, private, and completely free.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-[#1b4c42] mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              placeholder="Name"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-[#1b4c42] mb-1">Phone</label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              placeholder="Phone"
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-[#1b4c42] mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* What brings you here */}
          <div>
            <label className="block text-sm text-[#1b4c42] mb-1">What brings you here?</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              placeholder="How can I help you?"
            />
            {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
          </div>

          {/* Preferred Time */}
          <div>
            <label className="block text-sm text-[#1b4c42] mb-1">
              Preferred time to reach you
            </label>
            <input
              name="time"
              type="text"
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              placeholder="e.g., Mornings, Afternoons"
            />
            {errors.time && <p className="text-sm text-red-600">{errors.time}</p>}
          </div>

          {/* Consent */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1"
            />
            <label className="text-sm text-[#1b4c42]">
              I agree to be contacted
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-red-600">{errors.consent}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#1b4c42] text-white py-2 rounded-md hover:bg-[#163f38] transition"
          >
            Submit
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-xs text-[#1b4c42] mt-4 flex items-start gap-1">
          <span>ⓘ</span> By clicking submit you consent to receive texts and emails from Dr. Marcia T. Norman
        </p>
      </div>
    </div>
  );
}

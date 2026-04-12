"use client";

import React, { useState, useRef } from "react";
import { Calendar, ChevronDown, MapPin, Eye, EyeOff, Mail, Phone, Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import FormField from "@/components/FormField";

type VerifyMethod = "email" | "phone";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select a gender"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const baseInput: React.CSSProperties = {
  flex: 1, background: "transparent", border: "none", outline: "none",
  fontSize: 16, fontFamily: "'Switzer', sans-serif",
};

function FieldRow({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div style={{
      height: 44, display: "flex", alignItems: "center",
      borderBottomWidth: 1, borderBottomStyle: "solid",
      borderBottomColor: error ? "#d93025" : "#d9d9d9",
      paddingTop: 10, paddingBottom: 10,
      transition: "border-color 0.15s ease",
    }}>
      {children}
    </div>
  );
}

export default function PersonalAccountForm() {
  const router = useRouter();
  const dobRef = useRef<HTMLInputElement>(null);

  const [verifyMethod, setVerifyMethod] = useState<VerifyMethod>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [form, setForm] = useState<FormData>({
    fullName: "", dob: "", gender: "", state: "", city: "",
    email: "", phone: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const set = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
    };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();

          setForm((f) => ({
            ...f,
            city: data.city || data.locality || "",
            state: data.principalSubdivision || "",
          }));
          setErrors((e) => ({ ...e, city: undefined, state: undefined }));
        } catch {
          setLocationError("Failed to fetch location details");
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        setLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location permission denied");
        } else {
          setLocationError("Unable to retrieve your location");
        }
      }
    );
  };

  const handleSubmit = () => {
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v?.[0]])) as FormErrors);
      return;
    }
    setErrors({});
    router.push("/get-started");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>

      {/* Full Name */}
      <FormField label="FULL NAME" error={errors.fullName}>
        <FieldRow error={errors.fullName}>
          <input
            type="text"
            placeholder="Your full name"
            value={form.fullName}
            onChange={set("fullName")}
            style={{ ...baseInput, color: form.fullName ? "#000" : "#a09898" }}
          />
        </FieldRow>
      </FormField>

      {/* DOB */}
      <FormField label="DATE OF BIRTH" error={errors.dob}>
        <FieldRow error={errors.dob}>
          <input
            ref={dobRef}
            type="text"
            placeholder="dd/mm/yyyy"
            value={form.dob}
            onChange={set("dob")}
            onFocus={(e) => { e.target.type = "date"; }}
            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
            style={{ ...baseInput, flex: 1, color: form.dob ? "#000" : "#a09898" }}
          />
          <button
            type="button"
            onClick={() => {
              const input = dobRef.current;
              if (!input) return;
              input.type = "date";
              input.focus();
              input.showPicker?.();
            }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
          >
            <Calendar size={20} color="#a09898" />
          </button>
        </FieldRow>
      </FormField>

      {/* Gender */}
      <FormField label="GENDER" error={errors.gender}>
        <FieldRow error={errors.gender}>
          <select
            value={form.gender}
            onChange={set("gender")}
            style={{ ...baseInput, appearance: "none", color: form.gender ? "#000" : "#a09898" }}
          >
            <option value="" disabled hidden>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not">Prefer not to say</option>
          </select>
          <ChevronDown size={20} color="#a09898" style={{ flexShrink: 0 }} />
        </FieldRow>
      </FormField>

      {/* Location */}
      <FormField label="LOCATION" error={errors.state || errors.city}>
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ flex: 1, height: 44, display: "flex", alignItems: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: errors.state ? "#d93025" : "#d9d9d9" }}>
              <input
                type="text"
                placeholder="State"
                value={form.state}
                onChange={set("state")}
                style={{ ...baseInput, color: form.state ? "#000" : "#a09898" }}
              />
            </div>
            <div style={{ flex: 1, height: 44, display: "flex", alignItems: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: errors.city ? "#d93025" : "#d9d9d9" }}>
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={set("city")}
                style={{ ...baseInput, color: form.city ? "#000" : "#a09898" }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleCurrentLocation}
            disabled={locating}
            style={{
              display: "flex", gap: 8, alignItems: "center",
              background: "none", border: "none",
              cursor: locating ? "not-allowed" : "pointer",
              padding: 0, alignSelf: "flex-start",
              opacity: locating ? 0.6 : 1,
            }}
          >
            <MapPin size={20} color="#0052b4" />
            <span style={{ fontSize: 16, fontWeight: 500, color: "#0052b4" }}>
              {locating ? "Fetching location..." : "Use My Current Location"}
            </span>
          </button>
          {locationError && (
            <span style={{ color: "#d93025", fontSize: 13 }}>{locationError}</span>
          )}
        </div>
      </FormField>

      {/* Email */}
      <FormField label="EMAIL ADDRESS" error={errors.email}>
        <FieldRow error={errors.email}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={set("email")}
            style={{ ...baseInput, color: form.email ? "#000" : "#a09898" }}
          />
        </FieldRow>
      </FormField>

      {/* Phone */}
      <FormField label="PHONE NUMBER" error={errors.phone}>
        <FieldRow error={errors.phone}>
          <button
            type="button"
            style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", flexShrink: 0, paddingRight: 8 }}
          >
            <div style={{ position: "relative", width: 30, height: 20 }}>
              <Image src="/images/flag.png" alt="BD" fill sizes="30px" className="object-cover rounded-sm" />
            </div>
            <span style={{ color: "#5e5757", fontSize: 16 }}>+880</span>
            <ChevronDown size={16} color="#5e5757" />
          </button>
          <div style={{ width: 1, height: 20, backgroundColor: "#d9d9d9", flexShrink: 0 }} />
          <input
            type="tel"
            placeholder="Enter your number"
            value={form.phone}
            onChange={set("phone")}
            style={{ ...baseInput, marginLeft: 12, color: form.phone ? "#000" : "#a09898" }}
          />
        </FieldRow>
      </FormField>

      {/* Password */}
      <FormField label="PASSWORD" error={errors.password}>
        <FieldRow error={errors.password}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={form.password}
            onChange={set("password")}
            style={{ ...baseInput, color: form.password ? "#000" : "#a09898" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0 }}
          >
            {showPassword ? <EyeOff size={20} color="#a09898" /> : <Eye size={20} color="#a09898" />}
          </button>
        </FieldRow>
      </FormField>

      {/* Confirm Password */}
      <FormField label="CONFIRM PASSWORD" error={errors.confirmPassword}>
        <FieldRow error={errors.confirmPassword}>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={set("confirmPassword")}
            style={{ ...baseInput, color: form.confirmPassword ? "#000" : "#a09898" }}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0 }}
          >
            {showConfirm ? <EyeOff size={20} color="#a09898" /> : <Eye size={20} color="#a09898" />}
          </button>
        </FieldRow>
      </FormField>

      {/* Verify With */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>VERIFY WITH</p>
        <div style={{ display: "flex", gap: 20 }}>
          {(["email", "phone"] as VerifyMethod[]).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setVerifyMethod(method)}
              style={{
                flex: 1, display: "flex", gap: 8, alignItems: "center", justifyContent: "center",
                paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10,
                borderRadius: 8, borderWidth: 1, borderStyle: "solid",
                borderColor: verifyMethod === method ? "#025fc9" : "#d9d9d9",
                backgroundColor: verifyMethod === method ? "rgba(2,95,201,0.05)" : "transparent",
                cursor: "pointer",
              }}
            >
              {method === "email"
                ? <Mail size={20} color={verifyMethod === method ? "#025fc9" : "#5e5757"} />
                : <Phone size={20} color={verifyMethod === method ? "#025fc9" : "#5e5757"} />}
              <span style={{ fontSize: 16, fontWeight: 500, color: verifyMethod === method ? "#025fc9" : "#5e5757", letterSpacing: "0.16px" }}>
                {method === "email" ? "Email OTP" : "Phone OTP"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Terms */}
      <p style={{ fontSize: 12, color: "#333", margin: 0 }}>
        By signing in, you agree to our{" "}
        <button type="button" style={{ fontSize: 12, color: "#025fc9", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Terms</button>
        {" "}and{" "}
        <button type="button" style={{ fontSize: 12, color: "#025fc9", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Privacy Policy</button>
      </p>

      {/* Continue */}
      <button
        type="button"
        onClick={handleSubmit}
        style={{ width: "100%", height: 48, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, borderRadius: 8, border: "none", cursor: "pointer" }}
      >
        Continue
      </button>

      {/* Merge banner */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(2,95,201,0.05)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(2,95,201,0.2)", borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10 }}>
        <Info size={16} color="#025fc9" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: 12, color: "#025fc9", letterSpacing: "0.12px", margin: 0, lineHeight: "16px" }}>
          Already have an account with another email?{" "}
          <button
            type="button"
            onClick={() => router.push("/merge")}
            style={{ fontSize: 12, fontWeight: 600, color: "#025fc9", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            Merge accounts
          </button>
        </p>
      </div>

      {/* Back */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          onClick={() => router.back()}
          style={{ fontSize: 16, color: "#5e5757", background: "none", border: "none", cursor: "pointer" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
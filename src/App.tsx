import { useEffect, useState, useRef } from "react";
import supabase from "./supabaseClient";
import type { FormState } from "./types";
import { checkExisting, uploadAndRegister } from "./services/registration";
import { getPending, clearPending, savePending } from "./lib/indexedDB";
import "./styles/theme.css";
import "./styles/RegistrationForm.css";

import RegistrationStatus from "./components/RegistrationStatus";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [registration, setRegistration] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [autoSubmitting, setAutoSubmitting] = useState(false);
  const [checked, setChecked] = useState(false);

  const autoSubmitRef = useRef(false);

  useEffect(() => {
    const init = async () => {
      // alert("INIT START");

      try {
        // alert("Getting session...");
        const {
          data: { session },
        } = await supabase.auth.getSession();
        // alert("Session fetched");

        if (session?.user?.id) {
          // alert("User ID exists: " + session.user.id);
          setUserId(session.user.id);

          // alert("Checking existing registration...");
          const existing = await checkExisting(session.user.id);
          // alert("Existing check done");

          if (existing) {
            // alert("Registration exists");
            setRegistration(existing);
            setChecked(true);
            return;
          }
        } else {
          // alert("No session found");
        }

        // alert("Getting pending...");
        const pending = await getPending();
        // alert("Pending fetched: " + JSON.stringify(pending));

        if (pending && !autoSubmitRef.current) {
          // alert("Auto submit starting");
          autoSubmitRef.current = true;
          setAutoSubmitting(true);

          try {
            // alert("Calling uploadAndRegister...");
            const result = await uploadAndRegister(
              {
                name: pending.name,
                rollNo: pending.rollNo,
                registrationNo: pending.registrationNo,
                department: pending.department,
                phone: pending.phone,
                idCard: pending.imageFile || null,
              },
              session?.user?.id || "",
              pending.imageFile,
            );

            // alert("Upload finished");
            setRegistration(result);

            if (pending.id) {
              // alert("Clearing pending...");
              await clearPending(pending.id);
              // alert("Pending cleared");
            }
          } catch (err: any) {
            // alert("Auto-submit failed: " + err?.message);
            console.error(err);
          } finally {
            // alert("Auto-submit finally block");
            setAutoSubmitting(false);
            setChecked(true);
          }
        } else {
          // alert("No pending OR already auto submitted");
          setChecked(true);
        }
      } catch (err: any) {
        // alert("INIT CRASHED: " + err?.message);
        console.error(err);
        setChecked(true);
        setAutoSubmitting(false);
      }

      // alert("INIT END");
    };

    init();
  }, []);

  const handleSubmit = async (form: FormState) => {
    if (!userId) {
      await savePending({
        name: form.name,
        rollNo: form.rollNo,
        registrationNo: form.registrationNo,
        department: form.department,
        phone: form.phone,
        imageFile: form.idCard || undefined,
      });

      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      return;
    }

    setLoading(true);
    try {
      const result = await uploadAndRegister(form, userId);
      setRegistration(result);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   setUserId(null);
  //   setRegistration(null);
  //   setChecked(false);
  // };

  if (!checked || autoSubmitting) {
    return (
      <div className="form-page">
        <div className="tribal-overlay"></div>
        <div
          className="form-container"
          style={{ textAlign: "center", padding: "100px 40px" }}
        >
          <div className="registration-info">
            <div
              className="emoji"
              style={{ animation: "bounce 1.5s infinite" }}
            >
              ◈
            </div>
            <h2 className="form-title">Honoring our Roots</h2>
            <p className="form-subtitle">
              Preparing your Thinai 2K26 experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="tribal-overlay"></div>
      {registration ? (
        <RegistrationStatus registration={registration} />
      ) : (
        <RegistrationForm onSubmit={handleSubmit} loading={loading} />
      )}
    </div>
  );
}

export default App;

import { useEffect, useState, useRef } from "react";
import supabase from "./supabaseClient";
import type { FormState } from "./types";
import { checkExisting, uploadAndRegister } from "./services/registration";
import { getPending, clearPending, savePending } from "./lib/indexedDB";

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
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user?.id) {
        setUserId(session.user.id);

        const existing = await checkExisting(session.user.id);
        if (existing) {
          setRegistration(existing);
          setChecked(true);
          return;
        }
      }

      const pending = await getPending();
      if (pending && !autoSubmitRef.current) {
        autoSubmitRef.current = true;
        setAutoSubmitting(true);

        try {
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
          setRegistration(result);

          if (pending.id) await clearPending(pending.id);
        } catch (err) {
          console.error("Auto-submit failed:", err);
        } finally {
          setAutoSubmitting(false);
          setChecked(true);
        }
      } else {
        setChecked(true);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user?.id) {
        setUserId(session.user.id);

        const existing = await checkExisting(session.user.id);
        if (existing) setRegistration(existing);
      }
    });

    return () => subscription.unsubscribe();
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
    return <p style={{ textAlign: "center", marginTop: 50 }}>Loading...</p>;
  }

  if (registration) {
    return <RegistrationStatus registration={registration} />;
  }

  return <RegistrationForm onSubmit={handleSubmit} loading={loading} />;
}

export default App;

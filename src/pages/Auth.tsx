import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { login } from "../store/store";

type Mode = "login" | "register" | "forgot" | "otp";

export default function Auth({ initial = "login" }: { initial?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "login") {
        dispatch(login({ name: email.split("@")[0] || "Friend", email }));
        navigate("/dashboard");
      } else if (mode === "register") {
        setMode("otp");
      } else if (mode === "otp") {
        dispatch(login({ name: name || "Friend", email }));
        navigate("/dashboard");
      } else {
        alert("Reset link sent to your email.");
        setMode("login");
      }
    }, 800);
  };

  return (
    <div className="pt-28 pb-16 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center w-full">
        {/* Visual */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block">
          <div className="relative rounded-3xl overflow-hidden p-12 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 text-white aspect-[4/5]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
            <div className="relative h-full flex flex-col">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur grid place-items-center font-display font-bold text-xl">N</div>
                <h2 className="font-display text-4xl font-extrabold mt-6 leading-tight">Welcome to the future of shopping.</h2>
                <p className="mt-4 text-white/85">Curated tech, premium service, and a community that loves great products.</p>
              </div>
              <div className="mt-auto grid grid-cols-3 gap-3 text-center">
                {[
                  { n: "10k+", l: "Products" },
                  { n: "50k+", l: "Customers" },
                  { n: "4.9★", l: "Rating" },
                ].map(s => (
                  <div key={s.l} className="bg-white/10 backdrop-blur rounded-xl py-4">
                    <div className="font-display font-bold text-2xl">{s.n}</div>
                    <div className="text-xs opacity-90">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="surface rounded-3xl p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="font-display text-3xl font-bold">
                {mode === "login" && "Welcome back"}
                {mode === "register" && "Create account"}
                {mode === "forgot" && "Forgot password"}
                {mode === "otp" && "Verify email"}
              </h1>
              <p className="text-muted text-sm mt-1">
                {mode === "login" && "Sign in to continue your shopping journey."}
                {mode === "register" && "Join Nexora — it takes less than a minute."}
                {mode === "forgot" && "We'll email you a link to reset your password."}
                {mode === "otp" && `We sent a 4-digit code to ${email || "your email"}.`}
              </p>

              <form onSubmit={submit} className="mt-6 space-y-4">
                {mode === "register" && (
                  <Field icon={<FiUser />} type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
                )}
                {(mode === "login" || mode === "register" || mode === "forgot") && (
                  <Field icon={<FiMail />} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
                )}
                {(mode === "login" || mode === "register") && (
                  <Field icon={<FiLock />} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                )}
                {mode === "otp" && (
                  <div className="flex gap-3 justify-center">
                    {otp.map((v, i) => (
                      <input
                        key={i}
                        value={v}
                        onChange={e => {
                          const arr = [...otp]; arr[i] = e.target.value.slice(-1); setOtp(arr);
                          if (e.target.value && i < 3) (document.getElementById(`otp-${i + 1}`) as HTMLInputElement)?.focus();
                        }}
                        id={`otp-${i}`}
                        inputMode="numeric"
                        maxLength={1}
                        className="w-14 h-16 text-center text-2xl font-bold rounded-xl surface-2 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                      />
                    ))}
                  </div>
                )}

                {mode === "login" && (
                  <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center gap-2 text-muted">
                      <input type="checkbox" className="accent-[var(--color-brand-500)]" /> Remember me
                    </label>
                    <button type="button" onClick={() => setMode("forgot")} className="text-brand-500 hover:underline">Forgot?</button>
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  {loading ? "Please wait..." : (
                    <>
                      {mode === "login" && "Sign in"}
                      {mode === "register" && "Create account"}
                      {mode === "forgot" && "Send reset link"}
                      {mode === "otp" && "Verify & continue"}
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center text-sm text-muted mt-6">
                {mode === "login" && <>Don't have an account? <button onClick={() => setMode("register")} className="text-brand-500 font-semibold hover:underline">Sign up</button></>}
                {mode === "register" && <>Already have an account? <button onClick={() => setMode("login")} className="text-brand-500 font-semibold hover:underline">Sign in</button></>}
                {mode === "forgot" && <button onClick={() => setMode("login")} className="text-brand-500 font-semibold hover:underline">← Back to sign in</button>}
                {mode === "otp" && <>Didn't receive code? <button className="text-brand-500 font-semibold hover:underline">Resend</button></>}
              </div>

              {(mode === "login" || mode === "register") && (
                <>
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-[var(--border)]" />
                    <span className="text-xs text-muted">OR</span>
                    <div className="flex-1 h-px bg-[var(--border)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="btn-ghost py-2.5 rounded-xl text-sm font-semibold">Google</button>
                    <button className="btn-ghost py-2.5 rounded-xl text-sm font-semibold">Apple</button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ icon, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">{icon}</span>
      <input {...rest} className="w-full pl-11 pr-4 py-3 rounded-xl surface-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50" />
    </div>
  );
}

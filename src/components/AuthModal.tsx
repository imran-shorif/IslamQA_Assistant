import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { translations, Language } from "../data/translations";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialMode?: "login" | "signup" | "forgot";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  initialMode = "login",
}) => {
  const { loginWithEmail, signUpWithEmail, loginWithGoogle, resetPassword } = useAuth();
  const t = translations[language] || translations.bn;

  const [mode, setMode] = useState<"login" | "signup" | "forgot">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  if (!isOpen) return null;

  const getFriendlyError = (err: any): string => {
    const code = err?.code || "";
    if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
      if (language === "ar") return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
      if (language === "ur") return "ای میل یا پاس ورڈ غلط ہے۔";
      if (language === "en") return "Invalid email or password.";
      return "ভুল ইমেইল অথবা পাসওয়ার্ড।";
    }
    if (code === "auth/user-not-found") {
      if (language === "ar") return "لم يتم العثور على حساب بهذا البريد.";
      if (language === "ur") return "اس ای میل سے کوئی اکاؤنٹ نہیں ملا۔";
      if (language === "en") return "No account found with this email.";
      return "এই ইমেইলে কোনো একাউন্ট পাওয়া যায়নি।";
    }
    if (code === "auth/email-already-in-use") {
      if (language === "ar") return "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.";
      if (language === "ur") return "یہ ای میل پہلے سے موجود ہے۔ لاگ ان کریں۔";
      if (language === "en") return "An account with this email already exists. Please log in.";
      return "এই ইমেইল দিয়ে ইতিমধ্যেই একটি একাউন্ট খোলা আছে। অনুগ্রহ করে লগইন করুন।";
    }
    if (code === "auth/weak-password") {
      if (language === "ar") return "يجب أن تتكون كلمة المرور من ٦ أحرف على الأقل.";
      if (language === "ur") return "پاس ورڈ کم از کم ۶ حروف کا ہونا چاہیے۔";
      if (language === "en") return "Password should be at least 6 characters.";
      return "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।";
    }
    if (code === "auth/invalid-email") {
      if (language === "ar") return "يرجى إدخال عنوان بريد إلكتروني صحيح.";
      if (language === "ur") return "برائے مہربانی درست ای میل درج کریں۔";
      if (language === "en") return "Please enter a valid email address.";
      return "অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস লিখুন।";
    }
    if (code === "auth/popup-closed-by-user") {
      if (language === "ar") return "تم إغلاق نافذة تسجيل الدخول.";
      if (language === "ur") return "گوگل سائن ان منسوخ کر دیا گیا۔";
      if (language === "en") return "Google sign-in popup was cancelled.";
      return "গুগল সাইন-ইন উইন্ডো বন্ধ করা হয়েছে।";
    }
    if (code === "auth/operation-not-allowed") {
      if (language === "ar") return "طريقة تسجيل الدخول غير مفعلة.";
      if (language === "ur") return "سائن ان کا طریقہ فعال نہیں ہے۔";
      if (language === "en") return "Email/password provider is not enabled.";
      return "ইমেইল/পাসওয়ার্ড সাইন-ইন সার্ভিসটি ফায়ারবেসে একটিভ করতে হবে।";
    }
    if (language === "ar") return err?.message || "حدث خطأ أثناء المعالجة. يرجى المحاولة لاحقاً.";
    if (language === "ur") return err?.message || "کوئی مسئلہ پیش آیا۔ دوبارہ کوشش کریں۔";
    if (language === "en") return err?.message || "An error occurred. Please try again.";
    return err?.message || "একটি ত্রুটি ঘটেছে। পুনরায় চেষ্টা করুন।";
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setResetSuccess(false);

    if (!email.trim()) {
      const emptyEmailMsg =
        language === "ar"
          ? "يرجى إدخال البريد الإلكتروني."
          : language === "ur"
          ? "برائے مہربانی ای میل درج کریں۔"
          : language === "en"
          ? "Please enter your email."
          : "অনুগ্রহ করে ইমেইল লিখুন।";
      setErrorMsg(emptyEmailMsg);
      return;
    }

    if (mode !== "forgot" && !password) {
      const emptyPassMsg =
        language === "ar"
          ? "يرجى إدخال كلمة المرور."
          : language === "ur"
          ? "برائے مہربانی پاس ورڈ درج کریں۔"
          : language === "en"
          ? "Please enter your password."
          : "অনুগ্রহ করে পাসওয়ার্ড লিখুন।";
      setErrorMsg(emptyPassMsg);
      return;
    }

    if (mode === "signup" && password.length < 6) {
      const weakPassMsg =
        language === "ar"
          ? "يجب أن تكون كلمة المرور ٦ أحرف على الأقل."
          : language === "ur"
          ? "پاس ورڈ کم از کم ۶ حروف کا ہونا چاہیے۔"
          : language === "en"
          ? "Password must be at least 6 characters."
          : "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।";
      setErrorMsg(weakPassMsg);
      return;
    }

    setIsLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
        onClose();
      } else if (mode === "signup") {
        await signUpWithEmail(email, password, displayName);
        onClose();
      } else if (mode === "forgot") {
        await resetPassword(email);
        setResetSuccess(true);
      }
    } catch (err: any) {
      setErrorMsg(getFriendlyError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setErrorMsg(getFriendlyError(err));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all">
        {/* Top header banner */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800/80 bg-linear-to-r from-emerald-50/50 via-teal-50/30 to-transparent dark:from-emerald-950/20 dark:via-slate-900 dark:to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white leading-tight">
                  {mode === "forgot"
                    ? language === "ar"
                      ? "استعادة الحساب"
                      : language === "ur"
                      ? "پاس ورڈ بحالی"
                      : language === "en"
                      ? "Account Recovery"
                      : "পাসওয়ার্ড রিকভারি"
                    : t.authModalTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {mode === "forgot"
                    ? language === "ar"
                      ? "أدخل بريدك الإلكتروني لاستلام رابط إعادة التعيين"
                      : language === "ur"
                      ? "پاس ورڈ ری سیٹ کے لیے اپنا ای میل درج کریں"
                      : language === "en"
                      ? "Reset password via email recovery link"
                      : "ইমেইল এড্রেস দিয়ে পাসওয়ার্ড রিসেট করুন"
                    : t.authModalSubtitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher Tabs (Login / Sign Up) */}
          {mode !== "forgot" && (
            <div className="flex mt-4 p-1 bg-slate-100 dark:bg-slate-800/70 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg(null);
                }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  mode === "login"
                    ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t.authSignIn}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrorMsg(null);
                }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  mode === "signup"
                    ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t.authSignUp}
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Reset Email Sent Confirmation */}
          {resetSuccess && (
            <div className="mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">{t.authResetEmailSentTitle}</p>
                <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  {t.authResetEmailSentDesc}
                </p>
                <p className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                  {email}
                </p>
              </div>
            </div>
          )}

          {/* Direct Google Sign In (for login/signup modes) */}
          {mode !== "forgot" && (
            <div className="space-y-4 mb-5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-750 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium shadow-xs hover:shadow transition-all disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>{t.authContinueWithGoogle}</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
                <span className="bg-white dark:bg-slate-900 px-3 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium absolute">
                  {t.authOrEmail}
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            {/* Display Name field (Only on signup) */}
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.authNameLabel}
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t.authNamePlaceholder}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.authEmailLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.authEmailPlaceholder}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Field (Not in forgot mode) */}
            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.authPasswordLabel} <span className="text-red-500">*</span>
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode("forgot");
                        setErrorMsg(null);
                        setResetSuccess(false);
                      }}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                    >
                      {t.authForgotPassBtn}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.authPasswordPlaceholder}
                    className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {mode === "forgot"
                      ? language === "ar"
                        ? "جاري إرسال رابط الاستعادة..."
                        : language === "ur"
                        ? "بحالی کا لنک بھیجا جا رہا ہے..."
                        : language === "en"
                        ? "Sending reset email..."
                        : "রিকভারি ইমেইল পাঠানো হচ্ছে..."
                      : language === "ar"
                      ? "جاري المعالجة..."
                      : language === "ur"
                      ? "کارروائی جاری ہے..."
                      : language === "en"
                      ? "Processing..."
                      : "প্রসেস হচ্ছে..."}
                  </span>
                </>
              ) : mode === "login" ? (
                <span>{t.authSignIn}</span>
              ) : mode === "signup" ? (
                <span>{t.authSignUp}</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>{t.authSendResetBtn}</span>
                </>
              )}
            </button>
          </form>

          {/* Footer toggle options */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            {mode === "login" && (
              <p>
                {t.authNoAccountYet}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg(null);
                  }}
                  className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {t.authSignUp}
                </button>
              </p>
            )}

            {mode === "signup" && (
              <p>
                {t.authAlreadyHaveAccount}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg(null);
                  }}
                  className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {t.authSignIn}
                </button>
              </p>
            )}

            {mode === "forgot" && (
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg(null);
                  setResetSuccess(false);
                }}
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5"
              >
                <span>{t.authBackToLogin}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

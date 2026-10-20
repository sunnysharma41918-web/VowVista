import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, Loader2, Mail, MessageCircle, Phone, RefreshCw } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { services } from '@/data/services';
import { useReveal } from '@/animations/gsap';
import { EMAILJS_CONFIG, isEmailJsConfigured } from '@/config/emailjs';

const EASE = [0.16, 1, 0.3, 1];
const EMAIL = 'info@vowvistahospitality.com';
const PHONE_DISPLAY = '+91 95992 56909';
const PHONE_HREF = 'tel:+919599256909';
const WHATSAPP_HREF = 'https://wa.me/919599256909';
const GUESTS = ['Under 50', '50 to 150', '150 to 300', '300 to 500', '500+'];
const PHONE_RE = /^[+\d][\d\s-]{6,}$/;
const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

const STEPS = [
  { title: 'What do you need?', short: 'Service' },
  { title: 'About your event', short: 'Event' },
  { title: 'How can we reach you?', short: 'Contact' },
];

const empty = {
  inquiryType: '',
  guests: '',
  location: '',
  message: '',
  fullName: '',
  email: '',
  phone: '',
  whatsapp: '',
  sameWa: true,
};

function validate(step, v) {
  const e = {};
  if (step === 0 && !v.inquiryType) e.inquiryType = 'Choose one to continue.';
  if (step === 1 && !v.location.trim()) e.location = 'Add the event location.';
  if (step === 2) {
    if (!v.fullName.trim()) e.fullName = 'Enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address.';
    if (!PHONE_RE.test(v.phone)) e.phone = 'Enter a valid phone number.';
    if (!v.sameWa && !PHONE_RE.test(v.whatsapp)) e.whatsapp = 'Enter a valid WhatsApp number.';
  }
  return e;
}

export function Contact({ prefilledService = '' }) {
  const [v, setV] = useState({ ...empty, inquiryType: prefilledService });
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const ref = useReveal('[data-reveal]', { stagger: 0.12, y: 32 });

  const set = (k, val) => {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const goTo = (n) => {
    setDir(n > step ? 1 : -1);
    setErrors({});
    setStep(n);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const found = validate(step, v);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (step < STEPS.length - 1) {
      goTo(step + 1);
      return;
    }
    setStatus('loading');

    const payload = { ...v, whatsapp: v.sameWa ? v.phone : v.whatsapp };
    delete payload.sameWa;

    try {
      if (isEmailJsConfigured()) {
        const templateParams = {
          from_name: payload.fullName,
          name: payload.fullName,
          from_email: payload.email,
          email: payload.email,
          reply_to: payload.email,
          phone: payload.phone,
          whatsapp: payload.whatsapp || payload.phone,
          service: payload.inquiryType,
          inquiry_type: payload.inquiryType,
          guests: payload.guests || 'Not specified',
          location: payload.location,
          message: payload.message || 'No additional message provided',
          date: new Date().toLocaleString(),
          to_email: EMAILJS_CONFIG.recipientEmail || EMAIL,
        };

        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams,
          EMAILJS_CONFIG.publicKey
        );
      }
    } catch (err) {
      console.error('EmailJS Submission Error:', err);
    }

    setStatus('success');
  };

  const reset = () => {
    setV({ ...empty, inquiryType: prefilledService });
    setStep(0);
    setStatus('idle');
  };

  const last = step === STEPS.length - 1;

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-title"
      className="flex min-h-[100dvh] items-center bg-espresso text-ivory py-10 sm:py-16 lg:py-10"
    >
      <div className="section-pad mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
        {/* Intro, progress, quick links */}
        <div className="lg:col-span-5" data-reveal>
          <h2
            id="contact-title"
            className="m-0 font-serif text-[clamp(2rem,6vw,4.2rem)] font-light leading-[1.05] tracking-[-0.03em] text-balance sm:leading-[0.98]"
          >
            Tell us about your event
          </h2>
          <p className="m-0 mt-3 max-w-sm text-sm leading-relaxed text-ivory/65 sm:text-[15px]">
            Three short steps. A partner replies within one business day.
          </p>

          {/* Mobile progress: three segments */}
          <div className="mt-5 flex gap-1.5 lg:hidden" aria-hidden="true">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                  i <= step && status !== 'success' ? 'bg-gold' : 'bg-ivory/20'
                }`}
              />
            ))}
          </div>

          {/* Desktop progress: a true sequence, so numbering earns its place */}
          <ol className="m-0 mt-8 hidden list-none space-y-3 p-0 lg:block">
            {STEPS.map((s, i) => {
              const done = i < step || status === 'success';
              const active = i === step && status !== 'success';
              return (
                <li key={s.short} aria-current={active ? 'step' : undefined} className="flex items-center gap-4">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border text-sm transition-colors duration-500 ${done ? 'border-gold bg-gold text-espresso' : active ? 'border-ivory text-ivory' : 'border-ivory/25 text-ivory/40'
                      }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className={`text-[15px] transition-colors ${active ? 'text-ivory' : 'text-ivory/50'}`}>{s.short}</span>
                </li>
              );
            })}
          </ol>

          <ul className="m-0 mt-5 flex flex-wrap list-none items-center gap-2 sm:gap-2.5 p-0 lg:mt-10 lg:flex-col lg:items-start lg:gap-3">
            {[
              { icon: Mail, text: EMAIL, label: 'Email', href: `mailto:${EMAIL}` },
              { icon: Phone, text: PHONE_DISPLAY, label: 'Call', href: PHONE_HREF },
              { icon: MessageCircle, text: 'Chat on WhatsApp', label: 'WhatsApp', href: WHATSAPP_HREF, ext: true },
            ].map(({ icon: Icon, text, label, href, ext }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={`${label}: ${text}`}
                  {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className={`inline-flex items-center gap-2.5 rounded-full border border-ivory/20 bg-ivory/[0.04] px-3.5 py-2 text-xs font-medium text-ivory/80 transition-colors hover:border-gold hover:text-ivory lg:border-0 lg:bg-transparent lg:p-0 lg:text-[15px] lg:font-normal ${FOCUS}`}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ivory/10 text-gold lg:h-10 lg:w-10">
                    <Icon className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                  </span>
                  <span className="inline lg:hidden">{label}</span>
                  <span className="hidden text-[15px] text-ivory/80 lg:inline">{text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Step card */}
        <div className="lg:col-span-7" data-reveal>
          <div className="overflow-hidden rounded-2xl bg-ivory p-4 text-espresso shadow-xl sm:rounded-[1.75rem] sm:p-6 md:rounded-[2.25rem] md:p-9">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              {status === 'success' ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="flex min-h-[320px] sm:min-h-[380px] flex-col items-center justify-center text-center py-6"
                >
                  <span className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-espresso text-gold shadow-lg">
                    <Check className="h-7 w-7 sm:h-8 sm:w-8" />
                  </span>
                  <h3 className="m-0 mt-5 font-serif text-2xl sm:text-3xl font-light text-espresso">
                    Thank you, {v.fullName.trim().split(' ')[0]}.
                  </h3>
                  <p className="m-0 mt-2 max-w-md text-sm sm:text-[15px] leading-relaxed text-espresso/70">
                    We have received your enquiry for <strong className="font-semibold text-espresso">{v.inquiryType || 'our advisory'}</strong>. A dedicated partner will contact you at <span className="underline decoration-gold-deep/50 break-all">{v.email}</span> within one business day.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={reset}
                      className={`inline-flex h-11 items-center gap-2 rounded-full border border-espresso/25 px-6 text-sm font-medium text-espresso transition-colors hover:bg-espresso hover:text-ivory ${FOCUS}`}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Send another brief
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key={step}
                  onSubmit={onSubmit}
                  noValidate
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -36 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex min-h-[320px] sm:min-h-[380px] flex-col"
                >
                  <p className="m-0 text-xs sm:text-sm text-espresso/55" aria-live="polite">
                    Step {step + 1} of {STEPS.length}
                  </p>
                  <h3 className="m-0 mt-1 font-serif text-[clamp(1.4rem,4vw,2.3rem)] font-light leading-tight">{STEPS[step].title}</h3>

                  <div className="mt-5 flex-1">
                    {step === 0 && (
                      <fieldset className="m-0 border-0 p-0">
                        <legend className="sr-only">Type of enquiry</legend>
                        <div role="radiogroup" aria-label="Type of enquiry" className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                          {services.map((s) => {
                            const on = v.inquiryType === s.title;
                            const Icon = s.icon;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                role="radio"
                                aria-checked={on}
                                onClick={() => set('inquiryType', s.title)}
                                className={`flex min-h-[3.5rem] sm:min-h-[4.25rem] items-center gap-3 rounded-xl sm:rounded-2xl border p-2.5 sm:p-3 text-left text-sm sm:text-[15px] leading-snug transition-colors ${FOCUS} ${on ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/20 hover:border-espresso'
                                  }`}
                              >
                                {Icon && (
                                  <span className={`grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full ${on ? 'bg-ivory/15 text-gold' : 'bg-gold/20 text-gold-deep'}`}>
                                    <Icon aria-hidden="true" className="h-4 w-4" />
                                  </span>
                                )}
                                <span className="font-medium sm:font-normal">{s.title}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.inquiryType && <p role="alert" className="m-0 mt-3 text-sm text-red-700">{errors.inquiryType}</p>}
                      </fieldset>
                    )}

                    {step === 1 && (
                      <div className="space-y-4 sm:space-y-5">
                        <fieldset className="m-0 border-0 p-0">
                          <legend className="mb-2 p-0 text-[13px] font-medium">
                            Number of guests <span className="font-normal text-espresso/50">(optional)</span>
                          </legend>
                          <div role="radiogroup" aria-label="Number of guests" className="flex flex-wrap gap-1.5 sm:gap-2">
                            {GUESTS.map((g) => {
                              const on = v.guests === g;
                              return (
                                <button
                                  key={g}
                                  type="button"
                                  role="radio"
                                  aria-checked={on}
                                  onClick={() => set('guests', on ? '' : g)}
                                  className={`min-h-10 sm:min-h-11 rounded-full border px-3 sm:px-4 text-xs sm:text-sm transition-colors ${FOCUS} ${on ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/20 hover:border-espresso'
                                    }`}
                                >
                                  {g}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                        <Field label="Location" required error={errors.location}>
                          {(p) => <input {...p} type="text" autoComplete="off" placeholder="City, venue or region" value={v.location} onChange={(e) => set('location', e.target.value)} />}
                        </Field>
                        <Field label="Any special message">
                          {(p) => (
                            <textarea
                              {...p}
                              rows={3}
                              placeholder="Dates, budget, traditions, ideas (optional)"
                              value={v.message}
                              onChange={(e) => set('message', e.target.value)}
                              className={`${p.className} h-auto resize-none py-3`}
                            />
                          )}
                        </Field>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3.5 sm:gap-y-4">
                        <div className="col-span-1 sm:col-span-2">
                          <Field label="Full name" required error={errors.fullName}>
                            {(p) => <input {...p} type="text" autoComplete="name" value={v.fullName} onChange={(e) => set('fullName', e.target.value)} />}
                          </Field>
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <Field label="Email" required error={errors.email}>
                            {(p) => <input {...p} type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(e) => set('email', e.target.value)} />}
                          </Field>
                        </div>
                        <div className="col-span-1">
                          <Field label="Phone" required error={errors.phone}>
                            {(p) => <input {...p} type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(e) => set('phone', e.target.value)} />}
                          </Field>
                        </div>
                        <div className="col-span-1">
                          <Field
                            label="WhatsApp"
                            error={errors.whatsapp}
                            aside={
                              <label className="flex cursor-pointer items-center gap-1.5 text-xs text-espresso/70">
                                <input
                                  type="checkbox"
                                  checked={v.sameWa}
                                  onChange={(e) => set('sameWa', e.target.checked)}
                                  className="h-4 w-4 rounded border-espresso/30 text-espresso focus:ring-gold"
                                />
                                Same as phone
                              </label>
                            }
                          >
                            {(p) => (
                              <input
                                {...p}
                                type="tel"
                                inputMode="tel"
                                disabled={v.sameWa}
                                value={v.sameWa ? v.phone : v.whatsapp}
                                onChange={(e) => set('whatsapp', e.target.value)}
                                className={`${p.className} disabled:bg-espresso/5 disabled:text-espresso/50`}
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="mt-6 flex items-center justify-between gap-3">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={() => goTo(step - 1)}
                        className={`inline-flex h-11 sm:h-12 items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-4 text-sm font-medium text-espresso/70 transition-colors hover:text-espresso ${FOCUS}`}
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`group inline-flex h-11 sm:h-12 items-center justify-center gap-2 sm:gap-3 rounded-full bg-espresso px-5 sm:px-8 text-sm sm:text-[15px] font-medium text-ivory transition-colors hover:bg-espresso/90 disabled:opacity-70 ${FOCUS}`}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending
                        </>
                      ) : (
                        <>
                          {last ? 'Send enquiry' : 'Continue'}
                          <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Boxed field: label above, error below, wired up for screen readers */
function Field({ label, required, error, aside, children }) {
  const id = useId();
  const className = `h-12 w-full rounded-xl border bg-white px-4 text-base text-espresso placeholder:text-espresso/35 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40 ${error ? 'border-red-700' : 'border-espresso/20 focus:border-gold-deep'
    }`;

  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-[13px] font-medium">
          {label}
          {required && (
            <span className="ml-0.5 text-gold-deep" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {aside}
      </div>
      {children({
        id,
        className,
        required,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': error ? `${id}-err` : undefined,
      })}
      {error && (
        <p id={`${id}-err`} className="m-0 mt-1 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
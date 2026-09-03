import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { toast } from "sonner";

import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import {
  CONTACT_RECAPTCHA_ACTION,
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  type ContactFormFields,
} from "../lib/contact";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";

const FIELD_VALIDATORS: Record<
  keyof ContactFormFields,
  (value: string) => boolean
> = {
  name: isValidContactName,
  email: isValidContactEmail,
  message: isValidContactMessage,
};

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formRef = useRef<HTMLFormElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const hasAttemptedSubmit = useRef(false);
  const [form, setForm] = useState<ContactFormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const el = messageRef.current;
    if (!el) return;

    el.style.overflowY = "hidden";
    el.style.height = "auto";

    const nextHeight = el.scrollHeight;
    const maxHeight = Number.parseFloat(getComputedStyle(el).maxHeight);

    if (Number.isFinite(maxHeight) && nextHeight >= maxHeight) {
      el.style.height = `${maxHeight}px`;
      el.style.overflowY = "auto";
      return;
    }

    el.style.height = `${nextHeight}px`;
  }, [form.message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as keyof ContactFormFields;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));

    if (!hasAttemptedSubmit.current) return;

    const isInvalid = !FIELD_VALIDATORS[field](value);
    setFieldErrors((prev) =>
      prev[field] === isInvalid ? prev : { ...prev, [field]: isInvalid },
    );
  };

  const validateForm = () => {
    hasAttemptedSubmit.current = true;

    const nextErrors = {
      name: !isValidContactName(form.name),
      email: !isValidContactEmail(form.email),
      message: !isValidContactMessage(form.message),
    };

    setFieldErrors(nextErrors);

    return !nextErrors.name && !nextErrors.email && !nextErrors.message;
  };

  const sendViaMailto = () => {
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:keerti.yadav.23cse@bmu.edu.in?subject=${subject}&body=${body}`;
    toast.success("Opening your email client to send message to keerti.yadav.23cse@bmu.edu.in");
    setForm({
      name: "",
      email: "",
      message: "",
    });
    setFieldErrors({
      name: false,
      email: false,
      message: false,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (executeRecaptcha) {
        const recaptchaToken = await executeRecaptcha(CONTACT_RECAPTCHA_ACTION);

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
            recaptchaToken,
          }),
        });

        if (response.ok) {
          toast.success("Thanks for contacting me. Your message has been sent!");
          setForm({
            name: "",
            email: "",
            message: "",
          });
          setFieldErrors({
            name: false,
            email: false,
            message: false,
          });
          return;
        }
      }

      // 2. Direct email delivery via Web3Forms API
      const web3Key = import.meta.env.VITE_WEB3FORMS_KEY || "9e7934c4-53f7-4176-a457-88804b1dbadc";
      if (web3Key) {
        try {
          const web3Response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: web3Key,
              name: form.name,
              email: form.email,
              message: form.message,
              subject: `New Portfolio Message from ${form.name}`,
            }),
          });

          const web3Data = (await web3Response.json().catch(() => null)) as {
            success?: boolean;
            message?: string;
          } | null;

          if (web3Response.ok && web3Data?.success) {
            toast.success("Thanks for contacting me! Your message has been sent to keerti.yadav.23cse@bmu.edu.in.");
            setForm({
              name: "",
              email: "",
              message: "",
            });
            setFieldErrors({
              name: false,
              email: false,
              message: false,
            });
            return;
          }
        } catch (err) {
          console.warn("[WEB3FORMS_FAILED]:", err);
        }
      }

      // 3. Fallback to FormSubmit service
      try {
        const fsResponse = await fetch("https://formsubmit.co/ajax/keerti.yadav.23cse@bmu.edu.in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
            _subject: `New Portfolio Message from ${form.name}`,
          }),
        });

        const fsData = (await fsResponse.json().catch(() => null)) as {
          success?: string;
          message?: string;
        } | null;

        if (fsResponse.ok || fsData?.success === "true") {
          toast.success("Thanks for contacting me! Your message has been sent to keerti.yadav.23cse@bmu.edu.in.");
          setForm({
            name: "",
            email: "",
            message: "",
          });
          setFieldErrors({
            name: false,
            email: false,
            message: false,
          });
          return;
        }
      } catch (err) {
        console.warn("[FORMSUBMIT_FAILED]:", err);
      }

      // 4. Final Fallback to mailto
      sendViaMailto();
    } catch (error) {
      console.warn("[CONTACT_FALLBACK_TO_MAILTO]: ", error);
      sendViaMailto();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-12 flex flex-col gap-8"
    >
      <label htmlFor="name" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Name*</span>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          title="What's your name?"
          maxLength={200}
          disabled={loading}
          aria-disabled={loading}
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-hidden border-none font-medium disabled:bg-tertiary/20 disabled:text-white/60"
        />

        <span
          className={`text-red-400 mt-2 ${fieldErrors.name ? "" : "hidden"}`}
          id="name-error"
        >
          Invalid Name!
        </span>
      </label>

      <label htmlFor="email" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Email*</span>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          placeholder="johndoe@email.com"
          title="What's your email?"
          maxLength={100}
          disabled={loading}
          aria-disabled={loading}
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-hidden border-none font-medium disabled:bg-tertiary/20 disabled:text-white/60"
        />

        <span
          className={`text-red-400 mt-2 ${fieldErrors.email ? "" : "hidden"}`}
          id="email-error"
        >
          Invalid E-mail!
        </span>
      </label>

      <label htmlFor="message" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Message*</span>
        <textarea
          ref={messageRef}
          rows={7}
          name="message"
          id="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Hello there!"
          title="What do you want to say?"
          maxLength={500}
          disabled={loading}
          aria-disabled={loading}
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-hidden border-none font-medium resize-none overflow-hidden max-h-96 disabled:bg-tertiary/20 disabled:text-white/60"
        />

        <span
          className={`text-red-400 mt-2 ${fieldErrors.message ? "" : "hidden"}`}
          id="message-error"
        >
          Invalid Message!
        </span>
      </label>

      <button
        type="submit"
        title={loading ? "Sending..." : "Send"}
        className="bg-tertiary py-3 px-8 outline-hidden w-fit text-white font-bold shadow-md shadow-primary rounded-xl disabled:bg-tertiary/20 disabled:text-white/60"
        disabled={loading}
        aria-disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
      <p className="mt-3 text-xs text-secondary/70">
        This site is protected by reCAPTCHA.
      </p>
    </form>
  );
};

export const Contact = () => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  return (
    <SectionWrapper idName="contact">
      <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <div className="mt-4 flex flex-col gap-2 text-secondary text-[15px]">
            <p>
              📧 <span className="font-semibold text-white">Email:</span>{" "}
              <a href="mailto:keerti.yadav.23cse@bmu.edu.in" className="hover:text-white underline">
                keerti.yadav.23cse@bmu.edu.in
              </a>
            </p>
            <p>
              📞 <span className="font-semibold text-white">Phone:</span> +91 9352870763
            </p>
            <p>
              🎓 <span className="font-semibold text-white">Institution:</span> BML Munjal University (B.Tech CSE 2023–2027)
            </p>
            <p>
              📄 <span className="font-semibold text-white">Resume:</span>{" "}
              <a href="/keerti_cv.pdf" target="_blank" rel="noreferrer noopener" className="text-[#915eff] underline font-bold">
                Download Keerti's CV (PDF)
              </a>
            </p>
          </div>

          {siteKey ? (
            <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
              <ContactForm />
            </GoogleReCaptchaProvider>
          ) : (
            <div className="mt-8">
              <ContactForm />
            </div>
          )}
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-137.5 h-87.5"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

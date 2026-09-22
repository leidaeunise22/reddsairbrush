import { useId, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Mail, Send, TriangleAlert } from "lucide-react";
import type { BookingFormConfig } from "@/types/booking";
import { booking } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error" | "mailto-opened";

interface BookingFormProps {
  config: BookingFormConfig;
  endpoint?: string;
}

function buildMailtoHref(config: BookingFormConfig, values: Record<string, string>) {
  const subject = `${config.label} — ${values.name || "New inquiry"}`;
  const lines = config.fields
    .filter((field) => field.type !== "file")
    .map((field) => `${field.label}: ${values[field.name]?.trim() || "—"}`);
  lines.push("", "(Reference images selected on the site were not attached — please attach them to this email.)");
  const body = lines.join("\n");
  return `mailto:${booking.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function BookingForm({ config, endpoint }: BookingFormProps) {
  const formId = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [fileCount, setFileCount] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!endpoint) {
      window.location.href = buildMailtoHref(config, values);
      setStatus("mailto-opened");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Form service responded with ${response.status}`);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong sending your inquiry.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 border border-iron px-6 py-16 text-center"
      >
        <CheckCircle2 className="text-paper" size={32} strokeWidth={1.3} />
        <p className="font-serif text-xl italic text-paper">Inquiry received.</p>
        <p className="font-nav max-w-sm text-xs uppercase tracking-[0.2em] text-ash">
          We'll follow up at the email you provided.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {status === "mailto-opened" && (
        <div className="flex items-start gap-3 border border-iron bg-graphite/60 px-4 py-3">
          <Mail size={18} className="mt-0.5 shrink-0 text-silver" strokeWidth={1.4} />
          <p className="font-nav text-xs uppercase tracking-[0.14em] text-silver">
            Your email app should have opened with this inquiry pre-filled — attach your reference
            images there and hit send to reach us. Didn't open?{" "}
            <a href={`mailto:${booking.contactEmail}`} className="text-paper underline underline-offset-2">
              Email {booking.contactEmail} directly.
            </a>
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-start gap-3 border border-iron bg-graphite/60 px-4 py-3">
          <TriangleAlert size={18} className="mt-0.5 shrink-0 text-silver" strokeWidth={1.4} />
          <p className="font-nav text-xs uppercase tracking-[0.14em] text-silver">
            {errorMessage ?? "Something went wrong."} Please try again, or email{" "}
            <a href={`mailto:${booking.contactEmail}`} className="text-paper underline underline-offset-2">
              {booking.contactEmail}
            </a>{" "}
            directly.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {config.fields.map((field) => {
          const fieldId = `${formId}-${field.name}`;
          const isFullWidth = field.type === "textarea" || field.type === "file";

          return (
            <div key={field.name} className={isFullWidth ? "sm:col-span-2" : undefined}>
              <label
                htmlFor={fieldId}
                className="font-nav mb-2 block text-[11px] uppercase tracking-[0.2em] text-bone"
              >
                {field.label}
                {field.required && <span className="text-ash"> *</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={fieldId}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  rows={field.rows ?? 4}
                  value={values[field.name] ?? ""}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  className="font-serif w-full resize-none border border-iron bg-transparent px-4 py-3 text-base text-paper placeholder:text-slate focus:border-silver focus:outline-none"
                />
              ) : field.type === "file" ? (
                <div>
                  <input
                    id={fieldId}
                    name={field.name}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => setFileCount(event.target.files?.length ?? 0)}
                    className="font-nav block w-full border border-iron bg-transparent px-4 py-3 text-xs text-silver file:mr-4 file:border-0 file:bg-paper file:px-3 file:py-1.5 file:font-medium file:uppercase file:tracking-[0.12em] file:text-void focus:border-silver focus:outline-none"
                  />
                  {field.helperText && (
                    <p className="font-nav mt-1.5 text-[10px] uppercase tracking-[0.12em] text-ash">
                      {fileCount > 0 ? `${fileCount} file(s) selected. ` : ""}
                      {field.helperText}
                    </p>
                  )}
                </div>
              ) : (
                <input
                  id={fieldId}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  min={field.type === "number" ? 1 : undefined}
                  step={field.type === "number" ? 1 : undefined}
                  value={values[field.name] ?? ""}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  className="font-serif w-full border border-iron bg-transparent px-4 py-3 text-base text-paper placeholder:text-slate focus:border-silver focus:outline-none"
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group font-nav inline-flex items-center gap-3 border border-paper px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-paper transition-colors duration-300 hover:bg-paper hover:text-void disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : endpoint ? "Send Inquiry" : "Send via Email"}
        <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}

import {
  Check,
  CheckCircle,
  LayoutTemplate,
  Move,
  Settings,
  Sofa,
} from "lucide-react";
import { useState } from "react";

interface SofaConfig {
  sofaType: string;
  fabric: string;
  color: string;
  width: number;
  depth: number;
  notes: string;
  name: string;
  phone: string;
}

interface ContactErrors {
  name?: string;
  phone?: string;
}

const GOLD = "oklch(0.65 0.12 75)";
const GOLD_LIGHT = "oklch(0.65 0.12 75 / 0.12)";
const GOLD_BORDER = "2px solid oklch(0.65 0.12 75)";
const BORDER_DEFAULT = "2px solid oklch(0.87 0.02 80)";
const DARK = "oklch(0.12 0.01 60)";

const sofaTypes = [
  {
    id: "L-Shape",
    icon: <LayoutTemplate size={28} />,
    title: "L-Shape",
    desc: "Perfect for open-plan living spaces with a bold corner arrangement.",
  },
  {
    id: "Recliner",
    icon: <Move size={28} />,
    title: "Recliner",
    desc: "Ultimate comfort with adjustable recline positions for relaxation.",
  },
  {
    id: "3-Seater",
    icon: <Sofa size={28} />,
    title: "3-Seater",
    desc: "Classic proportions, ideal for families and everyday lounging.",
  },
  {
    id: "Custom",
    icon: <Settings size={28} />,
    title: "Custom",
    desc: "Fully bespoke — we build exactly to your unique vision and space.",
  },
];

const fabrics = [
  {
    id: "Linen",
    color: "#E8DED0",
    texture: "linear-gradient(135deg, #E8DED0 25%, #D4C9B8 50%, #E8DED0 75%)",
  },
  {
    id: "Velvet",
    color: "#8B7BB5",
    texture: "linear-gradient(135deg, #9B8BC5 0%, #7A6AA4 40%, #9B8BC5 100%)",
  },
  {
    id: "Leather",
    color: "#8B6247",
    texture: "linear-gradient(135deg, #9B7257 0%, #7A5136 50%, #9B7257 100%)",
  },
  {
    id: "Microfiber",
    color: "#B0ACAC",
    texture: "linear-gradient(135deg, #C0BCBC 0%, #A09C9C 50%, #C0BCBC 100%)",
  },
  {
    id: "Cotton",
    color: "#E4D8C8",
    texture: "linear-gradient(135deg, #EEE2D2 25%, #DAC9B4 50%, #EEE2D2 75%)",
  },
  {
    id: "Suede",
    color: "#A08060",
    texture: "linear-gradient(135deg, #B09070 0%, #907050 50%, #B09070 100%)",
  },
];

const colors = [
  { id: "Ivory", hex: "#F5F0E8" },
  { id: "Charcoal", hex: "#3C3C3C" },
  { id: "Sand", hex: "#D4B896" },
  { id: "Slate Blue", hex: "#6B7A99" },
  { id: "Forest Green", hex: "#4A6741" },
  { id: "Warm White", hex: "#FAFAF7" },
  { id: "Blush", hex: "#E8B4A0" },
  { id: "Midnight", hex: "#1C1C2E" },
];

const STEP_TITLES = [
  {
    title: "Choose Your Sofa Style",
    subtitle: "Select the silhouette that best fits your space and lifestyle.",
  },
  {
    title: "Select Your Fabric",
    subtitle: "Each material tells a story — choose yours.",
  },
  {
    title: "Pick Your Color",
    subtitle: "Your color sets the mood of the entire room.",
  },
  {
    title: "Define Your Size",
    subtitle: "We craft to your exact dimensions — no compromise.",
  },
  {
    title: "Any Special Requests?",
    subtitle: "Share details that will make your sofa truly yours.",
  },
  {
    title: "Almost There!",
    subtitle: "Let us know how to reach you to begin your journey.",
  },
];

export function SofaConfigurator() {
  const [step, setStep] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});

  const [config, setConfig] = useState<SofaConfig>({
    sofaType: "",
    fabric: "",
    color: "",
    width: 200,
    depth: 110,
    notes: "",
    name: "",
    phone: "",
  });

  const goTo = (next: number, dir: "forward" | "back") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 280);
  };

  const handleNext = () => {
    if (step < 6) goTo(step + 1, "forward");
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) goTo(step - 1, "back");
  };

  const handleSubmit = () => {
    const newErrors: ContactErrors = {};
    if (!config.name.trim() || config.name.trim().length < 2)
      newErrors.name = "Name is required (min 2 characters)";
    if (!config.phone.trim() || !/^[0-9]{10,15}$/.test(config.phone.trim()))
      newErrors.phone = "Enter a valid phone number (10–15 digits)";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSubmitted(true);
  };

  const progress = (step / 6) * 100;

  const inputBase: React.CSSProperties = {
    background: "oklch(0.97 0.005 80)",
    border: "1.5px solid oklch(0.87 0.02 80)",
    color: DARK,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const inputError: React.CSSProperties = {
    ...inputBase,
    border: "1.5px solid oklch(0.55 0.18 25)",
  };

  const animStyle: React.CSSProperties = {
    animation: animating
      ? direction === "forward"
        ? "stepExitLeft 0.28s ease forwards"
        : "stepExitRight 0.28s ease forwards"
      : direction === "forward"
        ? "stepEnterRight 0.32s ease forwards"
        : "stepEnterLeft 0.32s ease forwards",
  };

  if (submitted) {
    return (
      <div
        data-ocid="configurator.success_state"
        className="max-w-2xl mx-auto px-4"
      >
        <div
          className="rounded-xl text-center py-16 px-8"
          style={{
            background: "#ffffff",
            boxShadow: "0 20px 60px oklch(0.12 0.01 60 / 0.12)",
            animation: "stepEnterRight 0.5s ease forwards",
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: GOLD_LIGHT, border: GOLD_BORDER }}
          >
            <CheckCircle size={38} style={{ color: GOLD }} />
          </div>
          <h3
            className="font-playfair text-3xl font-bold mb-3"
            style={{ color: DARK }}
          >
            Your Sofa Journey Begins!
          </h3>
          <p
            className="font-general text-base mb-8"
            style={{ color: "oklch(0.45 0.03 70)" }}
          >
            Thank you, {config.name}. Our craftsmen will reach out at{" "}
            {config.phone} within 24 hours.
          </p>

          <div
            className="rounded-lg p-5 mb-8 text-left space-y-2"
            style={{
              background: "oklch(0.97 0.008 80)",
              border: BORDER_DEFAULT,
            }}
          >
            <p className="font-general text-sm" style={{ color: DARK }}>
              <span className="font-semibold" style={{ color: GOLD }}>
                Style:
              </span>{" "}
              {config.sofaType || "—"}
            </p>
            <p className="font-general text-sm" style={{ color: DARK }}>
              <span className="font-semibold" style={{ color: GOLD }}>
                Fabric:
              </span>{" "}
              {config.fabric || "—"}
            </p>
            <p className="font-general text-sm" style={{ color: DARK }}>
              <span className="font-semibold" style={{ color: GOLD }}>
                Color:
              </span>{" "}
              {config.color || "—"}
            </p>
            <p className="font-general text-sm" style={{ color: DARK }}>
              <span className="font-semibold" style={{ color: GOLD }}>
                Size:
              </span>{" "}
              {config.width}cm × {config.depth}cm
            </p>
            {config.notes && (
              <p className="font-general text-sm" style={{ color: DARK }}>
                <span className="font-semibold" style={{ color: GOLD }}>
                  Notes:
                </span>{" "}
                {config.notes}
              </p>
            )}
          </div>

          <button
            type="button"
            data-ocid="configurator.restart_button"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setConfig({
                sofaType: "",
                fabric: "",
                color: "",
                width: 200,
                depth: 110,
                notes: "",
                name: "",
                phone: "",
              });
              setErrors({});
            }}
            className="font-general px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: GOLD,
              color: DARK,
              boxShadow: "0 4px 20px oklch(0.65 0.12 75 / 0.3)",
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes stepEnterRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes stepEnterLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes stepExitLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-40px); }
        }
        @keyframes stepExitRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(40px); }
        }
        .swatch-card:hover { transform: scale(1.04); }
        .color-dot:hover { transform: scale(1.12); }
        .sofa-type-card:hover { box-shadow: 0 8px 32px oklch(0.12 0.01 60 / 0.12); transform: translateY(-2px); }
        .fabric-swatch:hover .swatch-inner { transform: scale(1.06); }
        input[type='range'].gold-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: oklch(0.87 0.02 80);
          border-radius: 2px;
          outline: none;
        }
        input[type='range'].gold-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: oklch(0.65 0.12 75);
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px oklch(0.65 0.12 75 / 0.4);
          transition: transform 0.15s;
        }
        input[type='range'].gold-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        input[type='range'].gold-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: oklch(0.65 0.12 75);
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px oklch(0.65 0.12 75 / 0.4);
        }
        .gold-focus:focus {
          border-color: oklch(0.65 0.12 75) !important;
          box-shadow: 0 0 0 3px oklch(0.65 0.12 75 / 0.15);
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-4">
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: "#ffffff",
            boxShadow: "0 20px 60px oklch(0.12 0.01 60 / 0.12)",
          }}
        >
          {/* Progress Bar */}
          <div style={{ background: "oklch(0.93 0.01 80)", height: "4px" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: GOLD,
                transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>

          <div className="p-8 sm:p-10">
            {/* Step Counter */}
            <p
              className="font-general text-xs font-semibold tracking-[0.2em] uppercase mb-2"
              style={{ color: GOLD }}
            >
              Step {step} of 6
            </p>

            {/* Step Title */}
            <h2
              className="font-playfair text-2xl sm:text-3xl font-bold mb-1"
              style={{ color: DARK }}
            >
              {STEP_TITLES[step - 1].title}
            </h2>
            <p
              className="font-general text-sm mb-8"
              style={{ color: "oklch(0.45 0.03 70)" }}
            >
              {STEP_TITLES[step - 1].subtitle}
            </p>

            {/* Step Content */}
            <div style={animStyle}>
              {step === 1 && (
                <div
                  className="grid grid-cols-2 gap-4"
                  data-ocid="configurator.sofa_type_panel"
                >
                  {sofaTypes.map((t) => {
                    const selected = config.sofaType === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        data-ocid={`configurator.sofa_type_card.${sofaTypes.indexOf(t) + 1}`}
                        onClick={() =>
                          setConfig((p) => ({ ...p, sofaType: t.id }))
                        }
                        className="sofa-type-card text-left rounded-xl p-5 transition-all duration-200"
                        style={{
                          border: selected ? GOLD_BORDER : BORDER_DEFAULT,
                          background: selected
                            ? GOLD_LIGHT
                            : "oklch(0.97 0.005 80)",
                        }}
                      >
                        <div
                          className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
                          style={{
                            background: selected
                              ? GOLD
                              : "oklch(0.91 0.015 80)",
                            color: selected ? DARK : "oklch(0.45 0.03 70)",
                            transition: "background 0.2s",
                          }}
                        >
                          {t.icon}
                        </div>
                        <p
                          className="font-playfair text-base font-semibold mb-1"
                          style={{ color: DARK }}
                        >
                          {t.title}
                        </p>
                        <p
                          className="font-general text-xs leading-relaxed"
                          style={{ color: "oklch(0.50 0.03 70)" }}
                        >
                          {t.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 2 && (
                <div
                  className="grid grid-cols-3 gap-4"
                  data-ocid="configurator.fabric_panel"
                >
                  {fabrics.map((f, idx) => {
                    const selected = config.fabric === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        data-ocid={`configurator.fabric_card.${idx + 1}`}
                        onClick={() =>
                          setConfig((p) => ({ ...p, fabric: f.id }))
                        }
                        className="fabric-swatch rounded-xl overflow-hidden transition-all duration-200"
                        style={{
                          border: selected ? GOLD_BORDER : BORDER_DEFAULT,
                          outline: "none",
                        }}
                      >
                        <div
                          className="swatch-inner transition-transform duration-200"
                          style={{
                            height: "72px",
                            background: f.texture,
                          }}
                        />
                        <div
                          className="p-2 flex items-center justify-between"
                          style={{
                            background: selected
                              ? GOLD_LIGHT
                              : "oklch(0.97 0.005 80)",
                          }}
                        >
                          <span
                            className="font-general text-xs font-semibold"
                            style={{ color: DARK }}
                          >
                            {f.id}
                          </span>
                          {selected && (
                            <Check size={12} style={{ color: GOLD }} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 3 && (
                <div data-ocid="configurator.color_panel">
                  <div className="flex flex-wrap gap-4 justify-center">
                    {colors.map((c, idx) => {
                      const selected = config.color === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          data-ocid={`configurator.color_swatch.${idx + 1}`}
                          onClick={() =>
                            setConfig((p) => ({ ...p, color: c.id }))
                          }
                          className="color-dot flex flex-col items-center gap-2 transition-transform duration-150"
                          style={{ outline: "none" }}
                        >
                          <div
                            className="w-12 h-12 rounded-full relative"
                            style={{
                              background: c.hex,
                              border: selected
                                ? "3px solid oklch(0.65 0.12 75)"
                                : "3px solid oklch(0.87 0.02 80)",
                              boxShadow: selected
                                ? "0 0 0 2px oklch(0.65 0.12 75 / 0.3)"
                                : "0 2px 6px oklch(0.12 0.01 60 / 0.08)",
                              transition: "border-color 0.2s, box-shadow 0.2s",
                            }}
                          >
                            {selected && (
                              <div
                                className="absolute inset-0 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(0,0,0,0.25)" }}
                              >
                                <Check
                                  size={16}
                                  color="white"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </div>
                          <span
                            className="font-general text-xs"
                            style={{
                              color: selected ? GOLD : "oklch(0.45 0.03 70)",
                              fontWeight: selected ? 600 : 400,
                            }}
                          >
                            {c.id}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8" data-ocid="configurator.size_panel">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label
                        htmlFor="cfg-width"
                        className="font-general text-sm font-semibold uppercase tracking-wider"
                        style={{ color: DARK }}
                      >
                        Width
                      </label>
                      <span
                        className="font-playfair text-2xl font-bold"
                        style={{ color: GOLD }}
                      >
                        {config.width}{" "}
                        <span
                          className="font-general text-sm font-normal"
                          style={{ color: "oklch(0.45 0.03 70)" }}
                        >
                          cm
                        </span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={300}
                      step={5}
                      value={config.width}
                      id="cfg-width"
                      data-ocid="configurator.width_slider"
                      onChange={(e) =>
                        setConfig((p) => ({
                          ...p,
                          width: Number(e.target.value),
                        }))
                      }
                      className="gold-slider w-full"
                    />
                    <div
                      className="flex justify-between font-general text-xs mt-1"
                      style={{ color: "oklch(0.60 0.02 70)" }}
                    >
                      <span>100cm</span>
                      <span>300cm</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label
                        htmlFor="cfg-depth"
                        className="font-general text-sm font-semibold uppercase tracking-wider"
                        style={{ color: DARK }}
                      >
                        Depth
                      </label>
                      <span
                        className="font-playfair text-2xl font-bold"
                        style={{ color: GOLD }}
                      >
                        {config.depth}{" "}
                        <span
                          className="font-general text-sm font-normal"
                          style={{ color: "oklch(0.45 0.03 70)" }}
                        >
                          cm
                        </span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={150}
                      step={5}
                      value={config.depth}
                      id="cfg-depth"
                      data-ocid="configurator.depth_slider"
                      onChange={(e) =>
                        setConfig((p) => ({
                          ...p,
                          depth: Number(e.target.value),
                        }))
                      }
                      className="gold-slider w-full"
                    />
                    <div
                      className="flex justify-between font-general text-xs mt-1"
                      style={{ color: "oklch(0.60 0.02 70)" }}
                    >
                      <span>80cm</span>
                      <span>150cm</span>
                    </div>
                  </div>

                  {/* Size preview */}
                  <div
                    className="rounded-lg p-4 flex items-center justify-center gap-2"
                    style={{
                      background: "oklch(0.97 0.008 80)",
                      border: BORDER_DEFAULT,
                    }}
                  >
                    <Sofa size={20} style={{ color: GOLD }} />
                    <span
                      className="font-general text-sm"
                      style={{ color: DARK }}
                    >
                      Your sofa:{" "}
                      <strong style={{ color: GOLD }}>{config.width}cm</strong>{" "}
                      wide ×{" "}
                      <strong style={{ color: GOLD }}>{config.depth}cm</strong>{" "}
                      deep
                    </span>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div data-ocid="configurator.notes_panel">
                  <textarea
                    data-ocid="configurator.notes_textarea"
                    value={config.notes}
                    onChange={(e) =>
                      setConfig((p) => ({ ...p, notes: e.target.value }))
                    }
                    placeholder="Anything special? Tell us — special dimensions, fabric details, delivery requirements 😊"
                    rows={6}
                    className="w-full px-4 py-4 rounded-xl font-general text-sm resize-none gold-focus"
                    style={inputBase}
                  />
                  <p
                    className="font-general text-xs mt-2"
                    style={{ color: "oklch(0.60 0.02 70)" }}
                  >
                    Optional — skip if no special requests.
                  </p>
                </div>
              )}

              {step === 6 && (
                <div
                  className="space-y-5"
                  data-ocid="configurator.contact_panel"
                >
                  <div>
                    <label
                      htmlFor="cfg-name"
                      className="block font-general text-xs font-semibold tracking-wider uppercase mb-2"
                      style={{ color: DARK }}
                    >
                      Your Name <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input
                      id="cfg-name"
                      type="text"
                      data-ocid="configurator.name_input"
                      value={config.name}
                      onChange={(e) => {
                        setConfig((p) => ({ ...p, name: e.target.value }));
                        if (errors.name)
                          setErrors((p) => ({ ...p, name: undefined }));
                      }}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-lg font-general text-sm gold-focus"
                      style={errors.name ? inputError : inputBase}
                    />
                    {errors.name && (
                      <p
                        data-ocid="configurator.name_error"
                        className="font-general text-xs mt-1"
                        style={{ color: "oklch(0.55 0.18 25)" }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cfg-phone"
                      className="block font-general text-xs font-semibold tracking-wider uppercase mb-2"
                      style={{ color: DARK }}
                    >
                      Phone Number <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input
                      id="cfg-phone"
                      type="tel"
                      data-ocid="configurator.phone_input"
                      value={config.phone}
                      onChange={(e) => {
                        setConfig((p) => ({ ...p, phone: e.target.value }));
                        if (errors.phone)
                          setErrors((p) => ({ ...p, phone: undefined }));
                      }}
                      placeholder="10–15 digit number"
                      className="w-full px-4 py-3 rounded-lg font-general text-sm gold-focus"
                      style={errors.phone ? inputError : inputBase}
                    />
                    {errors.phone && (
                      <p
                        data-ocid="configurator.phone_error"
                        className="font-general text-xs mt-1"
                        style={{ color: "oklch(0.55 0.18 25)" }}
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Summary preview */}
                  <div
                    className="rounded-lg p-4 space-y-1 mt-2"
                    style={{
                      background: "oklch(0.97 0.008 80)",
                      border: BORDER_DEFAULT,
                    }}
                  >
                    <p
                      className="font-general text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: GOLD }}
                    >
                      Your Configuration
                    </p>
                    {[
                      ["Style", config.sofaType],
                      ["Fabric", config.fabric],
                      ["Color", config.color],
                      ["Size", `${config.width}cm × ${config.depth}cm`],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between font-general text-xs"
                      >
                        <span style={{ color: "oklch(0.50 0.03 70)" }}>
                          {label}
                        </span>
                        <span style={{ color: DARK, fontWeight: 600 }}>
                          {value || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10">
              <button
                type="button"
                data-ocid="configurator.back_button"
                onClick={handleBack}
                disabled={step === 1}
                className="font-general px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-200"
                style={{
                  border:
                    step === 1
                      ? "1.5px solid oklch(0.87 0.02 80)"
                      : GOLD_BORDER,
                  color: step === 1 ? "oklch(0.70 0.02 70)" : GOLD,
                  background: "transparent",
                  cursor: step === 1 ? "not-allowed" : "pointer",
                  opacity: step === 1 ? 0.5 : 1,
                }}
              >
                ← Back
              </button>

              <button
                type="button"
                data-ocid={
                  step === 6
                    ? "configurator.submit_button"
                    : "configurator.next_button"
                }
                onClick={handleNext}
                className="font-general px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: GOLD,
                  color: DARK,
                  boxShadow: "0 4px 20px oklch(0.65 0.12 75 / 0.35)",
                }}
              >
                {step === 6 ? "Build My Sofa ✦" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

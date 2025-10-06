import React, { useState } from "react";

// Canva Payment Prompt Generator with Email and Pochi la Biashara info

export default function CanvaPaymentPromptGenerator() {
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("252");
  const [phone, setPhone] = useState("0704196876");
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState("professional-casual");
  const [copied, setCopied] = useState(false);

  const pochiNumber = "0704196876";

  const formatPhoneInternational = (p) => {
    const clean = p.replace(/[^0-9]/g, "");
    if (clean.startsWith("0") && clean.length === 10) {
      return `254${clean.slice(1)}`;
    }
    return clean;
  };

  const templates = {
    "professional-casual": (name, amt, ph, em) =>
      `Hi ${name || "there"},\n\nKindly pay KSh ${amt} for your Canva design service.\nPayment via M-Pesa (Pochi la Biashara) to ${ph}.\nYou can also reach me at ${em || "[your email]"}.\n\nThank you for your support!`,

    friendly: (name, amt, ph, em) =>
      `Hey ${name || "friend"}! 🙂\nPlease send KSh ${amt} for the Canva design.\nYou can pay via M-Pesa (Pochi la Biashara) to ${ph}.\nEmail: ${em || "[your email]"}\nThanks a bunch!`,

    formal: (name, amt, ph, em) =>
      `Hello ${name || "Client"},\n\nThis is a request for payment of KSh ${amt} for the Canva design service provided.\nPlease complete the payment via M-Pesa (Pochi la Biashara) to ${ph}.\nFor any inquiries, contact me at ${em || "[your email]"}.\n\nKind regards,\n[Your Name]`,
  };

  const generated = templates[tone](clientName, amount, pochiNumber, email);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      alert("Unable to copy to clipboard.");
    }
  };

  const openWhatsApp = () => {
    const intl = formatPhoneInternational(pochiNumber);
    const waText = encodeURIComponent(generated);
    const waLink = `https://wa.me/${intl}?text=${waText}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-2">Canva Payment Prompt Generator</h1>
        <p className="text-sm text-gray-500 mb-6">
          Generate polite payment messages for your clients. Payments via Pochi la Biashara: {pochiNumber}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-1">Client name</span>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g., Alex"
              className="p-2 border rounded"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-1">Amount (KSh)</span>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} className="p-2 border rounded" />
          </label>

          <label className="flex flex-col md:col-span-2">
            <span className="text-sm font-medium text-gray-700 mb-1">Your Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., yourname@email.com"
              className="p-2 border rounded"
            />
          </label>
        </div>

        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700 mr-3">Tone:</span>
          <select value={tone} onChange={(e) => setTone(e.target.value)} className="p-2 border rounded">
            <option value="professional-casual">Professional - Casual</option>
            <option value="friendly">Friendly</option>
            <option value="formal">Formal / Business</option>
          </select>
        </div>

        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700">Generated message:</span>
          <textarea readOnly value={generated} rows={6} className="w-full mt-2 p-3 border rounded bg-gray-50" />
        </div>

        <div className="flex gap-3">
          <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 text-white rounded shadow">
            {copied ? "Copied!" : "Copy message"}
          </button>
          <button onClick={openWhatsApp} className="px-4 py-2 border rounded">
            Send via WhatsApp
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Tip: Click "Send via WhatsApp" to open WhatsApp Web or the app with your message prefilled. Make sure your
          Pochi la Biashara number ({pochiNumber}) is correct before sending.
        </div>
      </div>
    </div>
  );
}

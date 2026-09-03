"use client";

import { useState } from "react";
import { site } from "@/content/site";
import Reveal from "@/components/Reveal";
import Bracket from "@/components/Bracket";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-layout mb-16">
        <Reveal>
          <h1 className="mb-4">Get in touch</h1>
          <p className="text-lg text-ink/80 max-w-content">
            Ready to talk about your project? Choose the path that works best for you.
          </p>
        </Reveal>
      </div>

      <div className="max-w-layout grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <Reveal delay={0.1}>
            <a 
              href={site.calLink}
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-signal text-white text-center px-6 py-4 rounded-sm hover:bg-signal/90 transition-colors font-semibold text-lg"
            >
              1. Book a call directly
            </a>
          </Reveal>
          
          <Reveal delay={0.15}>
            <a 
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-[#25D366]/10 text-[#075E54] border border-[#25D366]/30 text-center px-6 py-4 rounded-sm hover:bg-[#25D366]/20 transition-colors font-semibold text-lg"
            >
              2. Send a WhatsApp message
            </a>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.2}>
            <div className="bg-white p-8 rounded-sm border border-line flex flex-col items-center justify-center text-center h-full min-h-[240px]">
              <span className="mono-tag text-muted mb-4 block uppercase">3. Or email us directly</span>
              
              <a 
                href={`mailto:${site.email}`}
                className="text-2xl sm:text-3xl font-bricolage font-bold text-ink hover:text-signal transition-colors mb-8"
              >
                {site.email}
              </a>
              
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 bg-paper-sunk border border-line rounded-sm hover:border-signal/50 hover:bg-white transition-colors font-semibold text-sm"
              >
                {copied ? (
                  <>
                    <div className="w-4 h-4 text-signal">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    Copied to clipboard
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 text-ink/60">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </div>
                    Copy email address
                  </>
                )}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
      
      <div className="max-w-layout mt-16">
        <Reveal delay={0.3}>
          <div className="bg-paper p-8 rounded-sm border border-line max-w-xl">
            <h4 className="mono-tag text-muted mb-6 block uppercase">Logistics</h4>
            <ul className="space-y-6 text-ink/80">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 shrink-0 rounded-sm bg-signal/10 flex items-center justify-center mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-signal" />
                </div>
                <div>
                  <strong className="block text-ink font-semibold mb-1">Response time</strong>
                  We promise to reply to all inquiries within six hours.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 shrink-0 rounded-sm bg-signal/10 flex items-center justify-center mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-signal" />
                </div>
                <div>
                  <strong className="block text-ink font-semibold mb-1">Working hours</strong>
                  {site.hours}
                </div>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

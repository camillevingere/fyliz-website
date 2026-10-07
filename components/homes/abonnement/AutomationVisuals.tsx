"use client";
import { Check } from "./icons";
import s from "./landing.module.scss";
import { useLoop } from "./useLoop";

// Mini-démos animées des cartes « Ce qu'on automatise ». Données illustratives.

const leads = [
  { name: "Groupe Vidal", meta: "120 salariés · demande de devis", score: 92 },
  { name: "Studio Nova", meta: "35 salariés · webinar", score: 64 },
  { name: "Atelier Morel", meta: "8 salariés · newsletter", score: 31 },
];

export function LeadVisual() {
  const { ref, tick } = useLoop<HTMLDivElement>(1100, 4);
  const phase = tick % 6;

  return (
    <div ref={ref} className={s.visual} aria-hidden>
      <ul className={s.leadList}>
        {leads.map((lead, index) => {
          const scored = phase > index;
          return (
            <li key={lead.name} data-hot={phase >= 4 && index === 0 ? "" : undefined}>
              <div className={s.leadInfo}>
                <strong>{lead.name}</strong>
                <span>{lead.meta}</span>
              </div>
              <div className={s.leadScore}>
                <span className={s.leadBar}>
                  <span style={{ width: scored ? `${lead.score}%` : 0 }} />
                </span>
                <span className={s.leadValue}>{scored ? lead.score : "··"}</span>
              </div>
              {index === 0 && <span className={s.leadBadge}>RDV proposé</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const invoiceFields = [
  ["Fournisseur", "Imprimerie Lenoir"],
  ["Montant HT", "1 240,00 €"],
  ["TVA", "248,00 €"],
  ["Échéance", "30 nov."],
];

export function InvoiceVisual() {
  const { ref, tick } = useLoop<HTMLDivElement>(900, 6);
  const phase = tick % 7;

  return (
    <div ref={ref} className={s.visual} aria-hidden>
      <div className={s.invoice}>
        <div className={s.invoiceDoc} data-scanning={phase < 5 ? "" : undefined}>
          <span className={s.invoiceType}>PDF</span>
          <span />
          <span />
          <span />
          <span />
          <span />
          <i className={s.invoiceBeam} />
        </div>
        <ul className={s.invoiceFields}>
          {invoiceFields.map(([label, value], index) => (
            <li key={label} data-filled={phase > index ? "" : undefined}>
              <span>{label}</span>
              <strong>{value}</strong>
            </li>
          ))}
          <li className={s.invoiceSaved} data-filled={phase >= 5 ? "" : undefined}>
            <Check width={12} height={12} />
            Saisie dans la compta
          </li>
        </ul>
      </div>
    </div>
  );
}

const opsSteps = [
  { label: "Contrat signé", tool: "Yousign" },
  { label: "Dossier client créé", tool: "Drive" },
  { label: "Facture d'acompte envoyée", tool: "Stripe" },
  { label: "Équipe prévenue", tool: "Slack" },
];

export function OpsVisual() {
  const { ref, tick } = useLoop<HTMLDivElement>(900, 5);
  const phase = tick % 6;

  return (
    <div ref={ref} className={s.visual} aria-hidden>
      <ol className={s.opsList}>
        {opsSteps.map((step, index) => (
          <li
            key={step.label}
            data-state={phase > index ? "done" : phase === index ? "active" : "idle"}
          >
            <span className={s.opsDot}>
              <Check width={10} height={10} />
            </span>
            <span className={s.opsLabel}>{step.label}</span>
            <span className={s.opsTool}>{step.tool}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SupportVisual() {
  const { ref, tick } = useLoop<HTMLDivElement>(1000, 4);
  const cycle = Math.floor(tick / 6);
  const phase = tick % 6;

  return (
    <div ref={ref} className={s.visual} aria-hidden>
      <div key={cycle} className={s.chat}>
        <p className={s.chatIn}>Bonjour, où en est ma commande #4821 ?</p>
        {phase === 1 && (
          <p className={s.chatTyping}>
            <span />
            <span />
            <span />
          </p>
        )}
        {phase >= 2 && (
          <p className={s.chatOut}>
            Elle est partie ce matin ! Livraison prévue jeudi, voici ton lien de suivi.
          </p>
        )}
        {phase >= 3 && (
          <span className={s.chatStamp}>
            <Check width={12} height={12} />
            Répondu en 40 s · 23 h 12
          </span>
        )}
      </div>
    </div>
  );
}

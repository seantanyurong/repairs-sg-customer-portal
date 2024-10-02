export const SHARE_REFERRAL = {
  TITLE: "Give $15, Get $15",
  SUBTITLE:
    "Every friend you refer gets $15 off their first booking and you get $15!",
  SHARE: "Share",
} as const;

export const SHARE_MODAL = {
  TITLE: "Share this code with family and friends!",
  COPY: "Copy",
  WHATSAPP: "WhatsApp",
  TELEGRAM: "Telegram",
  TWITTER: "X (Twitter)",
  EMAIL: "Email",
  REFERRAL_TEXT: (referralCode: string) =>
    `Hey there! 👋🏻 I'd love to invite you to experience Repair.sg's cleaning and maintenance services! Unlock $15 off on your first booking with my special code: ${referralCode}. A treat just for you! 🎁`,
} as const;

export const GENERATE_REFERRAL = {
  TITLE: "Buddy Bonus!",
  SUBTITLE: "You don't have a referral code.",
  BUTTON_TEXT: "Generate now",
} as const;

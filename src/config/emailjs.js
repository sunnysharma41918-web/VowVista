/**
 * EmailJS Configuration
 *
 * Configured with Vow Vista credentials
 */

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'vowvista2026',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_4y941rd',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 's6B8BjzxUdwFuhEr5',
  recipientEmail: 'hello@vowvista.com',
};

export const isEmailJsConfigured = () => {
  return Boolean(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey
  );
};

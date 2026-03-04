import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://e5309653f8e516dd8b181bd586a5009e@o713169.ingest.us.sentry.io/4510988880510976",
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});

// VLY Integrations Configuration
// See /integrations.md for usage documentation

// The project no longer imports @vly-ai/integrations directly in the app
// bundle. If you re-enable that package, restore this file to its original
// shape and add the env var from .env.example.
export const vly = null as unknown as {
  // Keep the export shape stable for any code that already imported it.
} | null;

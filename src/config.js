// Central API configuration.
// Auto-switches between local XAMPP and the production host based on hostname,
// mirroring the backend's env switch (Database / uploadFile).

const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// Live API — the admin API is nested inside the /admin folder on the server.
const PROD_API_BASE = "https://dk.venzpire.cloud/admin/dk_portfolio_admin_api/api";
const LOCAL_API_BASE = "http://localhost/dk_portfolio_admin_api/api";

export const API_BASE = isLocal ? LOCAL_API_BASE : PROD_API_BASE;

// Public client key — provided at build time via REACT_APP_API_KEY (.env, gitignored).
// It only authorizes reading already-public portfolio data; writes require the admin JWT.
// Must match API_KEY in dk_portfolio_admin_api/api/classes/common.class.php.
export const API_KEY = process.env.REACT_APP_API_KEY || "";

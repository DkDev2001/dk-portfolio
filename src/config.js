// Central API configuration.
// Auto-switches between local XAMPP and the production host based on hostname,
// mirroring the backend's env switch (Database / uploadFile).

const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// TODO: set PROD_API_BASE to your live cPanel URL (https) once deployed.
const PROD_API_BASE = "https://YOUR_DOMAIN/dk_portfolio_admin_api/api";
const LOCAL_API_BASE = "http://localhost/dk_portfolio_admin_api/api";

export const API_BASE = isLocal ? LOCAL_API_BASE : PROD_API_BASE;

// Must match API_KEY in dk_portfolio_admin_api/api/classes/common.class.php
export const API_KEY = "dkp_5f8c2a1b9e4d7c3f6a0b8e2d5c9f1a4b";

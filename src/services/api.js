import { API_BASE, API_KEY } from "../config";

// Low-level GET against the portfolio API. Returns the `data` field of the
// {data, code, message} envelope, or throws on network / API error.
async function apiGet(action) {
  const res = await fetch(`${API_BASE}/admin/${action}`, {
    method: "GET",
    headers: { "X-Api-Key": API_KEY },
  });
  if (!res.ok) throw new Error(`API ${action} failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export const getSkills = () => apiGet("get_skills");
export const getProgress = () => apiGet("get_progress");
export const getStats = () => apiGet("get_stats");
export const getProjects = () => apiGet("get_projects");
export const getContact = () => apiGet("get_contact");
export const getSettings = () => apiGet("get_settings");
export const getTitles = () => apiGet("get_titles");
export const getCompanies = () => apiGet("get_companies");
export const getAbout = () => apiGet("get_about");
export const getServices = () => apiGet("get_services");
export const getTestimonials = () => apiGet("get_testimonials");
export const getProject = (id) => apiGet(`get_project?id=${encodeURIComponent(id)}`);

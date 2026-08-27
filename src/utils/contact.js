// Pick the contact the "Let's Connect" button should open.
// Preference comes from Settings (primary_contact); the chosen platform is used
// even if it isn't in the social row, with sensible fallbacks.
export function pickPrimary(links, settings) {
  const list = links || [];
  const pref = settings && settings.primary_contact;
  const byPlatform = (p) => list.find((l) => l.platform === p && l.url);
  return (
    (pref && byPlatform(pref)) ||
    byPlatform("fiverr") ||
    byPlatform("whatsapp") ||
    list.find((l) => l.is_active && l.url) ||
    null
  );
}

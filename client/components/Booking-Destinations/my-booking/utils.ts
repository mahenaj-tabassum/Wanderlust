const DAY_MS = 1000 * 60 * 60 * 24;

export const formatDate = (value: string) =>
  new Date(
    value.includes("T") ? value : `${value}T00:00:00`,
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const getDaysLeft = (departureDate: string) => {
  const departure = new Date(`${departureDate}T00:00:00`).getTime();
  const today = new Date().setHours(0, 0, 0, 0);
  return Math.round((departure - today) / DAY_MS);
};

export const getCountdownLabel = (daysLeft: number) => {
  if (daysLeft < 0) return "Trip completed";
  if (daysLeft === 0) return "Departs today";
  if (daysLeft === 1) return "Departs tomorrow";
  return `Departs in ${daysLeft} days`;
};

export const getReference = (id: string) => `WL-${id.slice(-6).toUpperCase()}`;

import config from "../config";

export function checkAdmin(userId: number): boolean {
  // Split the string of numbers into number[]
  const numberSets = config.ADMIN_IDs.split(";").map(Number);

  return numberSets.includes(userId);
}

export function getFirstAdmin(): number {
  // Split the string of numbers into number[]
  const numberSets = config.ADMIN_IDs.split(";").map(Number);

  return numberSets[0];
}

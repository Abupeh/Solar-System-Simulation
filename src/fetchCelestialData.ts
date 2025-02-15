import { SystemData } from "./types";

export async function fetchCelestialData(json: string): Promise<SystemData> {
	const response = await fetch(json);
	const data = (await response.json()) as SystemData;
  return data;
}

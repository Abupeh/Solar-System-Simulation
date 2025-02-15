export async function fetchCelestialData(json) {
    const response = await fetch(json);
    const data = (await response.json());
    return data;
}

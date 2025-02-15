export async function fetchCelestialData(json) {
    try {
        const response = await fetch(json);
        const data = await response.json();
    }
    catch (error) {
        console.error('Error loading celestial data:', error);
    }
}

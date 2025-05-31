import { API_GENERAL, API_COMBINED } from '$env/static/private';

export async function load({ cookies }) {
	const stPear = cookies.get('stPear');
    const stakedPrice = cookies.get('stakedPrice');

	// Get General data from API_GENERAL
	let generalData = null;
	try {
		const res = await fetch(API_GENERAL + '?time=' + new Date().getTime());
		if (!res.ok) throw new Error('Failed to fetch');
		generalData = await res.json();
	} catch (err) {
		console.error('Error fetching general data:', err);
	}

	// Fetch combined data
	let combinedData = null;
	try {
		const res = await fetch(API_COMBINED + '?time=' + new Date().getTime());
		if (!res.ok) throw new Error('Failed to fetch combined data');
		combinedData = await res.json();
	} catch (err) {
		console.error('Error fetching combined data:', err);
	}

	return {
		stPear,
        stakedPrice,
		generalData,
		combinedData
	};
}

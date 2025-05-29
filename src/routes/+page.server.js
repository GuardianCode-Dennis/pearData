export function load({ cookies }) {
	const stPear = cookies.get('stPear');
    const stakedPrice = cookies.get('stakedPrice');

	return {
		stPear,
        stakedPrice,
	};
}

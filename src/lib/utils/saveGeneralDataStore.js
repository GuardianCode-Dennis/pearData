export function saveGeneralDataStore(generalData, data) {
    // Check if data is valid
    if (!data || typeof data !== 'object') {
        console.error('Invalid data provided to saveGeneralDataStore');
        return;
    }

    // Save the data to localStorage
    generalData.set({
        dailyVolume: data.dailyVolume || 0,
        dailyUsers: data.dailyUsers || 0,
        dailyFees: data.dailyFees || 0,
        totalVolume: data.totalVolume || 0,
        weeklyVolume: data.weeklyVolume || 0,
        monthlyVolume: data.monthlyVolume || 0,
        dailyATH: {
            date: data.dailyATH?.date || new Date().toISOString().slice(0, 10),
            volume: data.dailyATH?.volume || 0
        },
        partyMode: data.partyMode || false,
        totalPearStaked: data.totalPearStaked || 0,
    });
}
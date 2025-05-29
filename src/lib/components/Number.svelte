<script>
    export let number = 0;
    export let type = 'normal';
    export let decimals = 2;
    export let size = 'normal';
    export let extra = false;

    let formattedNumber;
    $: {
        if (type === 'dollar') {
            formattedNumber = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(number);
        } else if (type === 'percentage') {
            formattedNumber = new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: decimals,
            }).format(number / 100);
        } else {
            formattedNumber = new Intl.NumberFormat('en-US', {
                maximumFractionDigits: decimals,
            }).format(number);
        }

        if (formattedNumber && type === 'dollar' || formattedNumber && type === 'normal') {
            // Format the dollar or normal number to have the last digits in primary color.
            const parts = formattedNumber.split('.');
            if (parts.length > 1) {
                let lastDigitsColor = '';
                if (extra) {
                    lastDigitsColor = 'text-extra';
                } else {
                    lastDigitsColor = 'text-primary';
                }
                formattedNumber = `${parts[0]}<span class="${lastDigitsColor}">.${parts[1]}</span>`;
            }
        } else if (formattedNumber && type === 'percentage') {
            // Format the percentage number to have the last digits in primary color.
            const parts = formattedNumber.split('.');
            if (parts.length > 1) {
                const firstTwoDigits = parts[1].slice(0, 2);
                const restOfDigits = parts[1].slice(2);
                formattedNumber = `${parts[0]}.${firstTwoDigits}<span class="text-primary">${restOfDigits}</span>`;
            }

            // Check if we have a percentage sign only without decimals.
            if (parts.length === 1) {
                // Remove the % from the formatted number and add it back with styling.
                formattedNumber = formattedNumber.replace(/%/g, '');
                formattedNumber = `${formattedNumber}<span class="text-primary">%</span>`;
            }
        }
    }
</script>

<span class={`${size === 'big' ? 'number-big tracking-[1.5px]' : size === 'small' ? 'number-small' : 'number tracking-[1.5px]'} font-medium`}>
    {@html formattedNumber}
</span>
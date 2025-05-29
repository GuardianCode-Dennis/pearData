<script>
    let timeLeft = 300;
    let formattedTime = formatTime(timeLeft);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    function updateTime() {
        setInterval(() => {
            timeLeft--;
            if (timeLeft < 0) {
                timeLeft = 300;
            }
            formattedTime = formatTime(timeLeft);
        }, 1000);
    }

    updateTime();
</script>

<span class="text-sm"><span class="hidden md:inline">Next update in:</span> <strong class="w-[40px] inline-block text-left justify-center relative top-[0.5px]">{formattedTime}</strong></span>
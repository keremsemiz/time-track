document.addEventListener('DOMContentLoaded', function() {
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    function setClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondsDegrees = ((seconds / 60) * 360) + 90;
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
        const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;

        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    setInterval(setClock, 1000);
    setClock(); 

    const timezoneSelect = document.getElementById('timezone');
    const worldClockDisplay = document.getElementById('world-clock-display');

    function updateWorldClock() {
        const selectedTimezone = timezoneSelect.value;
        const now = new Date();
        const localTime = now.toLocaleString("en-US", { timeZone: selectedTimezone, timeStyle: "medium", hourCycle: "h23" });
        worldClockDisplay.textContent = `Current time in ${selectedTimezone.replace('_', ' ')}: ${localTime}`;
    }

    timezoneSelect.addEventListener('change', updateWorldClock);
    updateWorldClock();

    const addTimezoneBtn = document.getElementById('add-timezone-btn');
    const multipleClocksContainer = document.getElementById('multiple-clocks');

    function createClockCard(timezone) {
        const clockCard = document.createElement('div');
        clockCard.className = 'clock-card';
        
        const timezoneName = timezone.replace('_', ' ');
        const title = document.createElement('h3');
        title.textContent = timezoneName;
        
        const timeDisplay = document.createElement('p');
        timeDisplay.className = 'time-display';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-clock-btn';
        removeBtn.textContent = 'x';
        
        removeBtn.addEventListener('click', () => {
            multipleClocksContainer.removeChild(clockCard);
        });
        
        clockCard.appendChild(title);
        clockCard.appendChild(timeDisplay);
        clockCard.appendChild(removeBtn);
        multipleClocksContainer.appendChild(clockCard);
        
        function updateClock() {
            const now = new Date();
            const localTime = now.toLocaleString("en-US", { timeZone: timezone, timeStyle: "medium", hourCycle: "h23" });
            timeDisplay.textContent = localTime;
        }
        
        setInterval(updateClock, 1000);
        updateClock(); 
    }

    addTimezoneBtn.addEventListener('click', () => {
        const selectedTimezone = timezoneSelect.value;
        createClockCard(selectedTimezone);
    });
});
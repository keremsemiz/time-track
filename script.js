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
    const toggleClockBtn = document.getElementById('toggle-clock-btn');
    const analogClock = document.getElementById('analog-clock');
    const digitalClock = document.getElementById('digital-clock');
    const digitalTimeDisplay = document.querySelector('.digital-time');

    function updateDigitalClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        digitalTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateDigitalClock, 1000);
    updateDigitalClock(); 

    toggleClockBtn.addEventListener('click', () => {
        if (analogClock.classList.contains('hidden')) {
            analogClock.classList.remove('hidden');
            digitalClock.classList.add('hidden');
            toggleClockBtn.textContent = 'Switch to Digital Clock';
        } else {
            analogClock.classList.add('hidden');
            digitalClock.classList.remove('hidden');
            toggleClockBtn.textContent = 'Switch to Analog Clock';
        }
        
    const timeFormatSelect = document.getElementById('time-format');
    const settingsPanel = document.getElementById('settings-panel');

    function updateDigitalClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        let amPm = '';

        if (timeFormatSelect.value === '12') {
            amPm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; 
        }

        hours = String(hours).padStart(2, '0');
        digitalTimeDisplay.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;
    }

    timeFormatSelect.addEventListener('change', updateDigitalClock);
    setInterval(updateDigitalClock, 1000);
    updateDigitalClock();

    toggleClockBtn.addEventListener('click', () => {
        if (analogClock.classList.contains('hidden')) {
            settingsPanel.classList.remove('hidden');
        } else {
            settingsPanel.classList.add('hidden');
        }
    const worldEventsPanel = document.getElementById('world-events');
    const sunriseSunsetDisplay = document.getElementById('sunrise-sunset');

    function fetchSunriseSunset(timezone) {
        const apiUrl = `https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const sunrise = new Date(data.results.sunrise).toLocaleTimeString("en-US", { timeZone: timezone, timeStyle: "short" });
                const sunset = new Date(data.results.sunset).toLocaleTimeString("en-US", { timeZone: timezone, timeStyle: "short" });
                sunriseSunsetDisplay.textContent = `Sunrise: ${sunrise}, Sunset: ${sunset}`;
            })
            .catch(error => console.error('Error fetching sunrise/sunset data:', error));
    }

    timezoneSelect.addEventListener('change', () => {
        fetchSunriseSunset(timezoneSelect.value);
        worldEventsPanel.classList.remove('hidden');
    });

    const alarmTimeInput = document.getElementById('alarm-time');
    const setAlarmBtn = document.getElementById('set-alarm-btn');
    const alarmStatus = document.getElementById('alarm-status');
    let alarmTime = null;
    let alarmTimeout = null;

    setAlarmBtn.addEventListener('click', () => {
        if (alarmTimeout) {
            clearTimeout(alarmTimeout);
        }

        alarmTime = alarmTimeInput.value;
        if (alarmTime) {
            const [alarmHours, alarmMinutes] = alarmTime.split(':').map(Number);
            const now = new Date();
            const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmHours, alarmMinutes, 0);

            if (alarmDate > now) {
                const timeToAlarm = alarmDate.getTime() - now.getTime();
                alarmTimeout = setTimeout(() => {
                    alert('Alarm ringing!');
                    alarmStatus.textContent = 'Alarm completed';
                }, timeToAlarm);
                alarmStatus.textContent = `Alarm set for ${alarmDate.toLocaleTimeString("en-US", { timeStyle: "short" })}`;
            } else {
                alarmStatus.textContent = 'Selected time has already passed for today.';
            }
        } else {
            alarmStatus.textContent = 'Please select a valid time.';
        }
    const worldMap = document.getElementById('world-map');

    worldMap.addEventListener('click', function(event) {
        const mapWidth = worldMap.clientWidth;
        const mapHeight = worldMap.clientHeight;

        const clickX = event.offsetX;
        const clickY = event.offsetY;

        let selectedTimezone = 'UTC';
        if (clickX < mapWidth / 3) {
            selectedTimezone = 'America/New_York';
        } else if (clickX < 2 * mapWidth / 3) {
            selectedTimezone = 'Europe/London';
        } else {
            selectedTimezone = 'Asia/Tokyo';
        }

        timezoneSelect.value = selectedTimezone;
        updateWorldClock();
        fetchSunriseSunset(selectedTimezone);
        worldEventsPanel.classList.remove('hidden');
    });
});
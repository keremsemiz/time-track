document.addEventListener('DOMContentLoaded', function() {
    const toggleClockBtn = document.getElementById('toggle-clock-btn');
    const addTimezoneBtn = document.getElementById('add-timezone-btn');
    const setAlarmBtn = document.getElementById('set-alarm-btn');

    const analogClock = document.getElementById('analog-clock');
    const digitalClock = document.getElementById('digital-clock');
    const settingsPanel = document.getElementById('settings-panel');
    const timezoneSelect = document.getElementById('timezone');
    const multipleClocksContainer = document.getElementById('multiple-clocks');
    const digitalTimeDisplay = document.querySelector('.digital-time');
    const timeFormatSelect = document.getElementById('time-format');

    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmStatus = document.getElementById('alarm-status');
    let alarmTimeout = null;

    // Analog Clock Functionality
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    function setAnalogClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondsDegrees = ((seconds / 60) * 360) + 90;
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    setInterval(setAnalogClock, 1000);
    setAnalogClock();

    // Toggle between Analog and Digital Clock
    toggleClockBtn.addEventListener('click', function() {
        if (analogClock.classList.contains('hidden')) {
            analogClock.classList.remove('hidden');
            digitalClock.classList.add('hidden');
            settingsPanel.classList.add('hidden');
            toggleClockBtn.textContent = 'Switch to Digital Clock';
        } else {
            analogClock.classList.add('hidden');
            digitalClock.classList.remove('hidden');
            settingsPanel.classList.remove('hidden');
            toggleClockBtn.textContent = 'Switch to Analog Clock';
        }
    });

    // Update Digital Clock with 12/24 Hour Format
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

    setInterval(updateDigitalClock, 1000);
    updateDigitalClock();

    // Add Timezone Clock
    addTimezoneBtn.addEventListener('click', function() {
        const selectedTimezone = timezoneSelect.value;
        createClockCard(selectedTimezone);
    });

    // Create Clock Card for Multiple Time Zones
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

    // Set Alarm Functionality
    setAlarmBtn.addEventListener('click', function() {
        if (alarmTimeout) {
            clearTimeout(alarmTimeout);
        }

        const alarmTime = alarmTimeInput.value;
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
    });
});

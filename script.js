const timerInput = document.querySelector('.timeInput');
const timerInputHiddin = document.querySelector('#timerInputHiddin');

const playBtn = document.querySelector('#play');
const resetBtn = document.querySelector('#reset');

const hoursInput = document.querySelector('.hours');
const minutsInput = document.querySelector('.minutes');
const secondsInput = document.querySelector('.seconds');

timerInput.addEventListener('click', (e) => {
    timerInputHiddin.focus();
})
const nums = `1234567890`
timerInputHiddin.addEventListener('keyup', (e)=>{

    if(!(nums.includes(e.key) || e.key === 'Backspace'))
    e.preventDefault();
    else {
        handelTime(e.target.value)
    }
})

timerInputHiddin.addEventListener('change', (e)=>{
    handelTime(e.target.value)
})

timerInputHiddin.addEventListener('focus', (e)=>{
    timerInput.classList.add('active')
    timerInput.querySelectorAll('.unit').forEach(span => {
        span.classList.add('unsure')
    })
})
timerInputHiddin.addEventListener('blur', (e)=>{
    timerInput.classList.remove('active')
    timerInput.querySelectorAll('.unit').forEach(span => {
        span.classList.remove('unsure')
    })
})


playBtn.addEventListener('click', (e) => {
    if(e.target.dataset.state === 'play'){
        e.target.dataset.state = 'stop';
        e.target.textContent = 'stop';
            window.counter = setInterval(()=>{
            let count = convertTime(timerInputHiddin.value);
            if(count <= 0){
                clearInterval(window.counter)
                e.target.dataset.state = 'play';
                e.target.textContent = 'start';
            }
            timerInputHiddin.value = count;
            handelTime(count);
        },1000)
    }
    else if(e.target.dataset.state === 'stop'){
        e.target.dataset.state = 'play';
        e.target.textContent = 'start';
        clearInterval(window.counter)
    }
})

resetBtn.addEventListener('click', (e) => {
    timerInputHiddin.value = '0';
})

// Functions

function handelTime (timeStr) {
    {
        let time = [];
        if(timeStr.length % 2){
            time.push(`0${timeStr[0]}`);
            for(let i =1; i < timeStr.length; i+=2){
                if(Number(`${timeStr[i]}${timeStr[i+1]}`) > 59)
                    time.push(`59`)
                else
                    time.push(`${timeStr[i]}${timeStr[i+1]}`)
            }
        }
        else {
            for(let i =0; i < timeStr.length; i+=2){
                if(Number(`${timeStr[i]}${timeStr[i+1]}`) > 59)
                    time.push(`59`)
                else
                    time.push(`${timeStr[i]}${timeStr[i+1]}`)
            }
        }

        console.log(time);

        let hours, min, sec, miliSec;
        if(time.length === 3)
        {
            hours = time[0].length === 2 ? time[0] : `0${time[0]}`;
            min = time[1].length === 2 ? time[1] : `0${time[1]}`;
            sec = time[2].length === 2 ? time[2] : `0${time[2]}`;
            miliSec = (Number(hours) * 60 * 60 * 1000) + (Number(min) * 60 * 1000) + (Number(sec) * 1000)
        }
        else if(time.length === 2) {
            hours = undefined;
            min = time[0].length === 2 ? time[0] : `0${time[0]}`;
            sec = time[1].length === 2 ? time[1] : `0${time[1]}`;
            miliSec = (Number(min) * 60 * 1000) + (Number(sec) * 1000)
        }
        else if (time.length === 1){
            hours = undefined;
            min = undefined;
            sec = time[0].length === 2 ? time[0] : `0${time[0]}`;
            miliSec = (Number(sec) * 1000)
        }
        else{
            hours = undefined;
            min = undefined;
            sec = undefined;
            miliSec = 0
        }
        hours ? hoursInput.classList.remove('unsure') : hoursInput.classList.add('unsure')
        min ? minutsInput.classList.remove('unsure') : minutsInput.classList.add('unsure')
        sec ? secondsInput.classList.remove('unsure') : secondsInput.classList.add('unsure')
    
        const secInptArrElem = secondsInput.querySelector('.num');
        const minInptArrElem = minutsInput.querySelector('.num');
        const horsInptArrElem = hoursInput.querySelector('.num');
    
        if(sec)
            secInptArrElem.textContent = sec;
    
        if(min)
            minInptArrElem.textContent = min;
    
        if(hours)
            horsInptArrElem.textContent = hours;
    }
}

function convertTime (timeStr) {
    let time = [];
    if(timeStr.length % 2){
        time.push(`0${timeStr[0]}`);
        for(let i =1; i < timeStr.length; i+=2){
            if(Number(`${timeStr[i]}${timeStr[i+1]}`) > 59)
                time.push(`59`)
            else
                time.push(`${timeStr[i]}${timeStr[i+1]}`)
        }
    }
    else {
        for(let i =0; i < timeStr.length; i+=2){
            if(Number(`${timeStr[i]}${timeStr[i+1]}`) > 59)
                time.push(`59`)
            else
                time.push(`${timeStr[i]}${timeStr[i+1]}`)
        }
    }

    let hours, min, sec, miliSec;
    if(time.length === 3)
    {
        miliSec = ((Number(time[0]) * 60 * 60 * 1000) + (Number(time[1]) * 60 * 1000) + (Number(time[2]) * 1000)) - 1000;
        hours = Math.floor(miliSec / (60 * 60 * 1000));
        min = Math.floor(((miliSec % (60 * 60 * 1000)) / (60 * 1000))) ;
        sec = Math.floor(((miliSec % (60 * 1000)) /  1000));
    }
    else if(time.length === 2) {
        miliSec = (Number(time[0]) * 60 * 1000) + (Number(time[1]) * 1000) - 1000;
        hours = undefined;
        min = Math.floor(((miliSec % (60 * 60 * 1000)) / (60 * 1000))) ;
        sec = Math.floor(((miliSec % (60 * 1000)) /  1000));
    }
    else if (time.length === 1){
        miliSec = (Number(time[0]) * 1000)  - 1000;
        hours = undefined;
        min = undefined;
        sec = Math.floor(((miliSec % (60 * 1000)) /  1000));
    }
    else{
        miliSec = 0
        hours = undefined;
        min = undefined;
        sec = undefined;
    }
    return `${hours || ''}${min || ''}${sec || ''}`
}
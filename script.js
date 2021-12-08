const inputField = document.querySelector('.inputField input')
const addBtn = document.querySelector('.inputField button')
const tasks = document.querySelector('.tasks')
const pendingTasks = document.querySelector('.pendingTasks')
const clearAllbtn = document.querySelector('.footer button')


// makes the add button light up 
inputField.onkeyup = () => {
    let userInput = inputField.value
    if  (userInput.trim() != 0) {
        addBtn.classList.add('active')
    } else {
        addBtn.classList.remove('active')
    }
}

showTasks()

inputField.addEventListener('keypress', (e) => {
    if (e.key == 'Enter' && inputField.value != 0) {
        let userInput = inputField.value
        let getLocalStorage = localStorage.getItem("New Task")
        if (getLocalStorage === null) {
            listArr = []
        } else {
            listArr = JSON.parse(getLocalStorage)
        }
        listArr.push(userInput)
        localStorage.setItem('New Task', JSON.stringify(listArr))
        showTasks()
    }
})

// add user data to localStorage
addBtn.onclick = () => {
    if (inputField.value != 0) {
        let userInput = inputField.value
        let getLocalStorage = localStorage.getItem("New Task")
        if (getLocalStorage === null) {
            listArr = []
        } else {
            listArr = JSON.parse(getLocalStorage)
        }
        listArr.push(userInput)
        localStorage.setItem('New Task', JSON.stringify(listArr))
        showTasks()
    }
}

// add task li tag in tasks ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Task")
    if (getLocalStorage === null) {
        listArr = []
    } else {
        listArr = JSON.parse(getLocalStorage)
    }
    pendingTasks.textContent = listArr.length
    // makes the clear all button light up
    if (listArr.length !== 0) {
        clearAllbtn.classList.add('active')
    } else {
        clearAllbtn.classList.remove('active')
    }
    let newTaskTag = ''
    listArr.forEach((task, index) => {
        newTaskTag += `<li> ${task} <span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    });
    tasks.innerHTML = newTaskTag
    inputField.value = ''
}

// delete task li tag from tasks ul
const deleteTask = (index) => {
    let getLocalStorage = localStorage.getItem("New Task")
    listArr = JSON.parse(getLocalStorage)
    listArr.splice(index, 1)
    // update the localStorage
    localStorage.setItem('New Task', JSON.stringify(listArr))
    showTasks() 
}

// delete all tasks
clearAllbtn.onclick = () => {
    listArr = []
    // update the localStorage
    localStorage.setItem('New Task', JSON.stringify(listArr))
    showTasks()
}


// timer & settings
const settingsBtn = document.getElementById('settings')
const settingsPage =  document.querySelector('.settings-container')
settingsBtn.addEventListener('click', () => {
    settingsPage.classList.toggle('active')
})

// getting timer spans so we can modify them
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')

// getting study time input and save button
const studyInput = document.querySelector('.study-time input')
const saveBtn = document.getElementById('save')

// getting break time input
const breakInput = document.querySelector('.break-time input')

// audio elements
const breakAudio = new Audio('sounds/breaksound.mp3')
const studyAudio = new Audio('sounds/studysound.mp3')


let interval
let countDownSeconds
let countDownMinutes
let isTimerActive = false

saveBtn.onclick = () => {
    stop()
    if (studyInput.value >= 1 && breakInput.value >= 1) {
        minutes.innerHTML = studyInput.value -1
        settingsPage.classList.toggle('active')
    }
    if (studyInput.value >= 1 && breakInput.value >= 1) studyTime()
    else alert('Make sure you have set both times > 1 minute.')
}

function studyTime() {
    isTimerActive = true
    studyAudio.play()
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
    interval = setInterval(start, 1000)
    document.querySelector('.seconds').innerHTML = 59
    countDownSeconds = 59
    countDownMinutes = studyInput.value  -1
    document.querySelector('.mode').innerHTML = 'Study'
}

function start() {
    if (pause == false) {
        countDownSeconds--

        if (countDownSeconds >= 10) {
            document.querySelector('.seconds').innerHTML = countDownSeconds
        } else if (countDownSeconds >= 0){
            document.querySelector('.seconds').innerHTML = '0' + countDownSeconds
        } else {
            countDownMinutes--
            if (countDownMinutes == -1) {
                stop()
                countDownMinutes = breakInput.value - 1
                breakAudio.play()
                breakTime()
                //document.querySelector('.minutes').innerHTML = '0'
                //document.querySelector('.seconds').innerHTML = '00'
            } else {
                document.querySelector('.seconds').innerHTML = 59
                countDownSeconds = 59
                document.querySelector('.minutes').innerHTML = countDownMinutes
            }
        }   
    }
}

function breakTime() {
    interval = setInterval(breakTim, 1000)
    document.querySelector('.minutes').innerHTML = breakInput.value - 1
    document.querySelector('.seconds').innerHTML = 59
    countDownSeconds = 59
    document.querySelector('.mode').innerHTML = 'Break'
}

function breakTim() {
    if (pause == false) {
        countDownSeconds--
        if (countDownSeconds >= 10) {
            document.querySelector('.seconds').innerHTML = countDownSeconds
        } else if (countDownSeconds >= 0) {
            document.querySelector('.seconds').innerHTML = '0' + countDownSeconds
        } else {
            countDownMinutes--
            if (countDownMinutes == -1) {
                stop()
                studyAudio.play()
                studyTime()
            }
            document.querySelector('.seconds').innerHTML = 59
            countDownSeconds = 59
            document.querySelector('.minutes').innerHTML = countDownMinutes
        }
    }
}

function stop() {
    clearInterval(interval)
}

// theme settings
const theme = document.querySelector('.theme')

function toggleDarkMode() {
    document.body.classList.toggle('dark')
    document.querySelector('.time-container').classList.toggle('dark')
    document.querySelector('.task-container').classList.toggle('dark')
    document.querySelector('.settings-container').classList.toggle('dark')
}

theme.addEventListener('click', () => toggleDarkMode())

// pause function
const pauseBtn = document.getElementById('pause')
var pause = false

pauseBtn.addEventListener('click', () => {
    if (pause == true && isTimerActive == true) {
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
        pause = false
    } else if (isTimerActive == true) {
        pauseBtn.innerHTML = '<i class="fas fa-play"></i>'
        pause = true
        
    }
})

// header const contains the first h1 element that is found in the html file
const header = document.querySelector('h1')
// app const contains the div element with id 'app' that contains the calculator
const app = document.getElementById('app')
// ddMenu const contains the div element with id 'ddMenu' that contains the dropdown menu
const ddMenu = document.querySelector('#ddMenu')
// sandwitch const contains the svg elements (of the dropdown menu) that are found in the html file
const sandwitch = document.querySelectorAll('svg')
// html const contains the html element (the html file)
const html = document.documentElement

// toggle function toggles the theme of the site.
const toggle = () => html.classList.toggle('dark')
window.toggle = toggle

// setView function sets the view of the site based on the clicked button.
const setView = (v) => {
    header.innerText = v
    toggleMenu(true)

    if (v === 'Calculator') {
        renderCalculator()
    } else if (v === 'About') {
        renderAbout()
    } else if (v === 'Contact') {
        renderContact()
    }
}
window.setView = setView

// toggleMenu function toggles the visibility of the dropdown menu (when used smartphone view).
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden')
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden')
        })
    } else {
        ddMenu.classList.add('hidden')
        document.querySelectorAll('svg')[0].classList.remove('hidden')
        document.querySelectorAll('svg')[1].classList.add('hidden')
    }
}
window.toggleMenu = toggleMenu

// addRow function adds a div to the calculator that contains buttons.
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`
    container.insertAdjacentHTML('beforeend', row)
}

// addMonitor function adds a div that contains the calculator's monitor.
const addMonitor = (container, text) => {
    const t = text ?? ''
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`
    container.insertAdjacentHTML('beforeend', monitor)
}

// button function returns a div that contains a button.
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : ''
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn dark:bg-gray-700 dark:text-white'>${text}</div>`
}

// menuButton function returns a div that contains a button that is in the header menu.
const menuButton = (text) => {
    return `<button onclick="setView('${text}')">${text}</button>`
}

// ddMenuButton function returns a div that contains a button that is in the dropdown menu.
const ddMenuButton = (text) => {
    return `<button class="block py-1 px-2" onclick="setView('${text}')">${text}</button>`
}

// addButtons function adds buttons to the calculator.
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('')
    addRow(container, btnHTML)
}

// click function executes when a button is clicked.
//  the button is 'calculate', it evaluates the expression in the monitor.
// If the button is 'clear', it clears the monitor.
// Otherwise, it appends the button's text to the monitor.
const click = (event) => {
    const monitor = document.getElementById('monitor')
    const bac = monitor.innerText.trim()
    const a = event.target.innerText
    console.log(a)
    if (a === 'clear') {
        monitor.innerText = ''
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac)
    } else {
        monitor.innerText += a
    }
    fitText('monitor')
}

// fitText function adjusts the font size of the monitor to fit the content.
// It calculates the font size based on the width of the monitor and the content width.
// If the content width is smaller than the monitor width, the font size is increased.
// Otherwise, if the content width is larger than the monitor width, the font size is decreased.
const fitText = (outputSelector) => {
    const outputDiv = document.getElementById(outputSelector)
    const maxFontSize = 36
    const width = outputDiv.clientWidth
    const contentWidth = outputDiv.scrollWidth
    let fontSize = parseInt(window.getComputedStyle(outputDiv).getPropertyValue('font-size'), 10)

    if (contentWidth > width) {
        fontSize = Math.ceil(fontSize * (width / contentWidth))
        fontSize = fontSize > maxFontSize ? maxFontSize : fontSize - 1
        outputDiv.style.fontSize = fontSize + 'px'
    } else {
        while (contentWidth === width && fontSize < maxFontSize) {
            fontSize = Math.ceil(fontSize) + 1
            fontSize = fontSize > maxFontSize ? maxFontSize : fontSize
            outputDiv.style.fontSize = fontSize + 'px'

            const newWidth = outputDiv.clientWidth
            const newContentWidth = outputDiv.scrollWidth
            if (newContentWidth > newWidth) {
                outputDiv.style.fontSize = fontSize - 1 + 'px'
            }
        }
    }
}

// renderCalculator function adds all buttons to the calculator and assigns a listener to the click
// event to each button.
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']
    app.innerHTML = ''
    addMonitor(app)
    addButtons(app, labels)
    const buttons = document.querySelectorAll('.d-btn')
    buttons.forEach((el) => el.addEventListener('click', click))
}
window.renderCalculator = renderCalculator

// renderAbout renders the About page for the site.
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center dark:text-black">Temp for About</div>'
}

// renderContact renders the Contact page for the site.
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center dark:text-black">Temp for Contact</div>'
}

// renderMenu renders the menu buttons for the site.
const renderMenu = () => {
    const menuDiv = document.getElementsByClassName('menu-buttons')[0]
    const menuTexts = ['Calculator', 'About', 'Contact']
    menuDiv.innerHTML = menuTexts.map((t) => menuButton(t)).join('')
    ddMenu.innerHTML = menuTexts.map((t) => ddMenuButton(t)).join('')
}

// renderThemeToggle renders the theme toggle button for the site.
const renderThemeToggle = () => {
    const themeToggleDiv = document.getElementsByClassName('theme-toggle')[0]
    themeToggleDiv.innerHTML =
        '<button class="dark:hidden block" onclick="toggle()">Dark</button>' +
        '<button class="hidden dark:block" onclick="toggle()">Light</button>'
}

renderMenu()
renderThemeToggle()
renderCalculator()

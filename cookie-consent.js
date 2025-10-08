const btnLight = document.getElementById('light');
const btnDark = document.getElementById('dark');
const btnAccept = document.getElementById('accept');
const btnClose = document.getElementById('close');
let currentTheme = "";
const themeCookieAgeInDays = 7;

function setTheme(theme) {
    let classes = document.documentElement.classList;
    let themeToRemove = null;

    if (classes.length > 0) {
        (theme == 'dark') ? themeToRemove = 'light' : themeToRemove = 'dark';
        for (let className of classes) {
            if (className == themeToRemove)
                document.documentElement.classList.remove(themeToRemove);
        }
    }
    document.documentElement.classList.add(theme);    
    currentTheme = theme;
}

function getSystemTheme(){
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
        return darkTheme.matches ? "dark" : "light";
}

function updateThemeButtons(active) {    
    const themes = ['light', 'dark'];

    themes.forEach(theme => {
        const btnElement = document.getElementById(theme);
        const isActive = theme === active;

        btnElement.classList.toggle('is-visible', !isActive);
        btnElement.classList.toggle('is-hidden', isActive);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let theme = getCookie("theme");
    let consent = getCookie("consent");

    if (consent == null || theme == null) theme = getSystemTheme();
    setTheme(theme);
    currentTheme = theme;    
    document.getElementById(theme).classList.add('is-hidden');

    if (consent == 'true')
        document.getElementById('cookie-banner').classList.add('is-hidden');

    btnDark.addEventListener('click', () => {
        setTheme('dark');
        updateThemeButtons('dark')
        currentTheme = 'dark';
        if(consent == 'true') {
            setCookie("theme", currentTheme, themeCookieAgeInDays);
        }
    });

    btnLight.addEventListener('click', () => {
        setTheme('light');
        updateThemeButtons('light');
        currentTheme = 'light';
        if(consent == 'true') setCookie("theme", currentTheme, themeCookieAgeInDays);
    });
    
    btnAccept.addEventListener('click', () => {
        document.getElementById('cookie-banner').classList.add('is-hidden');
        setCookie("theme", currentTheme, themeCookieAgeInDays);
        setCookie("consent", "true", themeCookieAgeInDays);
        consent = "true";
    });

    //The close button just closes the popup for the current session
    btnClose.addEventListener('click', () => { 
        document.getElementById('cookie-banner').classList.add('is-hidden')});
    });

function getCookie (cookieName) { 
    // If cookie exists returns its value, else returns null
    cookieName += "=";
    let cookieValue = null;
    let cookies = decodeURIComponent(document.cookie);
        cookies = cookies.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookieItem = cookies[i].trim();
        if (cookieItem.indexOf(cookieName) == 0) {
            cookieValue = cookieItem.substring(cookieName.length);
            break;
        }
    }
    return cookieValue;
}

function setCookie (cookieName, cookieValue, cookieAgeInDays) {
    // Sets cookie
    document.cookie = `${cookieName}=${cookieValue}; max-age=${cookieAgeInDays * 24 * 60 * 60}; path=/; SameSite=Lax;`;
}
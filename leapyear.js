function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function nextLeapYear(year) {
    while (!isLeapYear(year)) {
        year++;
    }
    return year;
}

const currentYear = 2025; // Example year
const nextLeap = nextLeapYear(currentYear);
console.log(`The next leap year after ${currentYear} is ${nextLeap}`);

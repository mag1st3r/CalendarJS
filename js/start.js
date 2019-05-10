let events = [
eventValue = {'Date': new Date(2019, 04, 17), 'date1': [17, 4, 2019], 'discription': "Бухнуть из Саньком", 'nameEvent': 'Встреча', 'targetEvent': 'Саня Егоров', 'timeEvent': '21:00'},
eventValue = {'Date': new Date(2019, 04, 10), 'date1': [10, 4, 2019], 'discription': "06888888", 'nameEvent': 'Собеседование', 'targetEvent': 'Оксана', 'timeEvent': '14:00'},
eventValue = {'Date': new Date(2019, 04, 4), 'date1': [4, 4, 2019], 'discription': "купить билеты", 'nameEvent': 'Покупка', 'targetEvent': 'Вокзал', 'timeEvent': '9:00'}
];
let settings = {};

let element = document.getElementById('calendar');
calendar(element, events, settings);

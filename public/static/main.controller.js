myApp.controller('MainController', function ($http, MainService) {
    var vm = this;

    // to store guest data from server
    vm.guests = [];

    // to store company data from server
    vm.companies = [];

    // to store message data from server
    vm.messagesList = [];

    // to store user-selected data
    vm.messageObj = {
        company: {},
        guest: {},
        message: {}
    };

    // to display custom message on DOM
    vm.messageToDisplay = "";

    // toggle fields on DOM
    vm.guestsOn = false;
    vm.messagesOn = false;
    vm.displayMessage = false;

    // grab all companies from server
    vm.getCompanies = function () {
        MainService.getCompanies().then(function (response) {
            vm.companies = MainService.companies.list;
        });
    };

    // grab all guests from server
    vm.getGuests = function () {
        MainService.getGuests().then(function (response) {
            vm.guests = MainService.guests.list;
        });
    };
    // grab all messages from server
    vm.getMessages = function () {
        MainService.getMessages().then(function (response) {
            vm.messagesList = MainService.messages.list;
        });
    };

    // set company on DOM and in messageObj
    vm.selectCompany = function (indexValue) {
        vm.guestsOn = true;
        let index = parseInt(indexValue);
        vm.messageObj.company = vm.companies[index];
        vm.getGuests();
    };

    // set guest on DOM and in messageObj
    vm.selectGuest = function (indexValue) {
        vm.messagesOn = true;
        let index = parseInt(indexValue);
        vm.messageObj.guest = vm.guests[index];
        vm.getMessages();
    };

    // set message on DOM and in messageObj
    vm.selectMessage = function (indexValue) {
        vm.displayMessage = true;
        let index = parseInt(indexValue);
        vm.messageObj.message = vm.messagesList[index];
        };

    vm.constructCustomMessage = function() {
        let company = vm.messageObj.company;
        let guest = vm.messageObj.guest;
        let message = vm.messageObj.message;
        vm.messageObj.message.message = vm.customInput;
        vm.constructMessage(company, guest, message);
        vm.displayMessage = true;
    };

    // replace placeholder text in custom message
    vm.constructMessage = function (company, guest, message) {
        let newMsg = vm.messageObj.message.message;
        let placeholders = ["$GREETING", "$FNAME", "$LNAME", "$ROOM", "$TIME", "$COMPANY", "$CITY"];
        let greeting = vm.formatGreeting(company.timezone);
        // convert timestamp in guest json data to milliseconds for use in convertTime function
        let checkoutTime = guest.reservation.endTimestamp * 1000;
        let checkout = vm.convertTime(checkoutTime, company.timezone);
        let replacements = [greeting, guest.firstName, guest.lastName, guest.reservation.roomNumber, checkout.toLocaleString(), company.company, company.city];
        for (let i = 0; i < placeholders.length; i++) {
            newMsg = newMsg.replace(placeholders[i], replacements[i]);
        }
        vm.messageToDisplay = newMsg;
    };

    vm.convertTime = function (time, timezone) {
        let date = new Date(time);
        console.log('date', date);
        
        let localTime = date.getTime();
        console.log('localTime', localTime);
        
        let localOffset = date.getTimezoneOffset() * 60000;

        let utc = localTime + localOffset;

        // select appropriate timezone offset for target property (in hours)
        switch (timezone) {
            case "US/Pacific":
                targetOffset = 8;
                break;
            case "US/Central":
                targetOffset = 6;
                break;
            case "US/Eastern":
                targetOffset = 5;
                break;
            default:
                targetOffset = 0;
        }

        let targetTime = (utc - targetOffset * 3600000);
        let targetDate = new Date(targetTime)

        return targetDate;
    };

    vm.formatGreeting = function (timezone) {
        // select current date and time (based on user's current location)
        let date = new Date();
        // convert to appropriate timezone based on property
        let currentTime = vm.convertTime(date, timezone);
        // convert to hour 
        let currentHour = currentTime.getHours();

        if (currentHour < 12) {
            return "Good morning";
        } else if (currentHour >= 12 && currentHour <= 17) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };
});
myApp.controller('MainController', function ($http, MainService) {
    console.log('in da controller');
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
            console.log('companies in the controller:', vm.companies);
        });
    };

    // grab all guests from server
    vm.getGuests = function () {
        MainService.getGuests().then(function (response) {
            vm.guests = MainService.guests.list;
            console.log('guests in the controller:', vm.guests);
        });
    };
    // grab all messages from server
    vm.getMessages = function () {
        MainService.getMessages().then(function (response) {
            vm.messagesList = MainService.messages.list;
            console.log('messages in the controller:', vm.messagesList);
        });
    };

    // set company on DOM and in messageObj
    vm.selectCompany = function (indexValue) {
        console.log('clicky companies', indexValue);
        vm.guestsOn = true;
        let index = parseInt(indexValue);
        vm.messageObj.company = vm.companies[index];
        console.log('NEW COMPANY OBJECT:', vm.messageObj.company);
        
        vm.getGuests();
    };

    // set guest on DOM and in messageObj
    vm.selectGuest = function (indexValue) {
        console.log('clicky guests', indexValue);
        vm.messagesOn = true;
        let index = parseInt(indexValue);
        vm.messageObj.guest = vm.guests[index];
        console.log('NEW GUEST OBJECT:', vm.messageObj.guest);
        vm.getMessages();
    };

    // set message on DOM and in messageObj
    vm.selectMessage = function (indexValue) {
        console.log('clicky SELECT messages', indexValue);
        vm.displayMessage = true;
        let index = parseInt(indexValue);
        vm.messageObj.message = vm.messagesList[index];
        console.log('NEW MESSAGE OF ALL:', vm.messageObj.message);
        
        };

    // build message object based on user input
    vm.constructMessageObj = function (companyID, guestID, messageID) {
        console.log('custom message with:', companyID, guestID, messageID)
        vm.replacePlaceholders(vm.messageObj.company, vm.messageObj.guest, vm.messageObj.message);

    };

    vm.constructCustomMessage = function() {
        let company = vm.messageObj.company;
        let guest = vm.messageObj.guest;
        let message = vm.messageObj.message;
        // vm.messageObj.message.id = vm.messagesList.length +1;
        // vm.messageObj.message.type = "Custom Message " + (vm.messagesList.length -2);
        vm.messageObj.message.message = vm.customInput;
        console.log('message constructified:', message);
        
        // vm.messagesList.push(message);
        vm.constructMessageObj(company, guest, message);
        vm.displayMessage = true;
        console.log('ALL MESSAGES:', vm.messagesList);
        
    };

    // replace placeholder text in custom message
    vm.replacePlaceholders = function (company, guest, message) {
        let newMsg = vm.messageObj.message.message;
        let placeholders = ["$GREETING", "$FNAME", "$LNAME", "$ROOM", "$TIME", "$COMPANY", "$CITY"];
        let greeting = vm.formatGreeting(company.timezone);
        // convert timestamp in guest json data to milliseconds for use in convertTime function
        let checkoutTime = guest.reservation.endTimestamp * 1000;
        let checkout = vm.convertTime(checkoutTime, company.timezone);
        let replacements = [greeting, guest.firstName, guest.lastName, guest.reservation.roomNumber, checkout, company.company, company.city];
        for (let i = 0; i < placeholders.length; i++) {
            newMsg = newMsg.replace(placeholders[i], replacements[i]);
        }
        console.log('message to display:', newMsg);
        vm.messageToDisplay = newMsg;

    };

    vm.convertTime = function (time, timezone) {
        let date = new Date(time);
        let localTime = date.getTime();
        let localOffset = date.getTimezoneOffset() * 60000;

        let utc = localTime + localOffset;

        // select appropriate timezone offset for target property (in hours)
        switch (timezone) {
            case "US/Pacific":
                targetOffset = 7;
                break;
            case "US/Central":
                targetOffset = 5;
                break;
            case "US/Eastern":
                targetOffset = 4;
                break;
            default:
                targetOffset = 0;
        }

        let targetTime = (utc - targetOffset * 3600000);
        let targetDate = new Date(targetTime);

        console.log('date:', date);
        console.log('utc:', utc);
        console.log('target date:', targetDate);

        return targetDate;
    };

    vm.formatGreeting = function (timezone) {
        // select current date and time (based on user's current location)
        let date = new Date();
        // convert to appropriate timezone based on property
        let currentTime = vm.convertTime(date, timezone);
        // convert to hour 
        let currentHour = currentTime.getHours();
        console.log('current hour at property:', currentHour);
        

        if (currentHour < 12) {
            return "Good morning";
        } else if (currentHour >= 12 && currentHour <= 17) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };
});
myApp.controller('MainController', function ($http, MainService) {
    console.log('in da controller');
    var vm = this;

    // to store guest data from server
    vm.guests = [];

    // to store company data from server
    vm.companies = [];

    // to store message data from server
    vm.messages = [];

    vm.messageObj = {
        company: "",
        guest: "",
        message: ""
    };

    // to store newly created custom message object
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
            vm.messages = MainService.messages.list;
            console.log('messages in the controller:', vm.messages);
        });
    };

    vm.selectCompany = function (companyID) {
        console.log('clicky companies', companyID);
        vm.guestsOn = true;
        vm.messageObj.company = companyID;
        console.log('messageObj:', vm.messageObj);
        vm.getGuests();
    };

    vm.selectGuest = function (guestID) {
        console.log('clicky guests', guestID);
        vm.messagesOn = true;
        vm.messageObj.guest = guestID;
        console.log('messageObj:', vm.messageObj);
        vm.getMessages();
    };

    vm.selectMessage = function (messageID) {
        console.log('clicky messages', messageID);
        vm.displayMessage = true;
        vm.messageObj.message = messageID;
        console.log('messageObj:', vm.messageObj);
        // vm.displayMessage();

    };

    vm.displayMessage = function (companyID, guestID, messageID) {
        console.log('custom message with:', companyID, guestID, messageID);
    };
});
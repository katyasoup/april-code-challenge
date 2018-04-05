myApp.controller('MainController', function ($http, MainService) {
    console.log('in da controller');
    var vm = this;

    // to store guest data from server
    vm.guests = [];

    // to store company data from server
    vm.companies = [];

    // to store message data from server
    vm.messages = [];

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

    vm.selectCompany = function () {
        console.log('clicky companies');
        vm.guestsOn = true;
        vm.getGuests();
    };

    vm.selectGuest = function () {
        console.log('clicky guests');
        vm.messagesOn = true;
        vm.getMessages();
    };

    vm.displayMessage = function () {
        console.log('clicky messages');
        vm.displayMessage = true;
    };
});
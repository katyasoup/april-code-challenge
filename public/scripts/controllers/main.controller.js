myApp.controller('MainController', function ($http, MainService) {
    console.log('in da controller');
    var vm = this;

    // to store guest data from server
    vm.guests = {};

    // to store company data from server
    vm.companies = {};

    // to store message data from server
    vm.messages = {};

    vm.guestsOn = false;
    vm.messagesOn = false;
    vm.displayMessage = false;

    // grab all companies from server
    vm.getCompanies = function () {
       MainService.getCompanies();
    };
    // grab all guests from server
    vm.getGuests = function () {
        MainService.getGuests();
    };
    // grab all messages from server
    vm.getMessages = function () {
        MainService.getMessages();
    };

    vm.selectCompany = function () {
        console.log('clicky companies');
        vm.guestsOn = true;
    };

    vm.selectGuest = function () {
        console.log('clicky guests');
        vm.messagesOn = true;
    };

    vm.displayMessage = function () {
        console.log('clicky messages');
        vm.displayMessage = true;
    };
    // vm.getAllData = function () {
    //     vm.getGuests();
    //     vm.getCompanies();
    //     vm.getMessages();
    // };

    // get all data on page load
    // vm.getAllData();
});
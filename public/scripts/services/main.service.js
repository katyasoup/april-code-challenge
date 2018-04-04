myApp.service('MainService', function ($http) {
    console.log('in da service');

    var sv = this;

    sv.companies = {
        list: []
    };
    sv.guests = {
        list: []
    };
    sv.messages = {
        list: []
    };


    sv.getCompanies = function () {
        console.log('in getCompanies func');
        return $http({
            method: 'GET',
            url: '/companies',
        }).then(function (response) {
            console.log('in main.service and back from server with:', response);
            sv.companies.list = response.data;
            console.log('companies:', sv.companies);
        });
    };

    sv.getGuests = function () {
        console.log('in getGuests func');
        return $http({
            method: 'GET',
            url: '/guests',
        }).then(function (response) {
            console.log('in main.service and back from server with:', response);
            sv.guests.list = response.data;
            console.log('guests:', sv.guests);
        });
    };

    sv.getMessages = function () {
        console.log('in getMessages func');
        return $http({
            method: 'GET',
            url: '/messages',
        }).then(function (response) {
            console.log('in main.service and back from server with:', response);
            sv.messages.list = response.data;
            console.log('messages:', sv.companies);
        });
    };
});
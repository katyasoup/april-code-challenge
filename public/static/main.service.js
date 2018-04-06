myApp.service('MainService', function ($http) {
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
        return $http({
            method: 'GET',
            url: '/companies',
        }).then(function (response) {
            sv.companies.list = response.data;
        });
    };

    sv.getGuests = function () {
        return $http({
            method: 'GET',
            url: '/guests',
        }).then(function (response) {
            sv.guests.list = response.data;
        });
    };

    sv.getMessages = function () {
        return $http({
            method: 'GET',
            url: '/messages',
        }).then(function (response) {
            sv.messages.list = response.data;
        });
    };
});
var app = angular.module("contactsMini", ["ui.router", "ngResource"]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state("index", {
            url: "/home",
            templateUrl: "app/home/home.tmpl.html",
            controller: HomeController
        });

});

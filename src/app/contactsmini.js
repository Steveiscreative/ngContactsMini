var app = angular.module("contactsMini", ["ui.router", "ngResource"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    // Default
    $urlRouterProvider.otherwise("/home");

    // States
    $stateProvider
        .state("index", {
            url: "/home",
            templateUrl: "app/home/home.tmpl.html",
            controller: HomeController
        })
        .state("add", {
            url: "/contact/add",
            templateUrl: "app/contact/add/add.tmpl.html",
            controller: AddContactController
        })
        .state("view", {
            url: "/contact/:id",
            templateUrl: "app/contact/view/view.tmpl.html",
            controller: ViewContactController
        })
        .state("edit", {
            url: "/contact/:id/edit",
            templateUrl: "app/contact/edit/edit.tmpl.html",
            controller: EditContactController
        });

});

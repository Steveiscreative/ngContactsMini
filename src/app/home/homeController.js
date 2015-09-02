app.controller('HomeController', HomeController);
function HomeController(ContactsService) {
    var home = this;
    ContactsService.query(function(d) {
        home.contacts = d;
    });
}
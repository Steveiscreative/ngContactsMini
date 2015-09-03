app.controller('AddContactController', AddContactController);
function AddContactController(ContactsService, $state) {
    var add = this;
    add.addContact = function(data) {
        ContactsService.save(data, function(){
            $state.go('index');
        });
    }
}
app.controller("ViewContactController", ViewContactController);
function ViewContactController(ContactsService, $stateParams){
    var contact = this;
    var contact_id = $stateParams.id;
    ContactsService.get({id: contact_id}, function(d){
        contact.info = d;
    });
}
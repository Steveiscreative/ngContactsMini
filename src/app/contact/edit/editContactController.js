app.controller('EditContactController', EditContactController);

function EditContactController(ContactsService, $location, $stateParams, $state) {

    var contact = this;
    var contact_id = $stateParams.id;

    ContactsService.get({id: contact_id}, function (d) {
        contact.info = d;
    });

    contact.update = function (data) {

        var currentContact = ContactsService.get({id: contact_id}, function () {
            if (data.first_name) {
                currentContact.first_name = data.first_name;
            }
            if (data.last_name) {
                currentContact.last_name = data.last_name;
            }
            if (data.phone_number) {
                currentContact.phone_number = data.phone_number;
            }
            if (data.email) {
                currentContact.email = data.email;
            }
            if (data.address_1) {
                currentContact.address_1 = data.address_1;
            }
            if (data.address_2) {
                currentContact.address_2 = data.address_2;
            }

            currentContact.$update();

        });

        $location.path('/contact/' + contact_id);
    }

    contact.delete = function () {
        var initDelete = window.confirm('Would you like to delete this contact?');
        if (initDelete) {
            var contact = ContactsService.get({id: contact_id}, function () {
                contact.$delete();
                $state.go('index');
            });
        }
    }
}
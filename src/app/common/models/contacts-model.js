/**
 * Contacts Service
 * Interacts with the contact api
 */
app.factory('ContactsService', function($resource) {
    return $resource('/api/contacts/:id', {'id': '@_id'}, {
        update: {
            method: 'PUT'
        }
    });
});
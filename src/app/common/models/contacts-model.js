
app.factory('ContactsService', function($resource) {
    //return $resource
    return $resource('/api/contacts/:id');
});
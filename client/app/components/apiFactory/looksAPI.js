/**
 * Created by yanglu on 1/31/17.
 */
(function () {
    'use strict'

    angular
        .module('app')
        .factory('looksAPI', looksAPI);

    looksAPI.$inject = ['$http'];

    function looksAPI($http) {
        return ({

            getAllLooks: getAllLooks,
            createScrapeLook: createScrapeLook,
            getUserLooks: getUserLooks,
            findOneLook: findOneLook,
            getUpdateLook: getUpdateLook,
            updateLook: updateLook,
            popLooks: popLooks,
            deleteLook: deleteLook,
            upVoteLook: upVoteLook,
            addView: addView


        });

        function getAllLooks() {
            return $http.get('/api/look/getAllLooks',{
                cache: true //not query the page over and over
            });
        }
        
        function createScrapeLook(look) {
            return $http.post('/api/look/scrapeUpload', look);
        }
        //passing useremail
        function getUserLooks(id) {
            return $http.get('/api/look/getUserLooks/?email=' + id,{
                cache: true
            });
        }
        
        function findOneLook(look) {
            console.log(look);
            return $http.get('/api/look/' + look);
        }
        
        function popLooks(look) {
            return $http.get('/api/look/popLooks' + look);
        }
        
        function getUpdateLook(look) {
            return $http.get('/api/look/' + look._id);
        }

        function updateLook(look) {
            return $http.put('/api/look' + look._id, look);
        }
        
        function deleteLook(look) {
            return $http.delete('/api/look/' + look._id);
        }
        function upVoteLook(look) {
            return $http.put('/api/look/upvote/' + look._id);
        }
        function addView(look) {
            return $http.put('/api/look/view' + look);
        }
    }
})();
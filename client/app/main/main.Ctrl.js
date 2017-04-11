(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  //add $modal -->angular strap
  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal','looksAPI','scrapeAPI','$alert','Upload' ]; //'$http'

  function MainCtrl($scope, $state, Auth, $modal, looksAPI, scrapeAPI, $alert, Upload) { //$http
      //getting user model
    $scope.user = Auth.getCurrentUser();

    $scope.look = {};
    $scope.looks = [];

    $scope.scrapePostForm = true;

    $scope.showScrapeDetails = false;
    $scope.gotScrapeResults = false;
    $scope.loading = false;

    $scope.picPreview = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;

    //infinite scroll
    $scope.busy = true;
    $scope.allData = [];


    var page = 0;
    //init loaded
    var step = 2;

    //for success and failure
      var alertSuccess = $alert({
          title: 'success',
          content: "New Look Added",
          placement: 'top-right',
          container: '#alertContainer',
          type: 'success',
          duration: 8

      });

      var alertfail = $alert({
          title: 'Not saved',
          content: 'New Look failed to save',
          placement: 'top-right',
          container: '#alertContainer',
          type: 'warning',
          duration: 8
      })

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function () {
        myModal.$promise.then(myModal.show);
    };

    $scope.showUploadForm = function () {
        $scope.uploadLookForm = true;
        $scope.scrapePostForm = false;
        $scope.uploadLookTitle = false;
    }

    //populate the page with all the looks
    looksAPI.getAllLooks()
        .then(function (data) {
            console.log(data);
            //$scope.looks = data.data;
            $scope.allData = data.data;
            $scope.nextPage();
            $scope.busy = false;
        })
        .catch(function (err) {
            console.log('failed to get looks' + err);
        });

        $scope.nextPage = function () {
            var lookLength = $scope.looks.length;
            if ($scope.busy){
                return;
            }
            $scope.busy = true;
            $scope.looks = $scope.looks.concat($scope.allData.splice(page * step, step));
            page++;
            $scope.busy = false;
            if ($scope.looks.length === 0) {
                $scope.noMoreData = true;
            }
        };





    //watch for changes to URL, Scrape and display results
    $scope.$watch('look.link',function (newVal, oldVal) {
        if (newVal.length > 5) {
            //大于5之后做post
            $scope.loading = true;
      //  }
            var link = {
                url: $scope.look.link
            }
            scrapeAPI.getScrapeDetails(link)
      //   $http.post('/api/links/scrape', {
      //       url: $scope.look.link
      //   })
            .then(function (data) {
                console.log(data);
                $scope.showScrapeDetails = true;
                $scope.gotScrapeResults = true;
                $scope.uploadLookTitle = false;
                $scope.look.imgThumb = data.data.img;
                $scope.look.description = data.data.desc;
            })
            .catch(function (data) {
                console.log('failed to return from scrape');
                $scope.loading = false;
                $scope.look.link = '';
                $scope.gotScrapeResults = false;
            })
        //in case something time out
        .finally(function () {
            $scope.loading = false;
            $scope.uploadLookForm = false;
        });

        }
    });
    
    $scope.addVote = function (look) {
        looksAPI.upVoteLook(look)
            .then(function (data) {
                console.log(data);
                look.upVotes++;
            })
            .catch(function (err) {
                console.log('failed adding upvote');
            });
    }
    
    //addLookModal --> ng-submit addScrapePost
    $scope.addScrapePost = function () {
        var look= {
            description: $scope.look.description,
            title: $scope.look.title,
            image: $scope.look.imgThumb,
            linkURL: $scope.look.link,
            email: $scope.user.email,
            _creator: $scope.user._id
        }
         looksAPI.createScrapeLook(look)
       //$http.post('/api/look/scrapeUpload', look)
            .then(function (data) {
                alertSuccess.show(); //show success alert on top right
                $scope.showScrapeDetails = false;
                $scope.gotScrapeResults = false;
                $scope.look.title = '';
                $scope.look.link = '';
                $scope.looks.splice(0,0,data.data); //data.data getting the entire obj
                console.log(data);
            })
            .catch(function () {
                console.log('failed to post');
                alertfail.show();
                $scope.showScrapeDetails = false;
            });
    }
    
    $scope.uploadPic = function (file) {
        Upload.upload({
            url: 'api/look/upload',
            headers: {
                'Content-Type': 'mutipart/form-data'
            },
            data: {
                file: file,
                title: $scope.look.title,
                description: $scope.look.description,
                email: $scope.user.email,
                name: $scope.user.name,
                linkURL: $scope.look._id,
                _creator: $scope.user._id

            }
        }).then(function (resp) {
            console.log('successful upload');
            $scope.looks.splice(0, 0, resp.data); //pushing successful obj into view
            $scope.look.title = '';
            $scope.look.description = '';
            $scope.picFile = '';
            $scope.picPreview = false;
            alertSuccess.show();
        }, function (resp) {
            alertfail.show();
        }, function (evt) { //event
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress:' + progressPercentage + '%' + evt.config.data.file.name)
        });
    }
  }
})();
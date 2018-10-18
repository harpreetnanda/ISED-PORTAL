'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ['$scope', '$uibModal', 'masterSvc', function( $scope, $uibModal, masterSvc) {
  console.log ('in home ctrl');
  
  var promise = masterSvc.getTenantsRemote();
  promise.then (
    function(payload){
      $scope.tenants = payload.data;
      masterSvc.setTenantsLocal (payload.data);
      console.log (payload.data);
    }
  )

  $scope.openRegister = function (){
    var parentElem = undefined; 
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'templates/rhsso_register.html',
      controller: 'registerCtrl',
      controllerAs: '$scope',
      // size: 'lg',
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  }

  $scope.openDetails = function (tenant) {
    console.log ('TENANT:' + tenant);
    masterSvc.setCurrentTenant (tenant);
    var parentElem = undefined; 
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'templates/tabview.html',
      controller: 'apiDetailsCtrl',
      controllerAs: '$scope',
      size: 'lg',
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.info('Modal dismissed at: ' + new Date());
    });

};

}])

.controller('registerCtrl', function ($scope, $uibModalInstance){
  $scope.ok = function () {
    $uibModalInstance.close();
  };
})

.controller('apiDetailsCtrl', function ($scope, $uibModalInstance, masterSvc, tenantSvc) {
    var currTenant = masterSvc.getCurrentTenant();
    
    $scope.tenantDetail = {};
    $scope.mappingList = {};
    $scope.tenantDetail = masterSvc.getTenantDetail(currTenant);
    var promise = tenantSvc.getMappingList($scope.tenantDetail.id , 24);
    promise.then (
      function(payload){
        $scope.mappingList = payload.data;
        console.log("This is the mapping list data " + payload  );
        console.log("This is the other mapping list data now " + payload  );

      }
    )
    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.changeTab = function (api) {
      var tid = $scope.tenantDetail.id;
      var sid = api.service.id;
      var promise = tenantSvc.getMappingList (tid, sid);
      promise.then (
        function(payload){
          // mapping_rules [{id: 16, metric_id: 21, pattern: "/", http_method: "GET", delta: 1, …}]
          $scope.mappingList = payload.data.mapping_rules;
          console.log (payload.data.mapping_rules[0]);
        }
      )      
    }
  });
angular.module('myApp.services', ['ui.bootstrap'])
.factory('modalFactory', function($uibModal) {
    return {
      open: function(size, template, params) {
        return $uibModal.open({
          animation: true,
          templateUrl: template || 'myModalContent.html',
          controller: 'ModalResultInstanceCtrl',
          size: size,
          resolve: {
            params: function() {
              return params;
            }
          }
        });
      }
    };
  })

.service ('tenantSvc', function ($http){
    var getMappingList = function (tid, sid){
        // http://localhost:8001/threescale/tenants/10/mappinglist/10
        baseurl = 'http://3scale-portal.df24.ised-dev.openshiftapps.com/threescale/tenants/' + tid + '/mappinglist/' + sid;
        return $http.get(baseurl);
    }

    return {
        getMappingList : getMappingList
    }
})

.service ('masterSvc', function ($http){
    var baseurl = 'http://3scale-portal.df24.ised-dev.openshiftapps.com/threescale/tenants';
    var currTenant = "";
    var localTenants = [];

    var getTenantsRemote = function (){
        return $http.get(baseurl);
    }

    var getTenantsLocal = function (){
        return localTenants;
    }

    var setTenantsLocal = function (tenants){
        localTenants = tenants;
    }

    var setCurrentTenant = function (tenant){
        currTenant = tenant;
    }

    var getCurrentTenant = function (){
        return currTenant;
    }

    var getTenantDetail = function (tenant){
        var detail = {};

        localTenants.forEach ( function (item, index, array){
            if (item.name === tenant){
                console.log (item)
                detail = item;
            }
        });
        return detail;
    }

    return {
        getTenantsRemote : getTenantsRemote,
        getCurrentTenant : getCurrentTenant,
        setCurrentTenant : setCurrentTenant,
        setTenantsLocal : setTenantsLocal,
        getTenantsLocal : getTenantsLocal,
        getTenantDetail : getTenantDetail
    }
})

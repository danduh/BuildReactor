import 'common/directives/buildGroup/buildGroup';
import 'rx/dist/rx.coincidence';
import 'rx/dist/rx.binding';
import Rx from 'rx';
import ngModule from 'common/directives/module';
import templateUrl from 'common/directives/service/service.html';

ngModule.directive('service', () => ({
    restrict: 'E',
    scope: {
        service: '=serviceInfo',
        viewConfig: '='
    },
    templateUrl,
    replace: true,
    controller($scope, $element, $attrs, $transclude) {
        let rxSubscription;
        $scope.$watch('service', (service) => {
            const items = $scope.service ? $scope.service.items : [];
            let groups = [];
            if (rxSubscription) {
                rxSubscription.dispose();
            }
            rxSubscription = Rx.Observable.fromArray(items)
                .select((build) => {
                    build.group = build.group || '';
                    return build;
                })
                .groupBy((build) => build.group)
                .selectMany((groupBy) => groupBy
                    .toArray()
                    .select((groupedItems) => ({
                        name: groupBy.key,
                        items: groupedItems
                    }))
                )
                .toArray().subscribe((d) => {
                    groups = d;
                });
            $scope.groups = groups;
        });
    }
}));


let _T = [{
    "baseUrl": "teamcity",
    "name": "Develop",
    "projects": ["NgWeb_RealiNgEcho_LibrariesTestAndBuild_ImageUploader", "NgWeb_RealiNgEcho_LibrariesTestAndBuild_Logger", "NgWeb_RealiNgEcho_LibrariesTestAndBuild_WebCore", "NgWeb_RealiNgEcho_ApplicationsTest_EchoUnitTest", "NgWeb_RealiNgEcho_ApplicationsTest_WebAppUnitTest", "NgWeb_Deployments_EchoDeployment", "NgWeb_Deployments_WebAppDeployment"],
    "url": "http://141.226.20.85:8888",
    "username": "daniel",
    "password": "Reali2018",
    "branch": "develop",
    "updateInterval": 60
}, {
    "baseUrl": "teamcity",
    "name": "QA",
    "projects": ["NgWeb_E2eTests_EchoE2e", "NgWeb_RealiNgEcho_ApplicationsTest_EchoUnitTest", "NgWeb_RealiNgEcho_LibrariesTestAndBuild_ImageUploader", "NgWeb_RealiNgEcho_LibrariesTestAndBuild_Logger", "NgWeb_RealiNgEcho_LibrariesTestAndBuild_WebCore", "NgWeb_Deployments_WebAppDeployment", "NgWeb_E2eTests_WebAppE2e", "NgWeb_RealiNgEcho_ApplicationsTest_WebAppUnitTest", "NgWeb_Deployments_EchoDeployment"],
    "url": "http://141.226.20.85:8888",
    "username": "daniel",
    "password": "Reali2018",
    "branch": "develop",
    "updateInterval": 60,
    "disabled": false
}, {
    "baseUrl": "teamcity",
    "name": "Staging",
    "projects": ["NgWeb_Deployments_EchoDeployment", "NgWeb_RealiNgEcho_ApplicationsTest_EchoUnitTest", "NgWeb_RealiNgEcho_LibrariesTestAndBuild_ImageUploader", "NgWeb_RealiNgEcho_LibrariesTestAndBuild_Logger", "NgWeb_RealiNgEcho_LibrariesTestAndBuild_WebCore", "NgWeb_Deployments_WebAppDeployment", "NgWeb_RealiNgEcho_ApplicationsTest_WebAppUnitTest"],
    "url": "http://141.226.20.85:8888",
    "username": "daniel",
    "password": "Reali2018",
    "branch": "staging",
    "updateInterval": 60
}, {
    "baseUrl": "teamcity",
    "name": "Production",
    "projects": ["ProdNgWeb_Deployments_EchoDeployment", "ProdNgWeb_E2eTests_EchoE2e", "ProdNgWeb_RealiNgEcho_ApplicationsTest_EchoUnitTest", "ProdNgWeb_RealiNgEcho_LibrariesTestAndBuild_ImageUploader", "ProdNgWeb_RealiNgEcho_LibrariesTestAndBuild_Logger", "ProdNgWeb_RealiNgEcho_LibrariesTestAndBuild_WebCore", "ProdNgWeb_Deployments_WebAppDeployment", "ProdNgWeb_E2eTests_WebAppE2e", "ProdNgWeb_RealiNgEcho_ApplicationsTest_WebAppUnitTest"],
    "url": "http://141.226.20.85:8888",
    "username": "daniel",
    "password": "Reali2018",
    "branch": "master",
    "updateInterval": 60
}]

var app = angular.module("routingApp", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $qProvider) {
	
	$locationProvider.html5Mode(true);
	/*$urlMatcherFactoryProvider.caseInsensitive(true);*/
	
	$qProvider.errorOnUnhandledRejections(false);
	$urlRouterProvider.otherwise("/Home");
	
	$stateProvider
	.state("Home",{
		url : "/Home",
		templateUrl: "/webpages/home.html",
		controller: "homeCtrl",
		controllerAs: "home",
		data : {
			props : "this is value is passed from home state configuration"
		}
		
	})
	.state("Courses",{
		url : "/Courses",
		templateUrl: "/webpages/courses.html",
		controller: "coursesCtrl",
		controllerAs: "ctrl",
		data : {
			props : "this is value is passed from Courses state configuration"
		}
	})
	.state("StudentParent",{
		url : "/Students",
		templateUrl: "/webpages/studentParent.html",
		controller: "studentParentCtrl",
		controllerAs: "ctrl",
		resolve :{
			studentTotals :function(){
				return {
					males : 9,
					females : 0,
					total : 9
				}
			} 
		},
		abstract : true
	})
	.state("StudentParent.Students",{
		url : "/",
		views :{
			"institutionInfo" : {
				templateUrl: "/webpages/grandTotal.html",
				controller: "grandTotalCtrl",
				controllerAs: "ctrl"
			},
			"studentsInfo" : {
				templateUrl: "/webpages/students.html",
				controller: "studentsCtrl",
				controllerAs: "ctrl"
			}
		}
		
	})
	.state("StudentParent.StudentDetail",{
		url : "/:id",
		views : {
			"studentsInfo" : {
				templateUrl: "/webpages/studentDetail.html",
				controller: "studentDetailCtrl",
				controllerAs: "ctrl"
			}
		}
	});
});


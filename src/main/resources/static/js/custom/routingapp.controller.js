(function(){
	var routingApp = angular.module("routingApp")
	.controller("homeCtrl", function($state) {
		console.log("custom data from current state : " + $state.current.data.props);
		console.log("custom data from courses state : " + $state.get("Courses").data.props);
		this.message = "Welcome AngularJs with Spring Boot";
	})
	.controller("coursesCtrl", function(courseService) {
		var self = this;
		courseService.getCourses().then(function(courses){
			self.courses = courses;
		});
	})
	.controller("studentParentCtrl", function(studentTotals) {
		this.studentTotals = studentTotals;
	})
	.controller("grandTotalCtrl", function(studentTotals) {
		this.total = studentTotals.total;
	})
	.controller("studentsCtrl", function(studentService, $state, $scope, $location, studentTotals) {
		var slef = this;
		this.totalStudents = studentTotals.total;
		studentService.getStudents().then(function(students){
			slef.students = students;
		});
		
		/*$scope.$on("$routeChangeStart", function(event, next, current) {
			if(!confirm("Are sure you want to leave this page to " + next.$$route.originalPath)){
				event.preventDefault();
			}
		});*/
		this.reloadStudents = function(){
			console.log("route reload will occur");
			$state.reload();
		};
		
		this.search = function(){
			if(this.keyword){
				$location.url("/Students/"+ this.keyword);
			}
			else{
				alert("please enter a keyword");
			}
		};
		
		/*$scope.$on("$locationChangeStart", function(event, next, current) {
			if(!confirm("Are sure you want to leave this page to " + next)){
				event.preventDefault();
			}
		});*/
		
		
		/**
		 * all route change events
		 * routeChangeStart
		 * routeChangeSuccess
		 * locationChangeStart
		 * locationChangeSuccess
		 * */
		
	})
	.controller("studentDetailCtrl", function(studentService,$stateParams) {
		var slef = this;
		studentService.getStudent($stateParams.id).then(function(student){
			slef.student = student;
		});
	})
})();
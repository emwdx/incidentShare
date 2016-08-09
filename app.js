
if (Meteor.isClient) {
  Meteor.startup(function(){




Meteor.subscribe('housePoints',function(){

Session.set('housePointsDataLoaded',true);

});
Meteor.subscribe('votes');

Meteor.subscribe('students',function(){

  Session.set('data_loaded', true);

});

Meteor.subscribe('incidents');

Meteor.subscribe('chatMessages');
Meteor.subscribe('activities');
Meteor.subscribe('activitySession');
Meteor.subscribe('systemVariables');
Meteor.subscribe('users');
Meteor.subscribe('kkwai');
});




  //Accounts.config({forbidClientAccountCreation: false});

  Session.set("currentlySelectedStudent","");
  Session.set("validateStudentInfo", false)
  Session.set('data_loaded', false);

  Template.header.helpers({

  myHousePointsThisWeek: function(){
  if(Session.get('housePointsDataLoaded')){
  var today = new Date();
  var lastSunday = new Date(today.getTime()-today.getDay()*86400*1000);
  var myHousePoints = HousePoints.find({reportedBy: Meteor.user().username,recordedTimeStamp:{$gte:lastSunday,$lte:today}});
  var totalPoints = 0;
  myHousePoints.forEach(function(entry){

  totalPoints += parseFloat(entry.points);


  });

  Session.set('currentUserHousePointsThisWeek',totalPoints);

  return Session.get('currentUserHousePointsThisWeek');
  }

  },
  isTeacher:function(){

   return Roles.userIsInRole(Meteor.userId(),['teacher','admin']);

  }

  });
  /*
  Template.mainContent.helpers({

  isTeacher: function(){
  return Roles.userIsInRole(Meteor.user(),['teacher','admin']);
  },
  isStudent: function(){
  return Roles.userIsInRole(Meteor.user(),['student']);

  }


  });
  Template.userBar.helpers({

  isTeacher: function(){
  return Roles.userIsInRole(Meteor.user(),['teacher','admin']);
  },
  isStudent: function(){
  return Roles.userIsInRole(Meteor.user(),['student']);

  }


  });

*/

 Template.loginForm.helpers({

   IsLoggingIn: function(){return Meteor.loggingIn()}

 });


Template.viewIncidents.helpers({
    currentStudent: Session.get("currentlySelectedStudent"),

    incidents: function(){
        var currentStudent = Session.get("currentlySelectedStudent")
        return Incidents.find({name:currentStudent},{sort:{date:-1}})

    }


});

Template.studentPointsList.helpers({
    currentStudent: Session.get("currentlySelectedStudent"),

    addPoints: function(){
        var currentStudent = Session.get("currentlySelectedStudent");
        if(currentStudent){
        var housePoints = housePoints.find({name:currentStudent},{sort:{date:-1}});
        if(housePoints){
        return housePoints;
        }
        else{return null};
        }
        else{ return null}
    }


});



Template.dragonTimeLocation.helpers({

dragonTimeLocationString: function(){

 var location = systemVariables.findOne({name:'dragonTimeLocation'});
 if(location){return location.value}

}


});

Template.studentSignupForm.events({

'click #studentSignupCreateButton': function(e){
e.preventDefault();
var studentEmail = $('#signupInputEmail').val();
var studentPassword = $('#signupInputPassword').val();
var studentVerify = $('#signupVerifyPassword').val();

var studentID = parseInt($('#signupStudentID').val());
var studentName = $('#signupLastName').val().toUpperCase();

if(studentName.length<3){studentName+=' '};


var emptyInputs = 0;
var inputsVerified = true;
$('.signupForm').each(function(){

 if($(this).val()==''){emptyInputs++;}

}

);

Meteor.call('validateStudent',studentID, studentName, getServerResultValidate);

var isValidated = Session.get('validateStudentInfo');

if(emptyInputs>0){inputsVerified = false;
                 alert('Fill out all fields before submitting.');
                 }

else if(studentPassword!=studentVerify){
alert('Passwords do not match.');


}

else if(!isValidated){

alert('Check your student ID and last name and enter again.')

}

else{

profile = {studentID:studentID,group:'student'};

newUser = {
email: studentEmail,
username:(studentName.toLowerCase()+$('#signupStudentID').val()),
password:studentPassword,
profile:profile
};

Accounts.createUser(newUser,function(e){alert(e)});

}

}


});




Template.registerHelper('isAdminUser',function(){

return Roles.userIsInRole(Meteor.user(), ['admin']);


});

Template.registerHelper('isTeacher',function(){

return Roles.userIsInRole(Meteor.user(), ['teacher','admin']);


});

Template.registerHelper('isStudent',function(){

return Roles.userIsInRole(Meteor.user(), ['student']);


});

Template.adminTemplate.rendered = function(){



}

} //End of client only

loadData = function(){

}


var getServerResultValidate = function(err,result){
if(err){console.log(err)}
else{Session.set('validateStudentInfo',result);}

}



function loginResult(message) {
if(message){
Session.set('loginMessage',message);
alert(message.reason);
}
else{Router.go('/')}
this.next()

}

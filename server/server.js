//Accounts.config({forbidClientAccountCreation: false});

Accounts.validateNewUser(function (user) {
   var loggedInUser = Meteor.user();

   if (Roles.userIsInRole(loggedInUser, ['admin'])) {
     // NOTE: This example assumes the user is not using groups.
     return true;
   }

   throw new Meteor.Error(403, "Not authorized to create new users");
 });

Meteor.publish('students', function() {
if(this.userId){
currentUser = Meteor.users.findOne({_id:this.userId});

    if(Roles.userIsInRole(currentUser,['teacher','admin'])){
    return Students.find({},{fields:{advisor:1,gender:1,grade:1,house:1,name:1}});
    }
     else if(Roles.userIsInRole(currentUser,['student'])){
         return Students.find({studentID:currentUser.profile.studentID});
     }
}
    else{return null}

});

Meteor.publish('incidents', function() {
if(this.userId){
currentUser = Meteor.users.findOne({_id:this.userId});
    if(Roles.userIsInRole(currentUser,['teacher','admin'])){
    return Incidents.find({schoolYear:'14-15'});
}
     else{return null};
}
else{return null;}
});

Meteor.publish('chatMessages', function() {
if(this.userId){
currentUser = Meteor.users.findOne({_id:this.userId});
    if(Roles.userIsInRole(currentUser,['teacher','admin'])){
    return ChatMessages.find({schoolYear:'15-16'});
}
     else{return null};
}

else{return null}
});



Meteor.publish('housePoints', function() {


     return HousePoints.find({schoolYear:"15-16"});

});

Meteor.publish('systemVariables',function(){

     return systemVariables.find();



});

Meteor.publish('kkwai',function(){

if(this.userId){

  return Currency.find({schoolYear:'15-16'});

}


});

Meteor.publish('votes',function(){
    if(this.userId){
   return Votes.find({});
    }
    else{return Votes.find({},{fields:{choices:1,voteDescription:1,active:1}})}
});




Meteor.methods({

validateStudent: function(currentStudentID,currentStudentName){

var selectedStudent = Students.findOne({studentID:currentStudentID});


if(selectedStudent){

   return((currentStudentID == selectedStudent.studentID)&&(currentStudentName == selectedStudent.name.slice(0,3)));

}
else{return false};
},

getRandomStudentInfo: function(){

var returnedStudents = Students.find().fetch();
if(returnedStudents){

var students = returnedStudents[Math.round(Math.floor(Math.random()*returnedStudents.length))];
  return students;

}

else{

   return {house:"P",grade:13,gender:'Martian'};
}
}


});



ChatMessages.allow({

insert: function(){

 return Roles.userIsInRole(currentUser,['teacher','admin']);

},
update: function(){

 return Roles.userIsInRole(currentUser,['teacher','admin']);

}


});

Students.allow({

insert: function(){

 return Roles.userIsInRole(currentUser,['teacher','admin']);

},
update: function(){

 return Roles.userIsInRole(currentUser,['teacher','admin']);

},

remove: function(){
return Roles.userIsInRole(currentUser,['teacher','admin']);

}
});

systemVariables.allow({

insert: function(){

 return Roles.userIsInRole(currentUser,['teacher','admin']);

},
update: function(){

return Roles.userIsInRole(currentUser,['teacher','admin']);

}
});

HousePoints.allow({

insert: function(){

 return Roles.userIsInRole(currentUser,['teacher','admin']);

},
update: function(){

return Roles.userIsInRole(currentUser,['teacher','admin']);

},
remove:function(){

return Roles.userIsInRole(currentUser,['teacher','admin']);
}
});

Incidents.allow({

insert: function(){

 return Roles.userIsInRole(currentUser,['teacher','admin']);

},
update: function(){

return Roles.userIsInRole(currentUser,['teacher','admin']);
}
});

Votes.allow({

insert: function(){

return Roles.userIsInRole(currentUser,['teacher','admin']);

},
update: function(){

return Roles.userIsInRole(currentUser,['teacher','admin']);

}

})

Currency.allow({

insert: function(){

 return Roles.userIsInRole(currentUser,['teacher','admin']);

},

remove: function(){

return Roles.userIsInRole(currentUser,['teacher','admin']);

},

update: function(){

return Roles.userIsInRole(currentUser,['teacher','admin']);

}

});


Accounts.onCreateUser(function(options, user){
  var role = ['student'];
  user.roles = role
  return user;
});

Meteor.publish("users", function () {
  var user = Meteor.users.findOne({_id:this.userId});

  if (Roles.userIsInRole(user, ["admin","teacher"])) {

    return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles: 1,username:1}});
  }

  this.stop();
  return;
});

Meteor.startup(function () {
        // bootstrap the admin user if they exist -- You'll be replacing the id later
        if (Meteor.users.findOne("yHKt4YzTuxeEdx53h")){
            Roles.addUsersToRoles("yHKt4YzTuxeEdx53h", ['admin']);
            }
        if(!Meteor.roles.findOne({name: "teacher"}))
                        Roles.createRole("teacher");

        if(!Meteor.roles.findOne({name: "student"}))
                        Roles.createRole("student");




});

Accounts.config({forbidClientAccountCreation: false}); 

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find();
  } else {
    this.ready();
  }
});

Meteor.publish('students', function() { 
if(this.userId){
currentUser = Meteor.users.findOne({_id:this.userId});

    if(currentUser.profile.group=='teacher'){
    return Students.find();
    }
     else if(currentUser.profile.group=='student'){
         return Students.find({studentID:currentUser.profile.studentID});
     }
}
    else{return null}
    
});

Meteor.publish('incidents', function() { 
if(this.userId){
currentUser = Meteor.users.findOne({_id:this.userId});    
    if(currentUser.profile.group=='teacher'){
    return Incidents.find({schoolYear:'14-15'});
}
     else{return null};
}
else{return null;}
});

Meteor.publish('chatMessages', function() { 
if(this.userId){
currentUser = Meteor.users.findOne({_id:this.userId});    
    if(currentUser.profile.group=='teacher'){
    return ChatMessages.find({schoolYear:'14-15'});
}
     if(currentUser.profile.group=='student'){return null};
}
    
else{return null}
});

Meteor.publish('activities', function() { 
if(this.userId){
currentUser = Meteor.users.findOne({_id:this.userId});     
    if(currentUser.profile.group=='teacher'){
    return Activities.find();
    }
     if(currentUser.profile.group=='student'){return null};
}
else{return null;}
});

Meteor.publish('housePoints', function() { 
         
     
     return HousePoints.find({schoolYear:"14-15"});
     
});
Meteor.publish('activitySession',function(){
if(this.userId){
currentUser = Meteor.users.findOne({_id:this.userId});       
    if(currentUser.profile.group=='teacher'){
     return ActivitySession.find();   
    }
    else{return null;}
}
else{return null;}
    
});
Meteor.publish('systemVariables',function(){
   
     return systemVariables.find();   
   
    
    
});

Meteor.publish('kkwai',function(){
    
if(this.userId){
    
  return Currency.find();  
    
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
}
    
    
});



ChatMessages.allow({
    
insert: function(){
    
 return Meteor.user();   
    
},
update: function(){
    
 return Meteor.user();   
    
}
    
    
});

Students.allow({
    
insert: function(){
    
 return true//(Meteor.user().profile.group=='teacher');   
    
},
update: function(){
    
 return (Meteor.user().profile.group=='teacher');   
    
},
    
remove: function(){
return (Meteor.user().profile.group=='teacher');      
    
}
});
    
systemVariables.allow({
    
insert: function(){
    
 return (Meteor.user().profile.group=='teacher');    
    
},
update: function(){

return (Meteor.user().profile.group=='teacher');   
    
}
});

HousePoints.allow({
    
insert: function(){
    
 return (Meteor.user().profile.group=='teacher');    
    
},
update: function(){

return (Meteor.user().profile.group=='teacher');   
    
}
});

Incidents.allow({
    
insert: function(){
    
 return (Meteor.user().profile.group=='teacher');      
    
},
update: function(){

return (Meteor.user().profile.group=='teacher');   
    
}
});

Votes.allow({
    
insert: function(){
    
return (Meteor.user().profile.group=='teacher');   
    
},
update: function(){
    
return true;   
    
}
    
})

Currency.allow({
    
insert: function(){
    
 return (Meteor.user().profile.group=='teacher');   
    
},
    
remove: function(){
    
return (Meteor.user().profile.group=='teacher');    
    
},
    
update: function(){
    
return (Meteor.user().profile.group=='teacher'); 
    
}
    
});

Meteor.users.deny({
   update: function(){return true;},
   
    
});

Accounts.onCreateUser(function(options, user) {
  
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = {group:'student'};
  return user;
});

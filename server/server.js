Accounts.config({forbidClientAccountCreation: true}); 

Meteor.publish('students', function() { 
    
    if(this.userId){
    return Students.find();
    }
     else{return null};
    
});

Meteor.publish('incidents', function() { 
    
    if(this.userId){
    return Incidents.find({schoolYear:'14-15'});
}
     else{return null};
});
Meteor.publish('chatMessages', function() { 
    
    if(this.userId){
    return ChatMessages.find({schoolYear:'14-15'});
}
     else{return null};
});

Meteor.publish('activities', function() { 
    
    if(this.userId){
    return Activities.find();
}
     else{return null};
});

Meteor.publish('housePoints', function() { 
         
     
     return HousePoints.find({schoolYear:"14-15"});
     
});
Meteor.publish('activitySession',function(){
   
    if(this.userId){
     return ActivitySession.find();   
    }
    else{return null;}
    
    
});
Meteor.publish('systemVariables',function(){
   
     return systemVariables.find();   
   
    
    
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
    
 return Meteor.user();   
    
},
update: function(){
    
 return Meteor.user();   
    
}
});
    
systemVariables.allow({
    
insert: function(){
    
 return Meteor.user();   
    
},
update: function(){

return Meteor.user();
    
}
});

HousePoints.allow({
    
insert: function(){
    
 return Meteor.user();   
    
},
update: function(){

return Meteor.user();
    
}
});

Incidents.allow({
    
insert: function(){
    
 return Meteor.user();   
    
},
update: function(){

return Meteor.user();
    
}
});

Votes.allow({
    
insert: function(){
    
return Meteor.user();    
    
},
update: function(){
    
return true;   
    
}
    
})

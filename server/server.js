Accounts.config({forbidClientAccountCreation: true}); 

Meteor.publish('students', function() { 
    if(Meteor.isServer){
        return Students.find();
    }
    else if(this.userId){
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
    
   return Votes.find();
    
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
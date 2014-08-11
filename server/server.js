Accounts.config({forbidClientAccountCreation: true}); 

Meteor.publish('students', function() { 
    
    if(this.userId){
    return Students.find();
    }
     else{return null};
});

Meteor.publish('incidents', function() { 
    
    if(this.userId){
    return Incidents.find();
}
     else{return null};
});
Meteor.publish('chatMessages', function() { 
    
    if(this.userId){
    return ChatMessages.find();
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
         
     
     return HousePoints.find();
     
});
Meteor.publish('activitySession',function(){
   
    if(this.userId){
     return ActivitySession.find();   
    }
    else{return null;}
    
    
});
Meteor.publish('systemVariables',function(){
   
    if(this.userId){
     return systemVariables.find();   
    }
    else{return null;}
    
    
});


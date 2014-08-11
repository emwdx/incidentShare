 Template.incidentList.helpers({
  
  incidents: function(){
  
  retrievedIncidents = Incidents.find({},{sort:{recordedTimeStamp:-1,date:-1}});
  return retrievedIncidents;
  
  }
  
  });
  
Template.incidentList.events({
    
'dblclick tr': function(event){
if(Meteor.user().emails[0].address == 'eweinberg@scischina.org'){
 event.stopPropagation();
 Incidents.remove({_id:this._id});
}
    
}
    
    
});

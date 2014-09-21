 Template.activitySessionAdd.rendered = function(){
    
   $("#activityAdminSessionDate").datepicker(); 
    
};

Template.activitySessionAdd.events({


'click .activityQuarterSelect': function(e){
e.stopPropagation();
 selected = $(e.currentTarget);

 
 $('.activityQuarterSelect').removeClass('selected');
 $(selected).addClass('selected');
 var selected = $(e.currentTarget).attr('id') ;
 var selectedIndex;
    
    
    Session.set('activityAdminSelectedQuarter',searchObject);    
    if(selected== 'activityAdminSelectQ1'){selectedIndex = 1;}
    else if(selected == 'activityAdminSelectQ2'){selectedIndex = 2}
    else if(selected == 'activityAdminSelectQ3'){selectedIndex = 3}
    else{selectedIndex=4}
    searchObject['activityQuarters.0']= false;
    searchObject['activityQuarters.1']= false;
    searchObject['activityQuarters.2']= false;
    searchObject['activityQuarters.3']= false;
    
    searchString = 'activityQuarters.'+String(selectedIndex-1);
    searchObject[searchString]=true;
    Session.set('activityAdminSelectedQuarter',searchObject);
    
},
'click .activitiesAdminList': function(e){
    
 var selected = e.currentTarget;
 if($(selected).hasClass('selected')){ $(selected).removeClass('selected')}
else{ $(selected).addClass('selected');}
    
    
},
'click #activityAdminSessionSubmit':function(e){
e.preventDefault();
var selectedIndex;
    
var selected = $('.activityQuarterSelect.selected').attr('id');   
   if(selected== 'activityAdminSelectQ1'){selectedIndex = 1;}
    else if(selected == 'activityAdminSelectQ2'){selectedIndex = 2}
    else if(selected == 'activityAdminSelectQ3'){selectedIndex = 3}
    else{selectedIndex=4}

   selectedActivities = [];
   retrievedActivities = $('.activitiesAdminList.selected');
   retrievedActivities.each(function(){ selectedActivities.push($(this).attr('id'))});
    
var sessionObject = {
    
  sessionName: $('#activityAdminSessionName').val(),
  sessionDate: $('#activityAdminSessionDate').val(),
  sessionQuarter: selectedIndex,
  sessionActivities: selectedActivities  }
         
  
    
console.log(sessionObject);  
var alreadyExists = ActivitySession.findOne({sessionName:sessionObject.sessionName});
if(alreadyExists){
    alert('A session with that name already exists!');
    
}
else{ActivitySession.insert(sessionObject);
    Router.go('/admin/activities/'); }
    
    
}

    
});
    
Template.activitySessionAdd.helpers({
    

activitiesAdminShowActivities: function(){
    
    
    currentQuarter = Session.get('activityAdminSelectedQuarter');
    
    return Activities.find(currentQuarter);
    
    
}
    
});

Template.activitiesAdminSystemSettings.helpers({

   canSignUp: function(){
    
    return (Session.equals('activityAdminParentsCanSignUp','true'));   
    
    
},
teachersCanEdit: function(){
    
    return checkOrX(Session.equals('activityAdminTeachersCanEdit','true'));

    
},
    
parentsCanView: function(){
    
    return checkOrX(Session.equals('activityAdminParentsCanView','true'));
    
},

parentsCanSignUp: function(){
    
    return checkOrX(Session.equals('activityAdminParentsCanSignUp','true'));
    
}    
     
});

Template.activitiesAdminSystemSettings.events({

'click #activitiesAdminTeachersEdit': function(){
    
 if(Session.equals('activityAdminTeachersCanEdit','true')){
     Session.set('activityAdminTeachersCanEdit','false');
 }
    else{
     Session.set('activityAdminTeachersCanEdit','true');   
        
    }
    
},
'click #activitiesAdminParentsView': function(){
    
 if(Session.equals('activityAdminParentsCanView','true')){
     Session.set('activityAdminParentsCanView','false');
 }
    else{
     Session.set('activityAdminParentsCanView','true');   
        
    }
    
},
    
'click #activitiesAdminParentsSignUp': function(){
    
 if(Session.equals('activityAdminParentsCanSignUp','true')){
     Session.set('activityAdminParentsCanSignUp','false');
 }
    else{
     Session.set('activityAdminParentsCanSignUp','true');   
        
    }
    
}
 });

Template.activitySessionEdit.helpers({
sessionName: function(){
var currentlySelectedSession = Session.get('currentlySelectedActivitySession');    
var currentSession = ActivitySession.findOne({_id:currentlySelectedSession});
if(currentSession){
return currentSession.sessionName;
}
else{return null};
},
sessionDate: function(){
var currentlySelectedSession = Session.get('currentlySelectedActivitySession');    
var currentSession = ActivitySession.findOne({_id:currentlySelectedSession});
if(currentSession){
return currentSession.sessionDate;
}
else{return null};
},
sessionQuarter: function(){
var currentlySelectedSession = Session.get('currentlySelectedActivitySession');    
var currentSession = ActivitySession.findOne({_id:currentlySelectedSession});
if(currentSession){
return currentSession.sessionName;
}
else{return 'blank'};
},

    
});

Template.activitySessionEdit.rendered = function(){
    
   $("#activityAdminSessionEditDate").datepicker(); 
    
};

Template.activitySessionEdit.events({


'click .activityQuarterSelect': function(e){
e.stopPropagation();
 selected = $(e.currentTarget);

 
 $('.activityQuarterSelect').removeClass('selected');
 $(selected).addClass('selected');
 var selected = $(e.currentTarget).attr('id') ;
 var selectedIndex;
    
    
    Session.set('activityAdminSelectedQuarter',searchObject);    
    if(selected== 'activityAdminSelectQ1'){selectedIndex = 1;}
    else if(selected == 'activityAdminSelectQ2'){selectedIndex = 2}
    else if(selected == 'activityAdminSelectQ3'){selectedIndex = 3}
    else{selectedIndex=4}
    searchObject['activityQuarters.0']= false;
    searchObject['activityQuarters.1']= false;
    searchObject['activityQuarters.2']= false;
    searchObject['activityQuarters.3']= false;
    
    searchString = 'activityQuarters.'+String(selectedIndex-1);
    searchObject[searchString]=true;
    Session.set('activityAdminSelectedQuarter',searchObject);
    
},
'click .activitiesAdminList': function(e){
    
 var selected = e.currentTarget;
 if($(selected).hasClass('selected')){ $(selected).removeClass('selected')}
else{ $(selected).addClass('selected');}
    
    
},
'click #activityAdminSessionSubmit':function(e){
e.preventDefault();
var selectedIndex;
    
var selected = $('.activityQuarterSelect.selected').attr('id');   
   if(selected== 'activityAdminSelectQ1'){selectedIndex = 1;}
    else if(selected == 'activityAdminSelectQ2'){selectedIndex = 2}
    else if(selected == 'activityAdminSelectQ3'){selectedIndex = 3}
    else{selectedIndex=4}

   selectedActivities = [];
   retrievedActivities = $('.activitiesAdminList.selected');
   retrievedActivities.each(function(){ selectedActivities.push($(this).attr('id'))});
    
var sessionObject = {
    
  sessionName: $('#activityAdminSessionName').val(),
  sessionDate: $('#activityAdminSessionDate').val(),
  sessionQuarter: selectedIndex,
  sessionActivities: selectedActivities  }
         
  
    
console.log(sessionObject);  
var alreadyExists = ActivitySession.findOne({sessionName:sessionObject.sessionName});
if(alreadyExists){
    alert('A session with that name already exists!');
    
}
else{ActivitySession.insert(sessionObject);
    Router.go('/admin/activities/'); }
    
    
}

    
});

Template.activityAdminPanel.helpers({
    
activitySession: function(){return ActivitySession.find()}    
    
    
});

Template.activityAdminPanel.events({
'click .activitySessionDelete':function(e){
e.preventDefault()
var verified = confirm('Are you sure you want to delete this session?');
if(verified){ActivitySession.remove({_id:this._id});}
    
    
},
'click .activitySessionEdit':function(e){
e.preventDefault()
Session.set('currentlySelectedActivitySession',this._id);
Router.go('/admin/activities/edit/');
    
    
}
    
    
})

function checkOrX(value){
    
 if(value){ return 'icon-ok'}
 else{ return 'icon-remove'}  
    
}
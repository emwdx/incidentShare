


if (Meteor.isClient) {
    
    

 
  Accounts.config({forbidClientAccountCreation: true}); 
  Session.set("currentlySelectedStudent","");
   
  Template.mainContent.helpers({
  selectStudent: function(){
  
  return (Session.get('selectStudent')=='True');
  
  },
  browseLog: function(){
  
  return (Session.get('browseLog')=='True');
  
  },
  housePoints: function(){
  
  return (Session.get('housePoints')=='True');
  
  },
  
  isActivitiesAdmin: function(){
  
  return (Session.get('isActivitiesAdmin')=='True');
  
  },
   showActivities: function(){
  
  return (Session.get('showActivities')=='True');
  
  }
   
  
  })
  
  Template.selectGrade.events({
  	'change #grade' : function(){
  	Session.set('selectedGrade',$('#grade').val());
  	
  	}
    
  });
    
  Template.teacherButtonBar.events({
  
  'click #selectStudent': function(event){
  event.preventDefault(); 
  Session.set('selectStudent','True');
  Session.set('browseLog','False');
  Session.set('housePoints','False');
  Session.set('showActivities','False');
  $('li').removeClass('active');
  $(event.currentTarget).addClass('active')
  },
  'click #browseLog': function(event){
   event.preventDefault(); 
  Session.set('selectStudent','False');
  Session.set('browseLog','True');
  Session.set('housePoints','False');
  Session.set('showActivities','False');
  $('li').removeClass('active');
  $(event.currentTarget).addClass('active')
  Session.set("currentlySelectedStudent","");
  
  },
  'click #housePoints': function(event){
   event.preventDefault(); 
  Session.set('selectStudent','False');
  Session.set('browseLog','False');
  Session.set('housePoints','True');
  Session.set('showActivities','False');
  $('li').removeClass('active');
  $(event.currentTarget).addClass('active')
  Session.set("currentlySelectedStudent","");
  
  },
  'click #showActivities': function(event){
   event.preventDefault(); 
    
  Session.set('selectStudent','False');
  Session.set('browseLog','False');
  Session.set('housePoints','False');
  Session.set('showActivities','True');
  $('li').removeClass('active');
  $(event.currentTarget).addClass('active')
  Session.set("currentlySelectedStudent","");
  
  }
  
  });
  Template.teacherButtonBar.helpers({
      isEvan: function(){
          
       return Meteor.user().emails[0].address=='eweinberg@scischina.org';   
          
      }
      
  })
    
  
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
    
   



}

loadData = function(){
 
}


function activitiesClearSelection(){

Session.set("activitySelectedDay", "0");
Session.set("activitySelectedGrade","-10");
}
    
function getForum(){
FEED_URL = 'https://hz.scis-his.net/recent-forum-posts.xml';
 $.get(FEED_URL, function (data) {
    $(data).find("title").each(function () { // or "item" or whatever suits your feed
        var el = $(this);

        console.log("------------------------");
        console.log("title      : " + el.find("title").text());
        
    });
});   
    
    
}


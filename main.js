


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
  Router.go('/');
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
    
Template.studentPointsList.helpers({
    currentStudent: Session.get("currentlySelectedStudent"),
    
    addPoints: function(){
        var currentStudent = Session.get("currentlySelectedStudent");
        if(currentStudent){
        return housePoints.find({name:currentStudent},{sort:{date:-1}})
        }
        else{ return null}
    }
    
    
});
       
Template.loginForm.events({
    
'click #loginButton': function(e){

 e.preventDefault();
 var email = $('#inputEmail').val();
 var password = $('#inputPassword').val();
 Meteor.loginWithPassword(email, password,loginResult);
 
    
    
}
    
    
});
    
Template.studentInformationFrontPage.helpers({
    
dragonTimeLocation: function(){
    
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
var studentID = $('#signupStudentID').val();
var studentLastName = $('#signupLastName').val();

var emptyInputs = 0;
var inputsVerified = true;
$('.signupForm').each(function(){
    
 if($(this).val()==''){emptyInputs++;}   

}
                      
);
if(emptyInputs>0){inputsVerified = false;
                 alert('Fill out all fields before submitting.');
                 }

if(studentPassword!=studentVerify){
alert('Passwords do not match.'); 
    
    
}


    
}
    
    
});

    
    
    

} //End of client only 

loadData = function(){
 
}


function activitiesClearSelection(){

Session.set("activitySelectedDay", "0");
Session.set("activitySelectedGrade","-10");
}
    
function loginResult(message) {
if(message){
Session.set('loginMessage',message);
alert(message.reason);
}
    
}


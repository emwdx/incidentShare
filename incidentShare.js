
Students = new Meteor.Collection('students');
Incidents = new Meteor.Collection('incidents');
HousePoints = new Meteor.Collection('housePoints');
ChatMessages = new Meteor.Collection('chatMessages');
Activities = new Meteor.Collection('activities');



if (Meteor.isClient) {
 
      
 Router.configure({ layoutTemplate: 'outline'});
    
  Router.map(function() {
      
      this.route('mainContent', {path: '/'});
      this.route('showActivities',{path:'/showActivities/'});
      this.route('confirmationPage', { 
          path: '/registrationConfirmation/:_id/:code/',
          data: function() { return Runners.findOne({runnerRegistrationCode:this.params.code}); },
          waitOn: function() {return Meteor.subscribe('runners', {limit:this.params.code} )}
      });
        
  });

  Accounts.config({forbidClientAccountCreation: true}) 
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
  
  
  
  
  
  Template.housePointsList.helpers({
  
  addPoints: function(){
  
  retrievedPointsActivity = HousePoints.find({},{sort:{recordedTimeStamp:-1,date:-1}}).fetch();
  return retrievedPointsActivity;
  
  
  },
  houseClass: function(student){
  
  if(this.house=='G'){
  return "text-success";
  }
  
  else if(this.house=='Y'){
  
  return "text-warning";
  
  }
  
  else if(this.house=='B'){
  
  return "text-info";
  
  }
  
  else if(this.house=='R'){
  return "text-error";
  }
  else{
      
   return "no-house"   
      
  }
  }
  
  
  });
  
  Template.housePointsTotals.helpers({
    spring:function(){
    pointsCursor = HousePoints.find({house:"G"}).fetch();
    points = 0;
    pointsCursor.forEach(function(housepoints){
        points+=parseInt(housepoints.points);
        
    })
    return points;
    
        
    },
    summer:function(){
    pointsCursor = HousePoints.find({house:"R"}).fetch();
    points = 0;
    pointsCursor.forEach(function(housepoints){
        points+=parseInt(housepoints.points);
        
    })
    return points;
    
        
    },
    fall:function(){
    pointsCursor = HousePoints.find({house:"Y"}).fetch();
    points = 0;
    pointsCursor.forEach(function(housepoints){
        points+=parseInt(housepoints.points);
        
    })
    return points;
    
        
    },
    winter:function(){
    pointsCursor = HousePoints.find({house:"B"}).fetch();
    points = 0;
    pointsCursor.forEach(function(housepoints){
        points+=parseInt(housepoints.points);
        
    })
    return points;
    
        
    }
      
      
  });
 
  
  Template.loginForm.events({
  
  'click #loginButton': function(e){
  e.preventDefault()
  var username = $('#inputEmail').val();
  var password = $('#inputPassword').val();
  
  Meteor.loginWithPassword(username,password);
  
  
  
  }
  
  
  });

 Template.loginForm.helpers({
     
   IsLoggingIn: function(){return Meteor.loggingIn()}
     
     
 });

 Template.chatWindow.events({
     
   'click #sendChatMessage': function(e){
       
    e.preventDefault();
    var newMessage = {
        
    submittedAt: new Date(),
    user: Meteor.user().username,
    message: $('#chatMessage').val()
        
        
    }
    
    ChatMessages.insert(newMessage);
    $('#chatMessage').val('');
       
   }
     
     
 });
Template.viewIncidents.helpers({
    currentStudent: Session.get("currentlySelectedStudent"),
    
    incidents: function(){
        var currentStudent = Session.get("currentlySelectedStudent")        
        return Incidents.find({name:currentStudent},{sort:{date:-1}})
    
    }
    
    
});
    
    
Template.chatWindow.helpers({
  
    chatMessage: ChatMessages.find({},{sort:{submittedAt:-1}})
     
     
 });
    
Template.chatLine.cleanDate = function(date){
       
    return date.toTimeString().split(' ')[0];
       
   }
    


Template.selectedStudentInformation.helpers({
    
   studentIsSelected: function(){
    var selectedStudent = Session.get("currentlySelectedStudent");
    if(selectedStudent==""){return false}
    else{ return true}
    
       
   },
   houseClass: function(){
       
    var selectedStudent = Session.get("currentlySelectedStudent");
    var currentStudent = Students.findOne({name:selectedStudent});
  if(currentStudent.house=='G'){
  return "text-success";
  }
  
  else if(currentStudent.house=='Y'){
  
  return "text-warning";
  
  }
  
  else if(currentStudent.house=='B'){
  
  return "text-info";
  
  }
  
  else if(currentStudent.house=='R'){
  return "text-error";
  }
  else{
      
   return '';
      
  }
       
   }
  
    
    
    
});
Template.selectedStudentInformation.events({
  
 'click .submitIncident': function(event){
  event.preventDefault();
  event.stopPropagation();
  var currentStudentName = Session.get("currentlySelectedStudent");
  var newIncident = {
                recordedTimeStamp: new Date,
				date: new Date().toDateString(),
				name: currentStudentName,
				
				comments: $(event.target).parent().find('[name=comment]').val(),
				user: Meteor.user().username
				}
	Incidents.insert(newIncident);
	
    Session.set("currentlySelectedStudent","");
     $(".student").removeClass('selected');
    },
   
   'click .viewIncidents': function(event){
    event.preventDefault();
    event.stopPropagation();
    $('#viewIncidents').modal('show');
    
             
   },
   'click .addHousePoints': function(event){
  
   event.preventDefault();
   event.stopPropagation();
   var currentStudentName = Session.get("currentlySelectedStudent");
  
   var retrievedName = Students.find({name:currentStudentName}, {fields: {house: 1}}).fetch();
   console.log(retrievedName);  
   var currentHouse = retrievedName[0].house;
		
   
   var earnedPoints = {
        recordedTimeStamp: new Date,
   		date: new Date().toDateString(),
   		student: currentStudentName,
   		points: $("#addHousePoints").val(),
   		comments: $(event.currentTarget).parent().find('[name=pointsComments]').val(),
   		house: currentHouse,
   		reportedBy: Meteor.user().username
  		 };
   
   
   HousePoints.insert(earnedPoints);
   
   
   Session.set("currentlySelectedStudent","");
    $(".student").removeClass('selected');
   },
     
 'click .editProfile': function(e){
  e.preventDefault();
  e.stopPropagation();
  
  var currentStudentName = Session.get('currentlySelectedStudent');
  currentStudent = Students.findOne({name:currentStudentName});
  
  $('#editStudent').find('[name=studentName]').val(currentStudent.name);
  $('#editStudent').find('[name=grade]').val(currentStudent.grade);
  $('#editStudent').find('[name=studentID]').val(currentStudent.studentID);
  $('#editStudent').find('[name=advisor]').val(currentStudent.advisor);
  $('#editStudent').find('[name=dob]').val(currentStudent.dob);
  $('#editStudent').find('[name=house]').val(currentStudent.house);
  $('#editStudent').find('[name=guardianemail1]').val(currentStudent.guardianemail1);
  $('#editStudent').find('[name=guardianemail2]').val(currentStudent.guardianemail2);
  $('#editStudent').find('[name=fatherphone]').val(currentStudent.fatherphone);
  $('#editStudent').find('[name=motherphone]').val(currentStudent.motherphone);
  $('#editStudent').find('[name=nationality]').val(currentStudent.nationality);
  $('#editStudent').find('[name=gender]').val(currentStudent.gender);
  
 $('#editStudent').modal('show');
     
     
 },
 'submit #formSelectedStudent': function(e){
  e.preventDefault();
     
     
 }


    
    
});



}

loadData = function(){
 
}



Meteor.subscribe('housePoints');
Meteor.subscribe('votes');
if(Meteor.user){
Meteor.subscribe('students');
Meteor.subscribe('incidents');

Meteor.subscribe('chatMessages');
Meteor.subscribe('activities');
Meteor.subscribe('activitySession');
Meteor.subscribe('systemVariables');

}

Template.selectGrade.events({
  	'change #grade' : function(){
  	Session.set('selectedGrade',$('#grade').val());
    Session.set("currentlySelectedStudent","");
  	
  	}
    
  });

Template.studentList.rendered = function(){
  
  $('.entry').hide();
  
  }
  
  Template.studentList.helpers({
  students: function(){
  
  selectedGrade = Session.get('selectedGrade')
  
    retrievedStudents = Students.find({grade:parseInt(selectedGrade)},{sort: {name: 1}}).fetch();
  
  return retrievedStudents;
  
    
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
  
  else{
  return "text-error";
  }
  }
    
  });

 Template.studentList.events({
  'click .student':function(event){
  currentStudent = this.name
  $(".student").removeClass('selected');
  $(event.currentTarget).addClass('selected');
  Session.set("currentlySelectedStudent",currentStudent);
  
  }
   
  });


Template.addStudents.events({
    

'click #addStudentButton':function(e){
e.preventDefault();
e.stopPropagation();
var formObject = $(e.currentTarget).parent().parent()  
var name = formObject.find('[name=studentName]').val()
var grade = parseInt(formObject.find('[name=grade]').val())
var studentID = parseInt(formObject.find('[name=studentID]').val())
var advisor = formObject.find('[name=advisor]').val()
var gender = formObject.find('[name=gender]').val()
var house = formObject.find('[name=house]').val()
var dob = formObject.find('[name=dob]').val()
var nationality = formObject.find('[name=nationality]').val()
var guardianemail1 = formObject.find('[name=guardianemail1]').val()
var guardianemail2 = formObject.find('[name=guardianemail2]').val()
var fatherphone = formObject.find('[name=fatherphone]').val()
var motherphone = formObject.find('[name=motherphone]').val()

var newStudent = {grade:grade,
                  name:name,
                  studentID:studentID,
                  advisor:advisor,
                  gender:gender,
                  dob:dob,
                  nationality:nationality,
                  guardianemail1:guardianemail1,
                  guardianemail2:guardianemail2,
                  fatherphone:fatherphone,
                  motherphone:motherphone,
                  house:"G"}


Students.insert(newStudent);
$('#addStudent').modal('hide');
}
    
    
    
});

Template.editStudents.events({
    
    
'click .deleteStudent': function(e){
 
    e.stopPropagation();
    e.preventDefault();
    var studentName = Session.get('currentlySelectedStudent');
    selectedStudent = Students.findOne({name:studentName});
    Students.remove({_id:selectedStudent._id});
    $('#editStudent').modal('hide');    
  
},
'click #updateStudentButton': function(e){

e.preventDefault();
e.stopPropagation();
var formObject = $(e.currentTarget).parent().parent()  
var name = formObject.find('[name=studentName]').val()
var grade = parseInt(formObject.find('[name=grade]').val())
var studentID = parseInt(formObject.find('[name=studentID]').val())
var advisor = formObject.find('[name=advisor]').val()
var gender = formObject.find('[name=gender]').val()
var house = formObject.find('[name=house]').val()
var dob = formObject.find('[name=dob]').val()
var nationality = formObject.find('[name=nationality]').val()
var guardianemail1 = formObject.find('[name=guardianemail1]').val()
var guardianemail2 = formObject.find('[name=guardianemail2]').val()
var fatherphone = formObject.find('[name=fatherphone]').val()
var motherphone = formObject.find('[name=motherphone]').val()

var updateStudent = {grade:grade,
                  name:name,
                  studentID:studentID,
                  advisor:advisor,
                  gender:gender,
                  dob:dob,
                  nationality:nationality,
                  guardianemail1:guardianemail1,
                  guardianemail2:guardianemail2,
                  fatherphone:fatherphone,
                  motherphone:motherphone,
                  house:house}
var currentStudent = Students.findOne({name:Session.get('currentlySelectedStudent')});

Students.update({_id:currentStudent._id},{$set:updateStudent});
$('#editStudent').modal('hide');
    
    
}
});

Template.editStudents.helpers({
    
   currentlySelectedStudent: function(){
       
       
    return Session.get('currentlySelectedStudent');   
       
   },

    student: function(){
     
     return Students.find({name:Session.get('currentlySelectedStudent')});   
        
    }
    
});

Template.incidentBadge.helpers({
   numberOfIncidents: function(){    
   
       allIncidents = Incidents.find({name:this.name}).fetch();
       numOfIncidents = allIncidents.length;
    if(numOfIncidents!=0){   
    return numOfIncidents;//allIncidents.length; 
    }
    else{
    return null    
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
   
   'click #viewStudentPoints': function(event){
    event.preventDefault();
    event.stopPropagation();
    $('#studentPointsList').modal('show');
    
             
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
   		reportedBy: Meteor.user().username,
        schoolYear:'14-15'
  		 };
   
   
   HousePoints.insert(earnedPoints);
   
   
   Session.set("currentlySelectedStudent","");
    $(".student").removeClass('selected');
   },
     
 'click #editProfile': function(e){
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

 Template.studentAutoComplete.rendered = function(){
   var studentList = _(Students.find({},{fields:{name:true}}).fetch()).pluck('name'); 
   $("#studentComplete").autocomplete({
    minLength:2,
    source: studentList,
    select: function( e, ui ) {
  
  currentStudent = ui.item.value;
  Session.set("currentlySelectedStudent",currentStudent);
  }
   
}); 
};

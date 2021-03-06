
Meteor.subscribe('housePoints');

if(Meteor.user){
Meteor.subscribe('students');
Meteor.subscribe('incidents');

Meteor.subscribe('chatMessages');
Meteor.subscribe('activities');
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
  
  },
     
  'click .submitIncident': function(event){
  event.preventDefault();
  event.stopPropagation();
  var newIncident = {
                recordedTimeStamp: new Date,
				date: new Date().toDateString(),
				name: this.name,
				
				comments: $(event.target).parent().find('[name=comment]').val(),
				user: Meteor.user().username
				}
	Incidents.insert(newIncident);
	
    $(event.currentTarget).closest('.entry').fadeToggle();
    },
   
   
   'click .addHousePoints': function(event){
  
   event.preventDefault();
   event.stopPropagation();
   var currentStudent = this.name;
  
   var retrievedName = Students.find({name:currentStudent}, {fields: {house: 1}}).fetch();
   console.log(retrievedName);  
   var currentHouse = retrievedName[0].house;
		
   
   var earnedPoints = {
        recordedTimeStamp: new Date,
   		date: new Date().toDateString(),
   		student: currentStudent,
   		points: $(event.currentTarget).parent().parent().parent().parent().find('[name=addHousePoints]').val(),
   		comments: $(event.currentTarget).parent().find('[name=pointsComments]').val(),
   		house: currentHouse,
   		reportedBy: Meteor.user().username
  		 };
   
   console.log(earnedPoints);
   HousePoints.insert(earnedPoints);
   
   
   $(event.currentTarget).closest('.entry').fadeToggle();
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

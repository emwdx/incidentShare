Template.teacherContent.helpers({
 selectStudent: function(){

return (Session.get('selectStudent')=='True');

 },
   browseLog: function(){

 return (Session.get('browseLog')=='True');

 },
 housePoints: function(){

 return Session.get('housePoints')=='True';

 },

 isActivitiesAdmin: function(){

 return (Session.get('isActivitiesAdmin')=='True');

 },
  showActivities: function(){

 return (Session.get('showActivities')=='True');

 },
 currentlySelectedStudent: function(){

  currentStudent = Session.get('currentlySelectedStudent');
  return Students.findOne({name:currentStudent});


 }

 });



 Template.teacherButtonBar.events({

 'click #selectStudent': function(event){
 event.preventDefault();
 Session.set('selectStudent','True');
 Session.set('broweLog','False');
 Session.set('housePoints','False');

 $('li').removeClass('active');
 $(event.currentTarget).addClass('active')
 },
 'click #browseLog': function(event){
  event.preventDefault();
 Session.set('selectStudent','False');
 Session.set('broweLog','True');
 Session.set('housePoints','False');

 $('li').removeClass('active');
 $(event.currentTarget).addClass('active')
 Session.set("currentlySelectedStudent","");

 },
 'click #housePoints': function(event){
  event.preventDefault();
 Session.set('selectStudent','False');
 Session.set('browseLog','False');
 Session.set('housePoints','True');

 $('li').removeClass('active');
 $(event.currentTarget).addClass('active')
 Session.set("currentlySelectedStudent","");
 Router.go('/');
 },
 'click #setDragonTimeLocation': function(e){

 var dragonTimeLocation = prompt("Enter the Dragon Time Location. Enter//' for a new line.");
 if(dragonTimeLocation!=''){
 var locationArray = dragonTimeLocation.split('//')
 var locationString = ''
 for(i = 0;i<locationArray.length;i++){
  locationString += locationArray[i]+'<br>';

 }
 var id = systemVariables.findOne({name:'dragonTimeLocation'})._id;
 tables.update({_id:id},{$set:{value:locationString}});
 }
 },
 'mouseenter #setDragonTimeLocation':function(e){

  Session.set('showDragonTimeLocation',true);

 },
 'mouseleave #setDragonTimeLocation':function(e){

  Session.set('showDragonTimeLocation',false);

 }

 });

 Template.teacherButtonBar.helpers({
 isEvan: function(){

      return Meteor.user().email.address='eweinberg@scischina.org';

     },

     showDragonTimeLocation: function(){
      return (Session.get('showDragonTimeLocation')==true);
     }

 });

 Template.randomStudentData.helpers({

 randomStudentInfo: function(){return Session.get('randomStudentInfo');

 }

});

Template.randomStudentData.events({

'click #getRandomStudentButton':function(e){

  Meteor.call('getRandomStudentInfo',function (error, result) {
    if(error){

      console.log(error)
    }
    else{

      sample = {};
      sample.house = result.house;
      sample.gender = result.gender;
      sample.grade = result.grade;
   Session.set('randomStudentInfo',sample);

    }


  } );


}


})

Template.randomStudentData.rendered = function(){

Session.set('randomStudentInfo',null);

}

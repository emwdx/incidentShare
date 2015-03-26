  
  Template.teacherContent.helpers({
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
  
  },
  currentlySelectedStudent: function(){
      
   currentStudent = Session.get('currentlySelectedStudent');
   return Students.findOne({name:currentStudent});
      
      
  }
  
  });
  
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
  
  },
  'click #setDragonTimeLocation': function(e){
      
  var dragonTimeLocation = prompt("Enter the Dragon Time Location. Enter a '//' for a new line.");
  if(dragonTimeLocation!=''){
  var locationArray = dragonTimeLocation.split('//')
  var locationString = ''
  for(i = 0;i<locationArray.length;i++){
   locationString += locationArray[i]+'<br>';   
      
  }
  var id = systemVariables.findOne({name:'dragonTimeLocation'})._id;
  systemVariables.update({_id:id},{$set:{value:locationString}});
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
          
       return Meteor.user().emails[0].address=='eweinberg@scischina.org';   
          
      },
      
      showDragonTimeLocation: function(){
          
       return (Session.get('showDragonTimeLocation')==true);   
      }
      
  })
    
function activitiesClearSelection(){

Session.set("activitySelectedDay", "0");
Session.set("activitySelectedGrade","-10");
$("#selectedDayOfWeek").val('0');
$('#activitySelectedGrade').val("-10");
}


function buildSearchObject(){
searchObject = {};
       var selectedDays = parseFloat(Session.get("activitySelectedDay"));
       var selectedGrade = parseFloat(Session.get("activitySelectedGrade"));
       var selectorString = 'activityDays.'+(selectedDays-1)
       if(selectedDays!=0){
       
       searchObject[selectorString]=true;
       }
        else{ delete searchObject[selectorString]}
       if(selectedGrade!=-10){
          if(selectedGrade==10){
             
            delete searchObject['activityMinGrade']
            searchObject['activityMaxGrade']={$lte:5};  
             
             
            }
          else if(selectedGrade==6){
            searchObject['activityMinGrade']={$gt:5};
            searchObject['activityMaxGrade']={$lt:7};
              
              
              
          }
          else if(selectedGrade==7){
              
            searchObject['activityMinGrade']={$gt:6};
            delete searchObject['activityMaxGrade']
              
              
          }
          else{
             searchObject['activityMinGrade']={$lte:selectedGrade};
             searchObject['activityMaxGrade']={$gte:selectedGrade};
                       
          }
       
       }
        else{
            delete searchObject['activityMaxGrade'];
            delete searchObject['activityMinGrade'];
            
        }
    
return Activities.find(searchObject);    
}


Router.configure({ layoutTemplate: 'outline',
                 loadingTemplate: 'loading'});

Router.onBeforeAction(requireLogin, {except:[ 'studentInformationFrontPage','studentSignupForm','votingResults','loginForm']});

//Router.onBeforeAction(mustBeTeacher,{only:['housePointsHouseCompetition','showActivities','votingResults','editActivity']})

Router.map(function() {
      
      this.route('mainContent', {path: '/',
                                yieldTemplates: {
                                        'header': {to: 'header'}
                }});
  
      this.route('showActivities',{path:'/showActivities/',
                                   onRun: activitiesClearSelection});
      this.route('editActivity', { 
          path: '/editActivity/:_id/',
          data: function() { var data = Activities.findOne({_id:this.params._id});
                            
                            setActivitiesEdit(data);
                            
                            return data; },
          waitOn: function() { return Meteor.subscribe('activities', {limit:this.params._id})}
          
      });
      this.route('myActivities',{path:'/myActivities/',
                                waitOn: function() { return Meteor.subscribe('activities')}});
      this.route('activityAdminPanel',{path:'/admin/activities/'});
      this.route('activitySessionAdd',{path:'/admin/activities/add/'});
      this.route('activitySessionEdit',{path:'/admin/activities/edit/'});
      this.route('housePointsHouseCompetition',{path:'/house/addpoints/'});
      this.route('studentSignupForm',{path:'/student/sign-up/'});
      this.route('studentInformationFrontPage',{path:'/student/'});
      this.route('loginForm',{path:'/login/'});
      this.route('votingResults',{path:'/voting/'});
      this.route('accessDenied',{path:'/restricted/'});
  });

function setActivitiesEdit(data){
 if (data) {   
	 $('#editActivity').find('[name = activityEditMinGrade]').val(data.activityMinGrade); 
	 $('#editActivity').find('[name = activityEditMaxGrade]').val(data.activityMaxGrade); 
	 $('#editActivity').find('[name = activityEditOnMonday]').prop('checked',data.activityDays[0])
	 $('#editActivity').find('[name = activityEditOnTuesday]').prop('checked',data.activityDays[1])
	 $('#editActivity').find('[name = activityEditOnWednesday]').prop('checked',data.activityDays[2])
	 $('#editActivity').find('[name = activityEditOnThursday]').prop('checked',data.activityDays[3])
	 $('#editActivity').find('[name = activityEditOnFriday]').prop('checked',data.activityDays[4])

    
     for(var i = 0;i<4;i++){
         
        if(data.activityQuarters[i]){
        
        $('#activityEditSelectQ'+(i+1)).addClass('selected');    
            
            
        }
         
     }   
    
 }
else{
 console.log('no data found');   
    
}
    
    
}

function requireLogin() { if (! Meteor.user()) {

Session.set('currentURL',Router.current().path);
if 
    (Meteor.loggingIn()){ this.render(this.loadingTemplate);
  
}
else {Router.go('/login/');
alert('login required'); 
this.next();
     }


 }
this.next();
};

function mustBeTeacher(pause) { 
  if(Meteor.user()){
  if(!(Meteor.user().profile.group=='teacher')){
   Router.go('/');
  }
  }
  else{Router.go('/');}
  this.next();
}

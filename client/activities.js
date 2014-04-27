searchObject = {};

    
Template.addActivity.events({
    
'click .activityQuarterSelect': function(e){
    e.preventDefault();
    e.stopPropagation();
    
    var numOfQuarters=0;   
    
    
    
    if($(e.currentTarget).hasClass('selected')){
    $(e.currentTarget).removeClass('selected');
        
        
        
    }
    else{
    
    $(e.currentTarget).addClass('selected');
        
    }
    
    
    numOfQuarters = $('.selected').length;
    
    if(numOfQuarters>=2){
        $('#activitiesMultipleQuartersReset').show();
        
    }
    else{
         $('#activitiesMultipleQuartersReset').hide();
        
    }
    
},
    
'click #activityAddButton': function(e){
 
 e.preventDefault();
 var activityName = $('#addAnActivity').find('[name = activityName]').val();
 var activityDescription = $('#addAnActivity').find('[name = activityDescription]').val();
 var activityLocation = $('#addAnActivity').find('[name = activityLocation]').val();
    
 //get possible days of activity
 var activityOnMonday = $('#addAnActivity').find('[name = activityOnMonday]').prop('checked')
 var activityOnTuesday = $('#addAnActivity').find('[name = activityOnTuesday]').prop('checked')
 var activityOnWednesday = $('#addAnActivity').find('[name = activityOnWednesday]').prop('checked')
 var activityOnThursday = $('#addAnActivity').find('[name = activityOnThursday]').prop('checked')
 var activityOnFriday = $('#addAnActivity').find('[name = activityOnFriday]').prop('checked')

 var activityCapacity = parseInt($('#addAnActivity').find('[name = activityCapacity]').val());
 var activityMinGrade = parseInt($('#addAnActivity').find('[name = activityMinGrade]').val());
 var activityMaxGrade = parseInt($('#addAnActivity').find('[name = activityMaxGrade]').val());
 var activityIsQ1 = $("#activitySelectQ1").hasClass('selected')
 var activityIsQ2 = $("#activitySelectQ2").hasClass('selected')
 var activityIsQ3 = $("#activitySelectQ3").hasClass('selected')
 var activityIsQ4 = $("#activitySelectQ4").hasClass('selected')
 var activityResetAtQuarters = $('#addAnActivity').find('[name = activityWillReset]').prop('checked')
 var activityComments = $('#addAnActivity').find('[name = activityComments]').val();
 
 var newActivity = {
     
    activityName:activityName,
    activityDescription:activityDescription,
    activityLocation: activityLocation,
    activityDays:[activityOnMonday,activityOnTuesday,activityOnWednesday,activityOnThursday,activityOnFriday],
    activityCapacity:activityCapacity,
    activityMinGrade:activityMinGrade,
    activityMaxGrade:activityMaxGrade,
    activityQuarters:[activityIsQ1,activityIsQ2,activityIsQ3,activityIsQ4],
    activityResetAtQuarters: activityResetAtQuarters,
    submittedAt: new Date(),
    user: Meteor.user().username
 }
 
 console.log(newActivity);
 Activities.insert(newActivity);
 $('#addAnActivity').find('[name = activityName]').val('');
 $('#addAnActivity').find('[name = activityDescription]').val('');
 $('#addAnActivity').find('[name = activityLocation]').val('');
    
 //get possible days of activity
 $('#addAnActivity').find('[name = activityOnMonday]').prop('checked',false)
 $('#addAnActivity').find('[name = activityOnTuesday]').prop('checked',false)
 $('#addAnActivity').find('[name = activityOnWednesday]').prop('checked',false)
 $('#addAnActivity').find('[name = activityOnThursday]').prop('checked',false)
 $('#addAnActivity').find('[name = activityOnFriday]').prop('checked',false)

 $('#addAnActivity').find('[name = activityCapacity]').val('0');
 $('#addAnActivity').find('[name = activityMinGrade]').val('-10');
 $('#addAnActivity').find('[name = activityMaxGrade]').val('-10');
 $(".activityQuarterSelect").removeClass('selected');
 $('#addAnActivity').find('[name = activityWillReset]').prop('checked','false')
 $('#addAnActivity').find('[name = activityComments]').val('');
 $('#activitiesMultipleQuartersReset').hide();
 $('#addAnActivity').modal('hide');
    
    
     
     
     
     
 
    
//add date to the activity object to prioritize date selection
//comment box under date selection

}
    
    
});

Template.showActivities.helpers({
   
   activities: function(){
       var searchObject = buildSearchObject();
       Session.get("activitySelectedGrade");
       return buildSearchObject();
                              
    }
    
});

Template.showActivities.events({
    
  'change #selectedDayOfWeek':function(){
    var selectedDay =$("#selectedDayOfWeek").val();
    Session.set("activitySelectedDay", selectedDay);
    var selectedGrade = $('#activitySelectedGrade').val();
   Session.set("activitySelectedGrade", selectedGrade);
    
      
  },
  'change #activitySelectedGrade':function(){
   var selectedGrade = $('#activitySelectedGrade').val();
   Session.set("activitySelectedGrade", selectedGrade);
   var selectedDay =$("#selectedDayOfWeek").val();
    Session.set("activitySelectedDay", selectedDay);
      
  },
  'click #activityClearFilters':function(e){
   e.preventDefault();
   activitiesClearSelection();
   
      
  }
    
});

Template.activityRow.helpers({
   
    
    daysString: function(){
        var activitiesStringArray = ['M','T','W','Th','F'];
        var outputString = ''
        for(var i = 0;i<=4;i++){
            if(this.activityDays[i]){
             
                outputString+=activitiesStringArray[i];
                
            }
        
    }
       
        return outputString;
    
    },
    minGrade:function(){
        
    if(this.activityMinGrade<6){ return this.activityMinGrade}
    else if(this.activityMinGrade==6){ return 'MS';}
    else if(this.activityMinGrade==7){ return 'HS';}
        
    },
    maxGrade:function(){
     if(this.activityMaxGrade<6){ return this.activityMaxGrade}
    else if(this.activityMaxGrade==6){ return 'MS';}
    else if(this.activityMaxGrade==7){ return 'HS';}   
        
    }
    
});


var activitiesFix = function(){
var activitiesFix = Activities.find();
activitiesFix.forEach(function(activity){
var maxActivity = parseInt(activity.activityMaxGrade);
var minActivity = parseInt(activity.activityMinGrade);
Activities.update({_id:activity._id},{$set:{activityMaxGrade:maxActivity,activityMinGrade:minActivity}})
    
});
}
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
 Template.housePointsList.helpers({
  
  addPoints: function(){
  
  retrievedPointsActivity = HousePoints.find({},{sort:{recordedTimeStamp:-1,date:-1}}).fetch();
 if(retrievedPointsActivity){
  return retrievedPointsActivity;
 }
else{return null};
  
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

Template.housePointsHouseCompetition.events({
    
'click #housePointsCompetitionPointsSubmit': function(event){
  
   event.preventDefault();
   event.stopPropagation();
   var currentHouse = $('#housePointsCompetitionSelectHouse').val();
   var pointsComment = $('#housePointsCompetitionComment').val();
   var houseString;
   switch($('#housePointsCompetitionSelectHouse').val()){
           
    case 'G':
           houseString = 'Spring';
           break;
    case 'R':
           houseString = 'Summer';
           break;
    case 'Y':
           houseString = 'Fall';
           break;
    case 'B':
           houseString = 'Winter';
           break;
    default:
           houseString = '';
           
           
           
   }
       
   alert(houseString);
       
   var earnedPoints = {
        recordedTimeStamp: new Date,
   		date: new Date().toDateString(),
   		student: houseString,
   		points: $("#housePointsCompetitionSelectPoints").val(),
   		comments: pointsComment,
   		house: currentHouse,
   		reportedBy: Meteor.user().username,
        schoolYear:'14-15'
  		 };
   
   console.log(earnedPoints);
   HousePoints.insert(earnedPoints);
   $('#housePointsCompetitionSelectHouse').val('');
   $('#housePointsCompetitionComment').val('');
   $("#housePointsCompetitionSelectPoints").val('0');
 
   }    
    
    
});
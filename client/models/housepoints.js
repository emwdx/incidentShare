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
/*

db.users.find().forEach(function(teacher){

var myPoints = db.housePoints.find({reportedBy:teacher.username,schoolYear:"14-15"});
var totalPoints = 0;
myPoints.forEach(function(entry){totalPoints+=parseFloat(entry.points)});
print(teacher.username+": " + totalPoints);

});

*/
vote1 = {name:'Favorite Ice Cream', 
        voteDescription:'Choose your favorite ice cream below.',
        active:true,
            choices:[{value: 1, description:'Chocolate',votes:0},
                     {value: 2, description:'Vanilla',votes:0},
                     {value: 3, description:'Strawberry',votes:0}
                    ],
            studentsVoted:[],
            eligibleGrades:[6,7,8,9,10,11,12]
           }

vote2 = {
         name:'Cancel Classes?', 
        voteDescription:'Do you want to have classes cancelled for the rest of today?',
        active:true,
            choices:[{value: 1, description:'Yes',votes:0},
                     {value: 2, description:'No',votes:0}
                    ],
            studentsVoted:[],
            eligibleGrades:[6,7,8,9,10,11,12]
           }
     


Template.votingMakeSelection.helpers({
   
voteValidated: function(){return Session.get('validateStudentInfo')},
activeVotes: function(){return Votes.find({active:true})}
    
});

Template.votingMakeSelection.events({

'click #voteSubmitVote':function(e){

var voteElements = $('.voteElement');    

for(var i=0;i<=(voteElements.length-1);i++){
voteChoice = $(voteElements[i]).children().find('.voteSelect').val();
var currentVoteID = $(voteElements[i]).attr('id');
var currentVote = Votes.findOne({_id:currentVoteID});
var currentVoteCount = currentVote.choices[voteChoice-1].votes;
var studentsVoted = currentVote.studentsVoted;
var hasVoted = _.include(studentsVoted, parseFloat($('#voteStudentID').val()));
if(!hasVoted){

currentVoteCount++;
currentVote.choices[voteChoice-1].votes = currentVoteCount;
studentsVoted.push(parseFloat($('#voteStudentID').val()));

result = Votes.update({_id:currentVoteID},{$set:{studentsVoted:studentsVoted,choices:currentVote.choices}},serverReceivedData);
if(result==1){
alert('Your votes have been recorded');  
}
else{alert('The server may be down - submit your votes again.');}
}
else{ alert('You have already submitted your vote.');}    
  
    
}
$('#voteStudentID').val('');
$('#voteStudentName').val('');
Session.set('validateStudentInfo',false);
      
},
'change .voteStudentForm':function(e){
var studentID = parseInt($('#voteStudentID').val());   
var studentName = $('#voteStudentName').val().toUpperCase();
if(studentName.length<3){studentName+=' '};
    
Meteor.call('validateStudent',studentID, studentName, getServerResultValidate);
    
var isValidated = Session.get('validateStudentInfo');    
    
}

}); 

Template.votingTemplate.helpers({


voteDescription: function(){return this.voteDescription;},

votingChoice: function(){return this.choices;}



});

Template.votingResults.helpers({
    
activeVotes: function(){return Votes.find({active:true})},
    
});

Template.voteResultsItem.helpers({
   
    totalVotes: function() {
 
    return this.studentsVoted.length;
    
}
    
});

var getServerResultValidate = function(err,result){
if(err){console.log(err)}
else{Session.set('validateStudentInfo',result);}    
    
}

var serverReceivedData = function(err,result){
if(err){console.log(err)}
else{Session.set('validateStudentInfo',false);}    
}
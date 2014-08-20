vote = {name:'House Theme', 
        voteDescription:'Help choose which house theme we should use this year.',
        active:true,
            choices:[{value: 1, description:'Red, Blue, Yellow, Green',votes:0},
                     {value: 2, description:'Strawberry, Blueberry, Banana, Apple',votes:0},
                     {value: 3, description:'Water, Fire, Earth, Plant',votes:0}
                    ],
            studentsVoted:[],
            eligibleGrades:[6,7,8,9,10,11,12]
           }
        
    

Template.votingMakeSelection.helpers({


voteDescription: function(){return vote.voteDescription},

votingChoice: function(){return vote.choices}



})
    

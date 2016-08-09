Template.giveKwai.helpers({

user: function(){

return Meteor.users.find();

}

});

Template.giveKwai.events({

    'click #submitKwai':function(e){
     e.preventDefault();
     var giver = Meteor.user().username;
     var receiver = $('#selectUserKwai').val();
     var pts = parseInt($('#numOfKwai').val());
     var reason = $('#kwaiReason').val();
     var date = new Date();

     var kwaiObject = {
     givenTo:receiver,
     from:giver,
     points:pts,
     date:date,
     reason:reason,
     likedBy:[],
     schoolYear:'15-16'
     };

     var inputsNotAllSelected = (receiver=='')|(pts=='')|(reason=='');


     if(giver==receiver){
         alert("You can't give points to yourself!");

     }
     else if(inputsNotAllSelected){

       alert("Fill out all fields!");

     }
     else{
         console.log(kwaiObject);
         Currency.insert(kwaiObject);

    }
    $('#selectUserKwai').val('');
    $('#numOfKwai').val('');
    $('#kwaiReason').val('');

    }


});

Template.kwaiList.helpers({

kwai:function(){

 return Currency.find({},{sort:{date:-1}});

}

});

Template.kwaiItem.events({

'click a':function(e){
 e.preventDefault();
 var likes = this.likedBy;
 if(likes){

 if(!(_.include(likes,Meteor.user().username))){

   likes.push(Meteor.user().username);
   console.log(likes);
   Currency.update({_id:this._id},{$set:{likedBy:likes}});
 }

 }
 else{
 likes = [Meteor.user().username];
 Currency.update({_id:this._id},{$set:{likedBy:likes}});
 }


}

});

Template.kwaiItem.helpers({

   likes: function(){
    if(this.likedBy){

        return this.likedBy.length;

    }

      return 0;
   }

});

Template.kwaiTable.helpers({

 user: function(){

return Meteor.users.find();

},
kwaiGiven:function(){

 return Currency.find({from:this.username}).count();

},
kwaiReceived:function(){

 return Currency.find({givenTo:this.username}).count();

}



});

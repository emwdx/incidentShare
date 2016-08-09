

Template.chatWindow.helpers({

    chatMessage: function(){return ChatMessages.find({},{sort:{submittedAt:-1}})}


 });


Template.chatWindow.events({

   'click #sendChatMessage': function(e){

    e.preventDefault();
    var newMessage = {

    submittedAt: new Date(),
    user: Meteor.user().username,
    message: $('#chatEntry').val(),
    schoolYear:"15-16"


    }

    ChatMessages.insert(newMessage);
    $('#chatEntry').val('');

   }


 });

Template.chatLine.helpers({

cleanDate:  function(date){

    return date.toTimeString().split(' ')[0];

   }

})

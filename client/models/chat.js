

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
    schoolYear:'14-15'
        
        
    }
    
    ChatMessages.insert(newMessage);
    $('#chatEntry').val('');
       
   }
     
     
 });

Template.chatLine.cleanDate = function(date){
       
    return date.toTimeString().split(' ')[0];
       
   }
    





Router.configure({ layoutTemplate: 'outline',
                 loadingTemplate: 'loading'});

Router.onBeforeAction(requireLogin, {except:[ 'studentInformationFrontPage','studentSignupForm','votingResults','loginForm','randomStudentData']});

Router.onBeforeAction(mustBeTeacher,{only:['housePointsHouseCompetition','votingResults','kwaiPage','adminTemplate']})

Router.onBeforeAction(mustBeAdmin,{only:['admin']})

Router.map(function() {

      this.route('mainContent', {path: '/'});


      this.route('housePointsHouseCompetition',{path:'/house/addpoints/'});
      this.route('studentSignupForm',{path:'/student/sign-up/'});
      this.route('studentInformationFrontPage',{path:'/student/'});
      this.route('loginForm',{path:'/login/'});
      this.route('votingResults',{path:'/voting/'});
      this.route('accessDenied',{path:'/restricted/'});
      this.route('kwaiPage',{path:'/korykwai/'});
      this.route('adminTemplate',{path:'/admin/'});
      this.route('randomStudentData',{path:'/random-student'})
  });



function requireLogin() { if (! Meteor.user()) {

Session.set('currentURL',Router.current().path);
if(Meteor.loggingIn()){ this.render(this.loadingTemplate);

}
else {Router.go('/login/');


     }


 }
this.next();
};

function mustBeTeacher(pause) {
  if(Meteor.user()){
  if(!(Roles.userIsInRole(Meteor.user(),['teacher','admin'])))
  {
   Router.go('/');
  }
  }
  else{Router.go('/login/');}
  this.next();
}

var mustBeAdmin= function(){


  if(Meteor.user()){
  if(!(Roles.userIsInRole(Meteor.user(),['admin'])))
  {
   Router.go('/');
   this.next();
  }
  }
  else{Router.go('/login/');}
  this.next();


}

var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      Router.go('/');
    }
    if (state === "signUp") {
      Router.go('/login/');
    }
  }
};

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: true,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
    onSubmitHook: mySubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Register Now!"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
});

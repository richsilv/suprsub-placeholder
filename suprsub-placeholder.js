if (Meteor.isClient) {

  function changedCallback(event) {
    if (this && this.info) $(".carousel-holder .img>div").fadeTo(100, 0);
    Meteor.setTimeout(function() {
      $(".carousel-holder .img>div").fadeTo(500, 1);
    }, 500);
  }

  Meteor.startup(function() {
    $(document).ready(function() {
      $('.owl-carousel').owlCarousel({
        items: 1,
        autoplay: true,
        lazyLoad: true,
        loop: true,
        onChanged: changedCallback,
        autoplaySpeed: 500
      });
      $('.signup .button').click(function() {
        templateAttach(Template.signupModalHolder, function() {
          modalOptions(); $('.ui.modal').modal('show');
        });        
      });
    });
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=553800328023729";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });

  Template.parallaxBox.rendered = function() {
    $.stellar();
  };

  Template.dynamicTemplate.chooseTemplate = function (name) {
    return {template: Template[name]};
  };

  Template.signupModal.events({
    'click #signup-button': function() {
      Meteor.call('userCreate', $('#signup-email').val(), function(err, res) {
        if (err) console.log(err);
        if (res) {
          $('#signup-email').css('color', 'hsl(120, 75%, 30%)');
          Meteor.setTimeout(function() {
            $('.ui.modal').modal('hide');
          }, 1250);
        }
        else {
          $('#signup-email').css('color', 'red');
          Meteor.setTimeout(function() {
            $('#signup-email').css('color', 'rgba(0, 0, 0, 0.701961)');           
          }, 1250);         
        }
      });
    },
    'click #twitter-login': function() {
      Meteor.loginWithTwitter({}, function(err, res) {
        if (err) console.log(err);
        else {
          Meteor.setTimeout(function() {
            $('.ui.modal').modal('hide');
          }, 750);
        }      
      });
    },
    'click #facebook-login': function() {
      Meteor.loginWithFacebook({}, function(err, res) {
        if (err) console.log(err);
        else {
          Meteor.setTimeout(function() {
            $('.ui.modal').modal('hide');
          }, 750);
        }
      });
    }
  });

  templateAttach = function(template, callback, data) {
    if (typeof template === "string") template = Template[template];
    if (!template) return false;
    if (data)
      UI.insert(UI.renderWithData(template, data), document.body);
    else
      UI.insert(UI.render(template), document.body);
    return callback && callback.apply(this, arguments);
  };
}

function modalOptions() {
  $('.ui.modal').modal({
    onHide: function() {
      $('.ui.dimmer.page').remove();
      $('.ui.modal').remove();
    }
  });
}

if (Meteor.isServer) {

  SecureData = new Meteor.Collection('securedata');

  Meteor.startup(function () {

    facebookDetails = SecureData.findOne({name: 'facebookDetails'}).value;
    twitterDetails = SecureData.findOne({name: 'twitterDetails'}).value;

    console.log(facebookDetails, twitterDetails);

    Accounts.config({
      sendVerificationEmail: false,
      forbidClientAccountCreation: false
    });

    Accounts.loginServiceConfiguration.remove({
      service: "facebook"
    });
    Accounts.loginServiceConfiguration.remove({
      service: "twitter"
    });
    Accounts.loginServiceConfiguration.insert(facebookDetails);
    Accounts.loginServiceConfiguration.insert(twitterDetails);

    Meteor.methods({
      userCreate: function(email) {
        Accounts.createUser({email: email});
        return true;
      }
    });

  });
}



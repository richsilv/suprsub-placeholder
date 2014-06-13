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
    });
    (function(d,s,id) {
      var js,fjs=d.getElementsByTagName(s)[0];
      if(!d.getElementById(id)) {
        js=d.createElement(s);
        js.id=id;js.src="//platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);
      }
    })(document,"script","twitter-wjs");
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
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}

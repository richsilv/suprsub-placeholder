var slideFiles,
	fs = Meteor.require('fs');

Meteor.startup(function() {

});

Template.owlCarousel.helpers({
	slides: function() {

	}
});

getPhotos = function() {
	var files = fs.readdirSync('./../client/app/photos').map(function(f) {
		return f.substr(f.lastIndexOf('/')+1);
	});
	return files;
}
Pitches = new Meteor.Collection('pitches');
mapQuestKey = "Fmjtd%7Cluur20u72h%2Cbl%3Do5-9ayl1y";

var geocoderProvider = 'mapquest';
var httpAdapter = 'http';
// optionnal
var extra = {
    apiKey: mapQuestKey, // for map quest
    formatter: null         // 'gpx', 'string', ...
};

Meteor.methods({
	
	clearPitches: function() {
		Pitches.remove({});
	},

	loadPitches: function(filename) {
		Assets.getText(filename, function(err, res) {
			_.each(res.split('\r\n'), function(e) {
				var a = e.split(',');
				Pitches.insert({name: a[0], address: a[1]});
			});
		})
	},

	stratify: function(n) {
		var sets = [], pitchData = Pitches.find().fetch();
		for (var i = n; i <= pitchData.length; i += n) {
			sets.push(pitchData.slice(i - n, i));
		}
		return sets;
	},

	addGeocodes: function(n) {
		var pitchData = Pitches.find({location: {$exists: false}}, {limit: n}).fetch(), geo = new GeoCoder({geocoderProvider: geocoderProvider, apiKey: mapQuestKey});
		_.each(pitchData, function(p) {
			var result;
			try {
				result = geo.geocode(p.address);
			}
			catch (e) {
				result = ["FAILURE"];
				console.log("Cannot geocode", p.address, e.stack);
			}
			Pitches.update(p, {$set: {location: result[0]}});
		});
	},

	delayGeocode: function() {
		var interval = Meteor.setInterval(function() {
			Meteor.call('addGeocodes', 10);
			var remainder = Pitches.find({location: {$exists: false}}).count();
			console.log(remainder, "remaining");
			if (remainder === 0) {
				Meteor.clearInterval(interval);
				interval = null;
			}
		}, 5000);
	}

})
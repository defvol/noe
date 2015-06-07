/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	/* create leaflet map */
	var map = L.map('map', {
		center: [23, -102],
		zoom: 5
	});

	/* add default stamen tile layer */
	new L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
		minZoom: 0,
		maxZoom: 18,
		attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
	}).addTo(map);

  var NoaaIcon = L.Icon.extend({
    options: {
      iconUrl: 'data/ep022015_best_track/ts_nhemi.png'
    }
  });

  var runLayer = omnivore.kml('data/ep022015_best_track/ep022015.kml')
    .on('ready', function() {
      map.fitBounds(runLayer.getBounds());

      runLayer.eachLayer(function(layer) {
        var layerProperties = layer.toGeoJSON().properties;
        var categoryName = layerProperties.styleUrl.slice(1);
        var iconFilePrefixes = {
          'cat1'  : 'cat1',
          'cat2'  : 'cat2',
          'cat3'  : 'cat3',
          'cat4'  : 'cat4',
          'cat5'  : 'cat5',
          'pt'    : 'ex',
          'db'    : 'ex',
          'lo'    : 'ex',
          'ex'    : 'ex',
          'tc'    : 'ex',
          'wv'    : 'ex',
          'sd'    : 'ex',
          'ss'    : 'ts',
          'ts'    : 'ts',
          'td'    : 'td',
          'st'    : 'typhoon',
          'ty'    : 'typhoon'
        };
        var layerIcon = new NoaaIcon({
          iconUrl: 'data/ep022015_best_track/' + iconFilePrefixes[categoryName] + '_nhemi.png'
        });
        layer.setIcon(layerIcon);
      });

    })
    .addTo(map);

}(window, document, L));

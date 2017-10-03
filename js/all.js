/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {

	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	onDeviceReady: function() {

		var turnOffAudio = function(){
			var audioElements = document.getElementsByTagName('audio');
			if(audioElements.length >= 1){
				for(i=0; i<audioElements.length; i++){
					audioElements[i].pause();
				}			
			}	
		};

		$(document).on('pagecreate', function(event) {
			turnOffAudio();
		});

		$.mobile.defaultPageTransition = 'none';

		window.plugin.statusbarOverlay.isVisible( function (isVisible) {
			window.plugin.statusbarOverlay.hide();
		});
		
		$("a").on("click", function(evt){
			var url = evt.currentTarget.href;
			if( (url.indexOf("http://")>=0) || (url.indexOf("https://")>=0) ) {
				evt.preventDefault();
				if (! navigator.onLine) {
					return alert("You must be connected to the internet in order to access this link.");
				}
				if( url.indexOf("usd21.org/m/niv84")>=0 ) {
					var target = "_self";
					var ref = cordova.InAppBrowser.open(url, target, 'location=yes,hardwareback=yes,shouldPauseOnSuspend=yes,allowInlineMediaPlayback=yes');
				} else {
					var target = "_system";
					var ref = cordova.InAppBrowser.open(url, target, 'location=yes,hardwareback=yes,shouldPauseOnSuspend=yes,allowInlineMediaPlayback=yes');
				}
			}
		});

		var db = new PouchDB('firstPrinciples.db', {
			iosDatabaseLocation: 'Library',
			androidDatabaseImplementation: 2
		});
		var dbInfo = db.info();

		var callRemote = function(event, db, jsonpurl){
			if(event) var event = JSON.stringify(event) || {};
			if(db) var db = JSON.stringify(db) || {};
			if(jsonpurl) var jsonpurl = jsonpurl || "http://www.usd21.org/m/fp/remote/?";
			if(navigator.onLine){
				$.ajax({
					url: jsonpurl,
					jsonp: "callback",
					dataType: "jsonp",
					data: {
						"event": event,
						"db": db,
						"jsonpurl": jsonpurl
					},
					success: function(response) {
					},
					error: function(err){
					}
				});
			}
		};
		callRemote();

	}

};

app.initialize();
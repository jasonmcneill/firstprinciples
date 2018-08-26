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

$(document).ready(function($){
	$(document).on("pageshow", function(evt) {
		console.log("Fired event:  pageinit");
	});
	$(document).on("mobileinit", function() {
		$.mobile.defaultPageTransition = "none";
	});
});

var app = {

	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	onDeviceReady: function() {

		var ref = "";   // Handle for inAppBrowser
		var turnOffAudio = function(){
			var audioElements = document.getElementsByTagName('audio');
			if(audioElements.length >= 1){
				for(i=0; i<audioElements.length; i++){
					audioElements[i].pause();
				}			
			}	
		};
		$("div[data-role='page']").on( "pageshow, pageinit, pagecreate", function( event, ui ) {
			turnOffAudio();
			document.addEventListener("deviceready", app.onDeviceReady, false);

			$("a[rel=external]").on("click, vclick", function(evt){
				evt.preventDefault();
				var url = evt.currentTarget.href;
				ref = cordova.InAppBrowser.open(url, '_system');
			});

		});

		$.mobile.defaultPageTransition = 'none';

		if((typeof window.plugin !== "undefined") && (typeof window.plugin.statusbarOverlay !== "undefined")){
			window.plugin.statusbarOverlay.isVisible( function (isVisible) {
				window.plugin.statusbarOverlay.hide();
			});			
		}
		
		$("a[rel=external]").on("click, vclick", function(evt){
			evt.preventDefault();
			var url = evt.currentTarget.href;
			ref = cordova.InAppBrowser.open(url, '_system');
		});

		var db = new PouchDB('firstPrinciples.db', {
			iosDatabaseLocation: 'Library',
			androidDatabaseImplementation: 2
		});
		var dbInfo = db.info();

		/*
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
		*/

	}

};

app.initialize();
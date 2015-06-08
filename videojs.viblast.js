/**
 * Adapts videojs, videojs.ads and videojs.vast in a way that works with Viblast
 */
(function(window, document, vjs, undefined) {
"use strict";

var ViblastPlugin = function() {
	var player = this;
	var overridenCurrentSrc = player.currentSrc;
	player.currentSrc = function() {
		var vid = document.querySelector('#' + player.id() + ' video');
		if (vid.dataset['viblastSrc']) {
			return vid.dataset['viblastSrc'];
		} else {
			return overridenCurrentSrc.call(this);
		}
	};
};

vjs.plugin('viblast', ViblastPlugin);

})(window, document, videojs);

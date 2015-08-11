/**
 * Adapts videojs, videojs.ads and videojs.vast in a way that works with Viblast
 */
(function(window, document, vjs, undefined) {
"use strict";

var ViblastPlugin = function() {
};

vjs.plugin('viblast', ViblastPlugin);

})(window, document, videojs);

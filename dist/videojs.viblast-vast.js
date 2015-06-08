!function(a,b,c,d){"use strict";var e=function(){var a=this,c=a.currentSrc;a.currentSrc=function(){var d=b.querySelector("#"+a.id()+" video");return d.dataset.viblastSrc?d.dataset.viblastSrc:c.call(this)}};c.plugin("viblast",e)}(window,document,videojs),function(a,b,c,d){"use strict";var e=function(a){var b,c,d;for(c=1;c<arguments.length;c++){b=arguments[c];for(d in b)b.hasOwnProperty(d)&&(a[d]=b[d])}return a},f=function(a,b,c){var d,e,f=Object.prototype.toString.call(b),g=function(a,b,c){if(a.addEventListener)a.addEventListener(b,c);else if(a.on)a.on(b,c);else{if(!a.attachEvent)throw new Error("object has no mechanism for adding event listeners");a.attachEvent("on"+b,c)}};switch(f){case"[object String]":g(a,b,c);break;case"[object Array]":for(d=0,e=b.length;e>d;d++)g(a,b[d],c);break;case"[object Object]":for(d in b)b.hasOwnProperty(d)&&g(a,d,b[d]);break;default:throw new Error("Unrecognized events parameter type: "+f)}return a},g=function(b){return(a.setImmediate||a.requestAnimationFrame||a.mozRequestAnimationFrame||a.webkitRequestAnimationFrame||a.setTimeout)(b,0)},h=function(b){return(a.clearImmediate||a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.mozCancelAnimationFrame||a.clearTimeout)(b)},i=function(a){a.ads.cancelPlayTimeout||(a.ads.cancelPlayTimeout=g(function(){a.ads.cancelPlayTimeout=null,a.paused()||a.pause()}))},j=function(a){var b=a.el().querySelector(".vjs-tech"),c={src:a.currentSrc(),currentTime:a.currentTime(),type:a.currentType()};return b&&(c.nativePoster=b.poster),c},k=function(a,b){for(var c=a.className.split(/\s+/),d=c.length,e=[];d--;)c[d]!==b&&e.push(c[d]);a.className=e.join(" ")},l=function(a,b){var c,e=a.el().querySelector(".vjs-tech"),f=20,g=function(){a.currentTime(b.currentTime),a.ended()||a.play()},h=function(){return e.seekable===d?void g():e.seekable.length>0?void g():void(f--&&setTimeout(h,50))};b.nativePoster&&(e.poster=b.nativePoster),c=a.src()?a.src()!==b.src:a.currentSrc()!==b.src,c?(a.src({src:b.src,type:b.type}),a.load(),a.one("loadedmetadata",h)):a.ended()||a.play()},m=function(a){var b=a.el().querySelector(".vjs-tech");b&&b.removeAttribute("poster")},n={timeout:5e3,prerollTimeout:100,debug:!1},o=function(b){var d,o=this,p=e({},n,b||{});o.ads={state:"content-set",startLinearAdMode:function(){o.trigger("adstart")},endLinearAdMode:function(){o.trigger("adend")}},d=function(b){var c={"content-set":{events:{adsready:function(){this.state="ads-ready"},play:function(){this.state="ads-ready?",i(o),m(o)}}},"ads-ready":{events:{play:function(){this.state="preroll?",i(o)}}},"preroll?":{enter:function(){o.el().className+=" vjs-ad-loading",o.ads.timeout=a.setTimeout(function(){o.trigger("adtimeout")},p.prerollTimeout),o.trigger("readyforpreroll")},leave:function(){a.clearTimeout(o.ads.timeout),h(o.ads.cancelPlayTimeout),o.ads.cancelPlayTimeout=null,k(o.el(),"vjs-ad-loading")},events:{play:function(){i(o)},adstart:function(){this.state="ad-playback",o.el().className+=" vjs-ad-playing"},adtimeout:function(){this.state="content-playback",o.play()}}},"ads-ready?":{enter:function(){o.el().className+=" vjs-ad-loading",o.ads.timeout=a.setTimeout(function(){o.trigger("adtimeout")},p.timeout)},leave:function(){a.clearTimeout(o.ads.timeout),k(o.el(),"vjs-ad-loading")},events:{play:function(){i(o)},adsready:function(){this.state="preroll?"},adtimeout:function(){this.state="ad-timeout-playback"}}},"ad-timeout-playback":{events:{adsready:function(){o.paused()?this.state="ads-ready":this.state="preroll?"},contentupdate:function(){o.paused()?this.state="content-set":this.state="ads-ready?"}}},"ad-playback":{enter:function(){this.snapshot=j(o),m(o)},leave:function(){k(o.el(),"vjs-ad-playing"),l(o,this.snapshot)},events:{adend:function(){this.state="content-playback"}}},"content-playback":{events:{adstart:function(){this.state="ad-playback",o.el().className+=" vjs-ad-playing",m(o)},contentupdate:function(){o.paused()?this.state="content-set":this.state="ads-ready?"}}}};!function(a){var d=function(){};(c[a].events[b.type]||d).apply(o.ads),a!==o.ads.state&&((c[a].leave||d).apply(o.ads),(c[o.ads.state].enter||d).apply(o.ads),p.debug&&videojs.log("ads",a+" -> "+o.ads.state))}(o.ads.state)},f(o,c.Html5.Events.concat(["adtimeout","contentupdate","adsready","adstart","adend"]),d),o.ads.contentSrc=o.currentSrc(),function(){var a=function(){var a;"ad-playback"!==o.ads.state&&(a=o.currentSrc(),a!==o.ads.contentSrc&&(o.trigger({type:"contentupdate",oldValue:o.ads.contentSrc,newValue:a}),o.ads.contentSrc=a))};o.on("loadstart",a),g(a)}(),o.paused()||d({type:"play"})};c.plugin("ads",o)}(window,document,videojs),!function(a){if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define(a);else{var b;"undefined"!=typeof window?b=window:"undefined"!=typeof global?b=global:"undefined"!=typeof self&&(b=self),b.DMVAST=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function d(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function e(a){return"function"==typeof a}function f(a){return"number"==typeof a}function g(a){return"object"==typeof a&&null!==a}function h(a){return void 0===a}b.exports=d,d.EventEmitter=d,d.prototype._events=void 0,d.prototype._maxListeners=void 0,d.defaultMaxListeners=10,d.prototype.setMaxListeners=function(a){if(!f(a)||0>a||isNaN(a))throw TypeError("n must be a positive number");return this._maxListeners=a,this},d.prototype.emit=function(a){var b,c,d,f,i,j;if(this._events||(this._events={}),"error"===a&&(!this._events.error||g(this._events.error)&&!this._events.error.length))throw b=arguments[1],b instanceof Error?b:TypeError('Uncaught, unspecified "error" event.');if(c=this._events[a],h(c))return!1;if(e(c))switch(arguments.length){case 1:c.call(this);break;case 2:c.call(this,arguments[1]);break;case 3:c.call(this,arguments[1],arguments[2]);break;default:for(d=arguments.length,f=new Array(d-1),i=1;d>i;i++)f[i-1]=arguments[i];c.apply(this,f)}else if(g(c)){for(d=arguments.length,f=new Array(d-1),i=1;d>i;i++)f[i-1]=arguments[i];for(j=c.slice(),d=j.length,i=0;d>i;i++)j[i].apply(this,f)}return!0},d.prototype.addListener=function(a,b){var c;if(!e(b))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",a,e(b.listener)?b.listener:b),this._events[a]?g(this._events[a])?this._events[a].push(b):this._events[a]=[this._events[a],b]:this._events[a]=b,g(this._events[a])&&!this._events[a].warned){var c;c=h(this._maxListeners)?d.defaultMaxListeners:this._maxListeners,c&&c>0&&this._events[a].length>c&&(this._events[a].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[a].length),console.trace())}return this},d.prototype.on=d.prototype.addListener,d.prototype.once=function(a,b){function c(){this.removeListener(a,c),d||(d=!0,b.apply(this,arguments))}if(!e(b))throw TypeError("listener must be a function");var d=!1;return c.listener=b,this.on(a,c),this},d.prototype.removeListener=function(a,b){var c,d,f,h;if(!e(b))throw TypeError("listener must be a function");if(!this._events||!this._events[a])return this;if(c=this._events[a],f=c.length,d=-1,c===b||e(c.listener)&&c.listener===b)delete this._events[a],this._events.removeListener&&this.emit("removeListener",a,b);else if(g(c)){for(h=f;h-->0;)if(c[h]===b||c[h].listener&&c[h].listener===b){d=h;break}if(0>d)return this;1===c.length?(c.length=0,delete this._events[a]):c.splice(d,1),this._events.removeListener&&this.emit("removeListener",a,b)}return this},d.prototype.removeAllListeners=function(a){var b,c;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[a]&&delete this._events[a],this;if(0===arguments.length){for(b in this._events)"removeListener"!==b&&this.removeAllListeners(b);return this.removeAllListeners("removeListener"),this._events={},this}if(c=this._events[a],e(c))this.removeListener(a,c);else for(;c.length;)this.removeListener(a,c[c.length-1]);return delete this._events[a],this},d.prototype.listeners=function(a){var b;return b=this._events&&this._events[a]?e(this._events[a])?[this._events[a]]:this._events[a].slice():[]},d.listenerCount=function(a,b){var c;return c=a._events&&a._events[b]?e(a._events[b])?1:a._events[b].length:0}},{}],2:[function(a,b,c){var d;d=function(){function a(){this.errorURLTemplates=[],this.impressionURLTemplates=[],this.creatives=[]}return a}(),b.exports=d},{}],3:[function(a,b,c){var d,e,f;e=a("./parser.coffee"),f=a("./util.coffee"),d=function(){function a(){}return a.cappingFreeLunch=0,a.cappingMinimumTimeInterval=0,a.timeout=0,a.get=function(a,b){var c;return c=+new Date,this.totalCallsTimeout<c?(this.totalCalls=1,this.totalCallsTimeout=c+36e5):this.totalCalls++,this.cappingFreeLunch>=this.totalCalls?void b(null):c-this.lastSuccessfullAd<this.cappingMinimumTimeInterval?void b(null):e.parse(a,function(a){return function(a){return b(a)}}(this))},function(){var b,c;c=f.storage,b=Object.defineProperty,["lastSuccessfullAd","totalCalls","totalCallsTimeout"].forEach(function(d){b(a,d,{get:function(){return c.getItem(d)},set:function(a){return c.setItem(d,a)},configurable:!1,enumerable:!0})}),null==a.totalCalls&&(a.totalCalls=0),null==a.totalCallsTimeout&&(a.totalCallsTimeout=0)}(),a}(),b.exports=d},{"./parser.coffee":8,"./util.coffee":14}],4:[function(a,b,c){var d;d=function(){function a(){this.id=null,this.width=0,this.height=0,this.type=null,this.staticResource=null,this.companionClickThroughURLTemplate=null,this.trackingEvents={}}return a}(),b.exports=d},{}],5:[function(a,b,c){var d,e,f,g,h={}.hasOwnProperty,i=function(a,b){function c(){this.constructor=a}for(var d in b)h.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=function(){function a(){this.trackingEvents={}}return a}(),f=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.type="linear",this.duration=0,this.skipDelay=null,this.mediaFiles=[],this.videoClickThroughURLTemplate=null,this.videoClickTrackingURLTemplate=null}return i(b,a),b}(d),g=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return i(b,a),b}(d),e=function(){function a(){this.type="companion",this.variations=[]}return a}(),b.exports={VASTCreativeLinear:f,VASTCreativeNonLinear:g,VASTCreativeCompanion:e}},{}],6:[function(a,b,c){b.exports={client:a("./client.coffee"),tracker:a("./tracker.coffee"),parser:a("./parser.coffee"),util:a("./util.coffee")}},{"./client.coffee":3,"./parser.coffee":8,"./tracker.coffee":10,"./util.coffee":14}],7:[function(a,b,c){var d;d=function(){function a(){this.fileURL=null,this.deliveryType="progressive",this.mimeType=null,this.codec=null,this.bitrate=0,this.minBitrate=0,this.maxBitrate=0,this.width=0,this.height=0}return a}(),b.exports=d},{}],8:[function(a,b,c){var d,e,f,g,h,i,j,k,l,m=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};d=a("./urlhandler.coffee"),k=a("./response.coffee"),e=a("./ad.coffee"),l=a("./util.coffee"),h=a("./creative.coffee").VASTCreativeLinear,g=a("./creative.coffee").VASTCreativeCompanion,i=a("./mediafile.coffee"),f=a("./companionad.coffee"),j=function(){function a(){}var b;return b=[],a.addURLTemplateFilter=function(a){"function"==typeof a&&b.push(a)},a.removeURLTemplateFilter=function(){return b.pop()},a.countURLTemplateFilters=function(){return b.length},a.clearUrlTemplateFilters=function(){return b=[]},a.parse=function(a,b){return this._parse(a,null,function(a,c){return b(c)})},a._parse=function(a,c,e){var f,g,h;for(g=0,h=b.length;h>g;g++)f=b[g],a=f(a);return null==c&&(c=[]),c.push(a),d.get(a,function(b){return function(d,f){var g,h,i,j,n,o,p,q,r,s,t;if(null!=d)return e(d);if(n=new k,null==(null!=f?f.documentElement:void 0)||"VAST"!==f.documentElement.nodeName)return e();for(s=f.documentElement.childNodes,o=0,q=s.length;q>o;o++)j=s[o],"Error"===j.nodeName&&n.errorURLTemplates.push(b.parseNodeText(j));for(t=f.documentElement.childNodes,p=0,r=t.length;r>p;p++)j=t[p],"Ad"===j.nodeName&&(g=b.parseAdElement(j),null!=g?n.ads.push(g):l.track(n.errorURLTemplates,{ERRORCODE:101}));for(h=function(){var a,b,c;if(n){for(c=n.ads,a=0,b=c.length;b>a;a++)if(g=c[a],null!=g.nextWrapperURL)return;return 0===n.ads.length&&(l.track(n.errorURLTemplates,{ERRORCODE:303}),n=null),e(null,n)}},i=n.ads.length;i--;)g=n.ads[i],null!=g.nextWrapperURL&&!function(d){var e,f;return c.length>=10||(f=d.nextWrapperURL,m.call(c,f)>=0)?(l.track(d.errorURLTemplates,{ERRORCODE:302}),n.ads.splice(n.ads.indexOf(d),1),void h()):(-1===d.nextWrapperURL.indexOf("://")&&(e=a.slice(0,a.lastIndexOf("/")),d.nextWrapperURL=""+e+"/"+d.nextWrapperURL),b._parse(d.nextWrapperURL,c,function(a,b){var c,e,f,g,i,j,k,m,o,p,q,r,s,t;if(null!=a)l.track(d.errorURLTemplates,{ERRORCODE:301}),n.ads.splice(n.ads.indexOf(d),1);else if(null==b)l.track(d.errorURLTemplates,{ERRORCODE:303}),n.ads.splice(n.ads.indexOf(d),1);else for(n.errorURLTemplates=n.errorURLTemplates.concat(b.errorURLTemplates),f=n.ads.indexOf(d),n.ads.splice(f,1),r=b.ads,j=0,k=r.length;k>j;j++){if(g=r[j],g.errorURLTemplates=d.errorURLTemplates.concat(g.errorURLTemplates),g.impressionURLTemplates=d.impressionURLTemplates.concat(g.impressionURLTemplates),null!=d.trackingEvents)for(s=g.creatives,p=0,m=s.length;m>p;p++)for(c=s[p],t=Object.keys(d.trackingEvents),q=0,o=t.length;o>q;q++)e=t[q],(i=c.trackingEvents)[e]||(i[e]=[]),c.trackingEvents[e]=c.trackingEvents[e].concat(d.trackingEvents[e]);n.ads.splice(f,0,g)}return delete d.nextWrapperURL,h()}))}(g);return h()}}(this))},a.childByName=function(a,b){var c,d,e,f;for(f=a.childNodes,d=0,e=f.length;e>d;d++)if(c=f[d],c.nodeName===b)return c},a.childsByName=function(a,b){var c,d,e,f,g;for(d=[],g=a.childNodes,e=0,f=g.length;f>e;e++)c=g[e],c.nodeName===b&&d.push(c);return d},a.parseAdElement=function(a){var b,c,d,e;for(e=a.childNodes,c=0,d=e.length;d>c;c++){if(b=e[c],"Wrapper"===b.nodeName)return this.parseWrapperElement(b);if("InLine"===b.nodeName)return this.parseInLineElement(b)}},a.parseWrapperElement=function(a){var b,c,d;return b=this.parseInLineElement(a),d=this.childByName(a,"VASTAdTagURI"),null!=d&&(b.nextWrapperURL=this.parseNodeText(d)),c=b.creatives[0],null!=c&&null!=c.trackingEvents&&(b.trackingEvents=c.trackingEvents),null!=b.nextWrapperURL?b:void 0},a.parseInLineElement=function(a){var b,c,d,f,g,h,i,j,k,l,m,n,o,p;for(b=new e,n=a.childNodes,h=0,k=n.length;k>h;h++)switch(g=n[h],g.nodeName){case"Error":b.errorURLTemplates.push(this.parseNodeText(g));break;case"Impression":b.impressionURLTemplates.push(this.parseNodeText(g));break;case"Creatives":for(o=this.childsByName(g,"Creative"),i=0,l=o.length;l>i;i++)for(d=o[i],p=d.childNodes,j=0,m=p.length;m>j;j++)switch(f=p[j],f.nodeName){case"Linear":c=this.parseCreativeLinearElement(f),c&&b.creatives.push(c);break;case"CompanionAds":c=this.parseCompanionAd(f),c&&b.creatives.push(c)}}return b},a.parseCreativeLinearElement=function(a){var b,c,d,e,f,g,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A;if(b=new h,b.duration=this.parseDuration(this.parseNodeText(this.childByName(a,"Duration"))),-1===b.duration&&"Wrapper"!==a.parentNode.parentNode.parentNode.nodeName)return null;for(j=a.getAttribute("skipoffset"),null==j?b.skipDelay=null:"%"===j.charAt(j.length-1)?(g=parseInt(j,10),b.skipDelay=b.duration*(g/100)):b.skipDelay=this.parseDuration(j),n=this.childByName(a,"VideoClicks"),null!=n&&(b.videoClickThroughURLTemplate=this.parseNodeText(this.childByName(n,"ClickThrough")),b.videoClickTrackingURLTemplate=this.parseNodeText(this.childByName(n,"ClickTracking"))),x=this.childsByName(a,"TrackingEvents"),p=0,t=x.length;t>p;p++)for(l=x[p],y=this.childsByName(l,"Tracking"),q=0,u=y.length;u>q;q++)k=y[q],c=k.getAttribute("event"),m=this.parseNodeText(k),null!=c&&null!=m&&(null==(o=b.trackingEvents)[c]&&(o[c]=[]),b.trackingEvents[c].push(m));for(z=this.childsByName(a,"MediaFiles"),r=0,v=z.length;v>r;r++)for(f=z[r],A=this.childsByName(f,"MediaFile"),s=0,w=A.length;w>s;s++)e=A[s],d=new i,d.fileURL=this.parseNodeText(e),d.deliveryType=e.getAttribute("delivery"),d.codec=e.getAttribute("codec"),d.mimeType=e.getAttribute("type"),d.bitrate=parseInt(e.getAttribute("bitrate")||0),d.minBitrate=parseInt(e.getAttribute("minBitrate")||0),d.maxBitrate=parseInt(e.getAttribute("maxBitrate")||0),d.width=parseInt(e.getAttribute("width")||0),d.height=parseInt(e.getAttribute("height")||0),b.mediaFiles.push(d);return b},a.parseCompanionAd=function(a){var b,c,d,e,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x;for(d=new g,u=this.childsByName(a,"Companion"),m=0,q=u.length;q>m;m++){for(c=u[m],b=new f,b.id=c.getAttribute("id")||null,b.width=c.getAttribute("width"),b.height=c.getAttribute("height"),v=this.childsByName(c,"StaticResource"),n=0,r=v.length;r>n;n++)h=v[n],b.type=h.getAttribute("creativeType")||0,b.staticResource=this.parseNodeText(h);for(w=this.childsByName(c,"TrackingEvents"),o=0,s=w.length;s>o;o++)for(j=w[o],x=this.childsByName(j,"Tracking"),p=0,t=x.length;t>p;p++)i=x[p],e=i.getAttribute("event"),k=this.parseNodeText(i),null!=e&&null!=k&&(null==(l=b.trackingEvents)[e]&&(l[e]=[]),b.trackingEvents[e].push(k));b.companionClickThroughURLTemplate=this.parseNodeText(this.childByName(c,"CompanionClickThrough")),d.variations.push(b)}return d},a.parseDuration=function(a){var b,c,d,e,f;return null==a?-1:(b=a.split(":"),3!==b.length?-1:(f=b[2].split("."),e=parseInt(f[0]),2===f.length&&(e+=parseFloat("0."+f[1])),d=parseInt(60*b[1]),c=parseInt(60*b[0]*60),isNaN(c||isNaN(d||isNaN(e||d>3600||e>60)))?-1:c+d+e))},a.parseNodeText=function(a){return a&&(a.textContent||a.text)},a}(),b.exports=j},{"./ad.coffee":2,"./companionad.coffee":4,"./creative.coffee":5,"./mediafile.coffee":7,"./response.coffee":9,"./urlhandler.coffee":11,"./util.coffee":14}],9:[function(a,b,c){var d;d=function(){function a(){this.ads=[],this.errorURLTemplates=[]}return a}(),b.exports=d},{}],10:[function(a,b,c){var d,e,f,g,h,i={}.hasOwnProperty,j=function(a,b){function c(){this.constructor=a}for(var d in b)i.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};e=a("./client.coffee"),h=a("./util.coffee"),f=a("./creative.coffee").VASTCreativeLinear,d=a("events").EventEmitter,g=function(a){function b(a,b){var c,d,g;this.ad=a,this.creative=b,this.muted=!1,this.impressed=!1,this.skipable=!1,this.skipDelayDefault=-1,this.trackingEvents={},this.emitAlwaysEvents=["creativeView","start","firstQuartile","midpoint","thirdQuartile","complete","rewind","skip","closeLinear","close"],g=b.trackingEvents;for(c in g)d=g[c],this.trackingEvents[c]=d.slice(0);b instanceof f?(this.assetDuration=b.duration,this.quartiles={firstQuartile:Math.round(25*this.assetDuration)/100,midpoint:Math.round(50*this.assetDuration)/100,thirdQuartile:Math.round(75*this.assetDuration)/100},this.skipDelay=b.skipDelay,this.linear=!0,this.clickThroughURLTemplate=b.videoClickThroughURLTemplate,this.clickTrackingURLTemplate=b.videoClickTrackingURLTemplate):(this.skipDelay=-1,this.linear=!1),this.on("start",function(){e.lastSuccessfullAd=+new Date})}return j(b,a),b.prototype.setProgress=function(a){var b,c,d,e,f,g,h,i,j;if(f=null===this.skipDelay?this.skipDelayDefault:this.skipDelay,-1===f||this.skipable||(f>a?this.emit("skip-countdown",f-a):(this.skipable=!0,this.emit("skip-countdown",0))),this.linear&&this.assetDuration>0){if(c=[],a>0){c.push("start"),d=Math.round(a/this.assetDuration*100),c.push("progress-"+d+"%"),j=this.quartiles;for(e in j)g=j[e],a>=g&&g+1>=a&&c.push(e)}for(h=0,i=c.length;i>h;h++)b=c[h],this.track(b,!0);a<this.progress&&this.track("rewind")}return this.progress=a},b.prototype.setMuted=function(a){return this.muted!==a&&this.track(a?"muted":"unmuted"),this.muted=a},b.prototype.setPaused=function(a){return this.paused!==a&&this.track(a?"pause":"resume"),this.paused=a},b.prototype.setFullscreen=function(a){return this.fullscreen!==a&&this.track(a?"fullscreen":"exitFullscreen"),this.fullscreen=a},b.prototype.setSkipDelay=function(a){return"number"==typeof a?this.skipDelay=a:void 0},b.prototype.load=function(){return this.impressed?void 0:(this.impressed=!0,this.trackURLs(this.ad.impressionURLTemplates),this.track("creativeView"))},b.prototype.errorWithCode=function(a){return this.trackURLs(this.ad.errorURLTemplates,{ERRORCODE:a})},b.prototype.complete=function(){return this.track("complete")},b.prototype.stop=function(){return this.track(this.linear?"closeLinear":"close")},b.prototype.skip=function(){return this.track("skip"),this.trackingEvents=[]},b.prototype.click=function(){var a,b;return null!=this.clickTrackingURLTemplate&&this.trackURLs([this.clickTrackingURLTemplate]),null!=this.clickThroughURLTemplate?(this.linear&&(b={CONTENTPLAYHEAD:this.progressFormated()}),a=h.resolveURLTemplates([this.clickThroughURLTemplate],b)[0],this.emit("clickthrough",a)):void 0},b.prototype.track=function(a,b){var c,d;null==b&&(b=!1),"closeLinear"===a&&null==this.trackingEvents[a]&&null!=this.trackingEvents.close&&(a="close"),d=this.trackingEvents[a],c=this.emitAlwaysEvents.indexOf(a),null!=d?(this.emit(a,""),this.trackURLs(d)):-1!==c&&this.emit(a,""),b===!0&&(delete this.trackingEvents[a],c>-1&&this.emitAlwaysEvents.splice(c,1))},b.prototype.trackURLs=function(a,b){return null==b&&(b={}),this.linear&&(b.CONTENTPLAYHEAD=this.progressFormated()),h.track(a,b)},b.prototype.progressFormated=function(){var a,b,c,d,e;return e=parseInt(this.progress),a=e/3600,a.length<2&&(a="0"+a),b=e/60%60,b.length<2&&(b="0"+b),d=e%60,d.length<2&&(d="0"+b),c=parseInt(100*(this.progress-e)),""+a+":"+b+":"+d+"."+c},b}(d),b.exports=g},{"./client.coffee":3,"./creative.coffee":5,"./util.coffee":14,events:1}],11:[function(a,b,c){var d,e,f;f=a("./urlhandlers/xmlhttprequest.coffee"),e=a("./urlhandlers/flash.coffee"),d=function(){function b(){}return b.get=function(b,c){return"undefined"==typeof window||null===window?a("./urlhandlers/node.coffee").get(b,c):f.supported()?f.get(b,c):e.supported()?e.get(b,c):c()},b}(),b.exports=d},{"./urlhandlers/flash.coffee":12,"./urlhandlers/xmlhttprequest.coffee":13}],12:[function(a,b,c){var d;d=function(){function a(){}return a.xdr=function(){var a;return window.XDomainRequest&&(a=new XDomainRequest),a},a.supported=function(){return!!this.xdr()},a.get=function(a,b){var c,d;return(d="function"==typeof window.ActiveXObject?new window.ActiveXObject("Microsoft.XMLDOM"):void 0)?(d.async=!1,c=this.xdr(),c.open("GET",a),c.send(),c.onload=function(){return d.loadXML(c.responseText),b(null,d)}):b()},a}(),b.exports=d},{}],13:[function(a,b,c){var d;d=function(){function a(){}return a.xhr=function(){var a;return a=new window.XMLHttpRequest,"withCredentials"in a?a:void 0},a.supported=function(){return!!this.xhr()},a.get=function(a,b){var c;return c=this.xhr(),c.open("GET",a),c.send(),c.onreadystatechange=function(){return 4===c.readyState?b(null,c.responseXML):void 0}},a}(),b.exports=d},{}],14:[function(a,b,c){var d;d=function(){function a(){}return a.track=function(a,b){var c,d,e,f,g,h;for(d=this.resolveURLTemplates(a,b),h=[],f=0,g=d.length;g>f;f++)c=d[f],"undefined"!=typeof window&&null!==window&&(e=new Image,h.push(e.src=c));return h},a.resolveURLTemplates=function(a,b){var c,d,e,f,g,h,i,j,k;d=[],null==b&&(b={}),"CACHEBUSTING"in b||(b.CACHEBUSTING=Math.round(1e10*Math.random())),b.random=b.CACHEBUSTING;for(j=0,k=a.length;k>j;j++){c=a[j],h=c;for(e in b)i=b[e],f="["+e+"]",g="%%"+e+"%%",h=h.replace(f,i),h=h.replace(g,i);d.push(h)}return d},a.storage=function(){var a,b,c,d;try{c="undefined"!=typeof window&&null!==window?window.localStorage||window.sessionStorage:null}catch(e){d=e,c=null}return b=function(a){var b,c;try{if(c="__VASTUtil__",a.setItem(c,c),a.getItem(c)!==c)return!0}catch(d){return b=d,!0}return!1},(null==c||b(c))&&(a={},c={length:0,getItem:function(b){return a[b]},setItem:function(b,c){a[b]=c,this.length=Object.keys(a).length},removeItem:function(b){delete a[b],this.length=Object.keys(a).length},clear:function(){a={},this.length=0}}),c}(),a}(),b.exports=d},{}]},{},[6])(6)}),function(a,b,c){"use strict";var d=function(a){var b,c,d;for(c=1;c<arguments.length;c++){b=arguments[c];for(d in b)b.hasOwnProperty(d)&&(a[d]=b[d])}return a},e={skip:5},f=function(b,d){return{createSourceObjects:function(c){var d,e,f,g={},h=b.options().techOrder;for(d=0,e=h.length;e>d;d++){var i=h[d].charAt(0).toUpperCase()+h[d].slice(1);if(f=a.videojs[i],f&&f.isSupported())for(var j=0,k=c.length;k>j;j++){var l=c[j],m={type:l.mimeType,src:l.fileURL};f.canPlaySource(m)&&(void 0===g[h[d]]&&(g[h[d]]=[]),g[h[d]].push({type:l.mimeType,src:l.fileURL,width:l.width,height:l.height}))}}var n=[];for(e=0;e<h.length;e++)if(f=h[e],void 0!==g[f])for(d=0;d<g[f].length;d++)n.push(g[f][d]);return n},getContent:function(){c.client.get(d.url,function(a){if(a)for(var d=0;d<a.ads.length;d++){var e=a.ads[d];b.vast.companion=void 0;for(var f=0;f<e.creatives.length;f++){var g=e.creatives[f],h=!1,i=!1;if("linear"!==g.type||h)"companion"!==g.type||i||(b.vast.companion=g,i=!0);else if(g.mediaFiles.length){if(b.vast.sources=b.vast.createSourceObjects(g.mediaFiles),!b.vast.sources.length)return void b.trigger("adscanceled");b.vastTracker=new c.tracker(e,g),h=!0}}if(b.vastTracker){b.trigger("vast-ready");break}c.util.track(e.errorURLTemplates,{ERRORCODE:403})}b.vastTracker||b.trigger("adscanceled")})},setupEvents:function(){var a=!1,d=function(){b.vastTracker.load()},e=function(){isNaN(b.vastTracker.assetDuration)&&(b.vastTracker.assetDuration=b.duration()),b.vastTracker.setProgress(b.currentTime())},f=function(){b.vastTracker.setPaused(!0),b.one("play",function(){b.vastTracker.setPaused(!1)})},g=function(){c.util.track(b.vastTracker.ad.errorURLTemplates,{ERRORCODE:405}),a=!0,b.trigger("ended")};b.on("canplay",d),b.on("timeupdate",e),b.on("pause",f),b.on("error",g),b.one("vast-preroll-removed",function(){b.off("canplay",d),b.off("timeupdate",e),b.off("pause",f),b.off("error",g),a||b.vastTracker.complete()})},preroll:function(){b.ads.startLinearAdMode(),b.vast.showControls=b.controls(),b.vast.showControls&&b.controls(!1),b.src(b.vast.sources);var e;b.vastTracker.clickThroughURLTemplate&&(e=c.util.resolveURLTemplates([b.vastTracker.clickThroughURLTemplate],{CACHEBUSTER:Math.round(1e10*Math.random()),CONTENTPLAYHEAD:b.vastTracker.progressFormated()})[0]);var f=a.document.createElement("a");f.className="vast-blocker",f.href=e||"#",f.target="_blank",f.onclick=function(){if(b.paused())return b.play(),!1;var a=b.vastTracker.clickTrackingURLTemplate;a&&b.vastTracker.trackURLs([a]),b.trigger("adclick")},b.vast.blocker=f,b.el().insertBefore(f,b.controlBar.el());var g=a.document.createElement("div");g.className="vast-skip-button",d.skip<0&&(g.style.display="none"),b.vast.skipButton=g,b.el().appendChild(g),b.on("timeupdate",b.vast.timeupdate),g.onclick=function(c){return(" "+b.vast.skipButton.className+" ").indexOf(" enabled ")>=0&&(b.vastTracker.skip(),b.vast.tearDown()),void 0===a.Event.prototype.stopPropagation?!1:void c.stopPropagation()},b.vast.setupEvents(),b.one("ended",b.vast.tearDown),b.trigger("vast-preroll-ready")},tearDown:function(){b.vast.skipButton.parentNode.removeChild(b.vast.skipButton),b.vast.blocker.parentNode.removeChild(b.vast.blocker),b.off("timeupdate",b.vast.timeupdate),b.off("ended",b.vast.tearDown),b.ads.endLinearAdMode(),b.vast.showControls&&b.controls(!0),b.trigger("vast-preroll-removed")},timeupdate:function(a){b.loadingSpinner.el().style.display="none";var c=Math.ceil(d.skip-b.currentTime());c>0?b.vast.skipButton.innerHTML="Skip in "+c+"...":-1===(" "+b.vast.skipButton.className+" ").indexOf(" enabled ")&&(b.vast.skipButton.className+=" enabled",b.vast.skipButton.innerHTML="Skip")}}},g=function(b){var c=this,g=d({},e,b||{});return void 0===c.ads?(a.console.error("vast video plugin requires videojs-contrib-ads, vast plugin not initialized"),null):(c.viblast(),c.ads(),c.vast=new f(c,g),c.on("vast-ready",function(){c.trigger("adsready")}),c.on("vast-preroll-ready",function(){c.play()}),c.on("vast-preroll-removed",function(){c.play()}),c.on("contentupdate",function(){c.vast.getContent(g.url)}),c.on("readyforpreroll",function(){return g.url?void c.vast.preroll():(c.trigger("adscanceled"),null)}),c.currentSrc()&&c.vast.getContent(g.url),c)};b.plugin("vast",g)}(window,videojs,DMVAST);
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
  var gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  var useSSL = 'https:' == document.location.protocol;
  gads.src = (useSSL ? 'https:' : 'http:') +
    '//www.googletagservices.com/tag/js/gpt.js';
  var node = document.getElementsByTagName('script')[0];
  node.parentNode.insertBefore(gads, node);
})();

var adSlots = [];
googletag.cmd.push(function() {
    adSlots['subaru1'] = googletag.defineSlot('/6735/6735.npr.viz/national_park_vr', [301, 270], 'subaru1').addService(googletag.pubads());
    adSlots['subaru2'] = googletag.defineSlot('/6735/6735.npr.viz/national_park_vr', [302, 270], 'subaru2').addService(googletag.pubads());

    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs();
    googletag.pubads().disableInitialLoad();
    googletag.enableServices();
});

function refreshSlot(slotName) {
    googletag.cmd.push(function() {
        googletag.pubads().refresh([adSlots[slotName]]);
    });
    return false;
}

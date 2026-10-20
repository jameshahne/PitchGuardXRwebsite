(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panels = { 'tab-watch': document.getElementById('panel-watch'), 'tab-play': document.getElementById('panel-play') };
  var video = document.querySelector('video');
  var frame = document.getElementById('unity-frame');
  var gate = document.getElementById('gate');
  var bar = document.getElementById('bar');
  var loaded = false;

  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panels[t.id].hidden = !on;
    });
    if (focus) tab.focus();
    if (tab.id !== 'tab-watch' && video && !video.paused) video.pause();
    try { history.replaceState(null, '', tab.id === 'tab-play' ? '#play' : '#watch'); } catch (e) {}
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t, false); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') n = tabs[0];
      else if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); select(n, true); }
    });
  });

  function loadUnity() {
    if (loaded) return;
    loaded = true;
    frame.src = 'unity/index.html';
    frame.hidden = false;
    gate.hidden = true;
    bar.hidden = false;
  }
  document.getElementById('load-btn').addEventListener('click', loadUnity);

  var fs = document.getElementById('fs-btn');
  fs.addEventListener('click', function () {
    var el = frame;
    var req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) { try { req.call(el); } catch (e) {} }
  });
  if (!(frame.requestFullscreen || frame.webkitRequestFullscreen)) fs.hidden = true;

  if (location.hash === '#play') select(document.getElementById('tab-play'), false);
})();

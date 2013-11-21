var LOG = function(msg) {
  window.console.log(msg);
};

var $ = function(id) {
  return document.getElementById(id);
};

var openDirHandler = function(e) {
  LOG('openDirHandler');
  chrome.fileSystem.chooseEntry({
    'type': 'openDirectory'
  }, function(entry, fileEntries) {
    LOG('callback');

    LOG('entry: ' + entry);
    for (var key in entry) {
      LOG('key: ' + key + ', val: ' + entry[key]);
    }

    var dirEntry = entry;
    var reader = dirEntry.createReader();
    reader.readEntries(function(entries) {
      LOG('reader.readEntries, entries: ' + entries);
      for (var i = 0; i < entries.length; ++i) {
        var entry = entries[i];
        if (entry.isDirectory) { LOG('dir: ' + entry.fullPath); }
        else if (entry.isFile) { LOG('file: ' + entry.fullPath); }
        else { LOG('unkw: ' + entry.fullPath); }

        if (entry.isFile) {
          // path.
          chrome.fileSystem.getDisplayPath(entry, function(text) {
            window.console.log('**** 2. finally ****');
            window.console.log('path: ' + text);
          });
          // size.
          entry.file(function(f) {
            window.console.log('f.size: ' + f.size);
          });
        }
      }
    });
  });
};

window.onload = function() {
  $('open-dir').onclick = openDirHandler;
};
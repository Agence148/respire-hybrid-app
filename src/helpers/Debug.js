if (window.debug) {

  document.addEventListener('deviceready', showDeviceProperties, false);
  function showDeviceProperties() {
    let box = document.createElement('div');
    box.setAttribute('id', 'device_properties');
    box.innerHTML  = '\
      <input id="show_device_properties" type="checkbox">\
      <label for="show_device_properties"><i class="icon-cog-alt"></i></label>\
      <table>\
        <tr><th>Cordova version</th><td>' + device.cordova + '</td></tr>\
        <tr><th>Model</th><td>' + device.model + '</td></tr>\
        <tr><th>Platform</th><td>' + device.platform + '</td></tr>\
        <tr><th>UUID</th><td>' + device.uuid + '</td></tr>\
        <tr><th>OS Version</th><td>' + device.version + '</td></tr>\
        <tr><th>Manufacturer</th><td>' + device.manufacturer + '</td></tr>\
        <tr><th>Virtual</th><td>' + device.isVirtual + '</td></tr>\
        <tr><th>Serial number</th><td>' + device.serial + '  </td></tr>\
      </table>\
    ';
    document.body.appendChild(box);
  }

}

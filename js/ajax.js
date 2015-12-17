var api = {
  url: 'http://localhost:3000',
  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },
  register: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/register',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },
  login: function(credentials,callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },
  createDestination: function(token, destinationData, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/destinations',
      contentType: 'application/json; charset=utf-8',
      headers: {
        'Authorization': 'Token token="' + token + '"'
      },
      data: JSON.stringify(destinationData),
      dataType: 'json'
    }, callback);
  },
  loadDestination: function(token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/destinations',
      headers: {
        'Authorization': 'Token token="' + token + '"'
      },
      dataType: 'json'
    }, callback);
  }
};

var form2object = function(form) {
    var data = {};
    $(form).find("input").each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };

  // {"credentials": {email: xxx, password: xxx, password_confirmation: xxx} }
  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

$(function() {
  //take the form and read the input text with the name
  //property, then form a data object {name: value}
  // data = {email: xxx, password: xxx,
  // password_confirmation: xxx}

  $('#register-form').on('submit',function(e){
    e.preventDefault();
    var credentials = wrap("credentials", form2object(this));
    console.log(credentials);
    var registerCallback = function(error, data){
      if(error){
        console.log(error);
      } else {
        console.log('success');
        console.log(data);
      }
    };
    api.register(credentials, registerCallback);

  });

  $('#login-form').on('submit',function(e){
    e.preventDefault();
    var credentials = wrap("credentials", form2object(this));

    var loginCallback = function(error, data){
      if(error){
        console.log(error);
      } else {
        console.log('success');
          // retrieve token after login successfully and
          // assign it to token.
          localStorage.setItem("token", data.user.token);
          localStorage.setItem("userID", data.user.id);
          // load closet page after user login succeeded.
          window.location.href = '/adddestination.html';
        }
      };
      api.login(credentials, loginCallback);

    });
});

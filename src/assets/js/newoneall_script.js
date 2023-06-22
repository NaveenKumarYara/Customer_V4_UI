
var mfunction = function (args) {
    // Name of the event
    console.log(args.event);

    // Name of the service
    console.log(args.service);
}
function callback_uri(arg){
    document.getElementById('callback_uri').value  = arg;
    // alert(arg);
}
/* Example */
function myfunction() {
     
      /* Replace #callback_uri# by the url to your own callback script */
      //var callback_uri = window.location.href;
      var callback_uri = "https://identityapi-dev.arytic.com/oneCallPostMethod";
      /* Embeds the buttons into the container oa_social_login_container */
      var _oneall = _oneall || [];
      _oneall.push(['social_login', 'set_providers', ['facebook', 'google', 'linkedin', 'twitter']]);
      _oneall.push(['social_login', 'set_callback_uri', callback_uri]);
      _oneall.push(['social_login', 'set_event', 'on_login_end', my_function]);
      _oneall.push(['social_login', 'do_render_ui', 'oa_social_login_container']);
       

      /* Example */
      var my_function = function (args) {
        // Name of the event
        
        console.log(args.event);

        // Name of the service
        console.log(args.service);

        // Reference to the DOM element of the widget
        console.log(args.widget);

        // Name of the social network
        console.log(args.provider.name);

        // Key of the social network
        console.log(args.provider.key);

        // Status of the connection
        console.log(args.connection.status);

        // Used connection_token
        // http://docs.oneall.com/api/resources/connections/
        console.log(args.connection.connection_token);

        // Used user_token
        // http://docs.oneall.com/api/resources/users/
        console.log(args.connection.user_token);
      }
      _oneall.push(['social_login', 'set_event', 'on_login_end', my_function]);
    
    document.getElementById('login_container').innerHTML=document.getElementById('oa_social_login_container').innerHTML
}

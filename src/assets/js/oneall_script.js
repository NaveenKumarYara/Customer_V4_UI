foo = {
    bar: "value"
  }
  url = "xyz";
  var val = document.currentScript.getAttribute('val');
  
  
  // alert(val);
  // var url = "https://arytic.google.com/";
  $(document).ready(function () { /* code here */ });
  var mfunction = function (args) {
    // Name of the event
    console.log(args.event);
  
    // Name of the service
    console.log(args.service);
  }
  
  function callback_uri(arg) {
    // document.getElementById('callback_uri').value  = arg;
    // alert(arg);
  }
  myfunction();
  /* Example */
  function myfunction() {
    // console.log("insdzsd")
    // document.getElementById('hiddenTag').style.display = "none"
    // foo["bar"] = "baz";
    // console.log(window['url']);
    window['url'] = "acb";
    // console.log(window['url']);
  
    // var _oneall = _oneall || [];
    // _oneall.push(
    //   ['share_dialog', 'set_link', 'https://arytic.com/'],
    //   ['share_dialog', 'set_message', 'The OneAll Share Dialog gives your users the ability to publish an individual story to their social network account. The service leverages Social Login to authenticate the user and then either displays a fully customizable share dialog or redirects the user to the social network to share the content.'],
    //   ['share_dialog', 'set_image', 'https://secure.oneallcdn.com/img/services/share-dialog/screenshot.png'],
    //   ['share_dialog', 'attach_onclick_display', 'share-dialog-linkedin', 'linkedin'],
    //   ['share_dialog', 'attach_onclick_display', 'share-dialog-twitter', 'twitter'],
    //   ['share_dialog', 'attach_onclick_display', 'share-dialog-facebook', 'facebook']
    // );
  
  }
  
  
  var oneall_subdomain = 'aryticcom';
  /* The library is loaded asynchronously */
  var oa = document.createElement('script');
  oa.type = 'text/javascript'; oa.async = true;
  oa.src = '//' + oneall_subdomain + '.api.oneall.com/socialize/library.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(oa, s);
  
  var jobTitle = null;
  var CompanyName = null;
  var Img = null;

  // console.log(window['url']);
  if(document.getElementById('title')!= null)
  {
    jobTitle = document.getElementById('title').value;
  }
  else
  {
    jobTitle = " ";
  }
  if(document.getElementById('Company_Name')!= null)
  {
    CompanyName = document.getElementById('Company_Name').value;
  }
  else
  {
    CompanyName = " ";
  }
  if(document.getElementById('Image')!= null)
  {
    Img = document.getElementById('Image').value;
  }
  else
  {
    Img = " ";
  }

  if(document.getElementById('job-link')!= null)
  {
    url = document.getElementById('job-link').value;
  }
  else
  {
    url = " ";
  }
 

 
  var _oneall = _oneall || [];
  _oneall.push(
    ['share_dialog', 'set_link', url],
    ['share_dialog', 'set_message', 'Title : ' + ' ' + CompanyName + '\n' + 'Name              : ' + ' ' + jobTitle + '\n'],
    ['share_dialog', 'set_image', Img],
    ['share_dialog', 'attach_onclick_display', 'share-dialog-linkedin', 'linkedin'],
    ['share_dialog', 'attach_onclick_display', 'share-dialog-twitter', 'twitter'],
    ['share_dialog', 'attach_onclick_display', 'share-dialog-facebook', 'facebook']
  );
  
  
  var callback_uri = "https://identityapi-qa.arytic.com/oneCallPostMethod";
  _oneall.push(['social_login', 'set_providers', ['facebook', 'google', 'linkedin', 'twitter']]);
  _oneall.push(['social_login', 'set_callback_uri', callback_uri]);
  // _oneall.push(['social_login', 'set_event', 'on_login_end', my_function]);
  _oneall.push(['social_login', 'do_render_ui', 'oa_social_login_container']);
  console.log(_oneall);
  
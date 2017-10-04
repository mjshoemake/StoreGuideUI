
var mapComponents = Object.create(null);

function onSignIn(googleUser) {
  console.log('authentication.js -> onSignIn(googleUser)  Event received from Google API!!!');
  var profile = googleUser.getBasicProfile();

  if (mapComponents.headerComp != undefined) {
    console.log('Angular HeaderComp found.');
    mapComponents.headerComp.loggedInEvent(profile.getId(),
                                           profile.getName(),
                                           profile.getGivenName(),
                                           profile.getFamilyName(),
                                           profile.getImageUrl(),
                                           profile.getEmail());

  } else {
    console.log('Angular HeaderComp NOT found.');
  }
}

/*
function onSignIn() {
  // Google API not accessible.
  console.log('authentication.js -> onSignIn()  Google API not accessible(!!!).');
  if (mapComponents.headerComp != undefined) {
    console.log('authentication.js -> onSignIn() Angular HeaderComp found.');
/*
    mapComponents.headerComp.loggedInEvent("guest",
      "Guest",
      "Guest",
      "",
      undefined,
      "crossewalk@gmail.com");
*/
/*
  } else {
    console.log('authentication.js -> onSignIn() Angular HeaderComp NOT found.');
  }
}
*/

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

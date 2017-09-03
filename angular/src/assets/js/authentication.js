
var mapComponents = Object.create(null);

function onSignIn(googleUser) {
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

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

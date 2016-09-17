import {SET_PROFILE_META, SetProfileMetaAction} from './ActionTypes'
import {UserType} from '../reducers/StateTypes'

declare var gapi: any;

function setProfileMeta(user: UserType): SetProfileMetaAction {
  return {type: 'SET_PROFILE_META', user};
}

export function loginUser(): ((dispatch: Redux.Dispatch<any>)=>void) {
  return (dispatch: Redux.Dispatch<any>) => {
    gapi.auth2.getAuthInstance().signIn().then(function(googleUser: any) {
      var id_token = googleUser.getAuthResponse().id_token;
      var basic_profile = googleUser.getBasicProfile();
      var name: string = basic_profile.getName();
      var image: string = basic_profile.getImageUrl();

      $.post('http://localhost:8080/auth/google', JSON.stringify({id_token, name, image}), function(data) {
        dispatch(setProfileMeta({
          id: data,
          displayName: name,
          image: image
        }));
      });
    });
  }
}

export function logoutUser(): ((dispatch: Redux.Dispatch<any>)=>void) {
  return (dispatch: Redux.Dispatch<any>) => {
    gapi.auth2.getAuthInstance().signOut().then(function() {
      $.post('http://localhost:8080/auth/logout', function(data) {
        dispatch(setProfileMeta({}));
      });
    });
  }
}
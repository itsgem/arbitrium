 import {patch} from 'utils/http';

export default {
    clientUnlock(id) {
    return patch(`user/${id}/unlock`, {
      params: {
        callback_url: window.location.origin+"/coffee/"
      }
    });
  }
}

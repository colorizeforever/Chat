import { getToken } from '../utils/tokenHelper';

export const formSocketOptions = () => ({
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: getToken()
      }
    }
  }
});

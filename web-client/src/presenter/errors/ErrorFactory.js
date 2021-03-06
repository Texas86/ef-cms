import { ActionError } from './ActionError';
import { InvalidRequestError } from './InvalidRequestError';
import { NotFoundError } from './NotFoundError';
import { ServerInvalidResponseError } from './ServerInvalidResponseError';
import { UnauthorizedRequestError } from './UnauthorizedRequestError';
import { UnidentifiedUserError } from './UnidentifiedUserError';

export const ErrorFactory = {
  getError: e => {
    let responseCode = (e.response && e.response.status) || e.statusCode;
    if (403 == responseCode) {
      return new UnauthorizedRequestError(e);
    } else if (404 == responseCode) {
      return new NotFoundError(e);
    } else if (401 == responseCode) {
      return new UnidentifiedUserError();
    } else if (/^4/.test(responseCode)) {
      return new InvalidRequestError(e);
    } else if (/^5/.test(responseCode)) {
      return new ServerInvalidResponseError(e);
    } else if (!e.response) {
      // this should only happen if cognito throws a cors exception due to expired tokens or invalid tokens
      return new UnidentifiedUserError(e);
    } else {
      return new ActionError(e);
    }
  },
};

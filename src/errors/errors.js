/*
TOKEN_EXPIRED: The user's credential is no longer valid. The user must sign in again.
USER_DISABLED: The user account has been disabled by an administrator.
USER_NOT_FOUND: The user corresponding to the refresh token was not found. It is likely the user was deleted.
API key not valid. Please pass a valid API key. (invalid API key provided)
INVALID_REFRESH_TOKEN: An invalid refresh token is provided.
Invalid JSON payload received. Unknown name \"refresh_tokens\": Cannot bind query parameter. Field 'refresh_tokens' could not be found in request message.
INVALID_GRANT_TYPE: The grant type specified is invalid.
MISSING_REFRESH_TOKEN: No refresh token provided.
PROJECT_NUMBER_MISMATCH: The project number of the refresh token does not match that of the API key provided.
*/

const errorMap = {
  INVALID_LOGIN_CREDENTIALS: 'Invalid login credentials. Try again or Sign up.',
  INVALID_EMAIL: 'Invalid e-mail',
}

function getErrorMessage(errorMessage) {
  return errorMap[errorMessage] || 'Something went wrong... try again later'
}

export default getErrorMessage

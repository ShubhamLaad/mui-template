import { DEFAULT_API_ERROR } from '../constants/APP';

export function getAPIErrorMsg(error) {
  return error?.data?.message || error?.data?.Errors || [DEFAULT_API_ERROR];
}

export function forgotPassAPIErrorMsg(error) {
  return (
    error?.data?.message || error?.data?.errors?.Email || [DEFAULT_API_ERROR]
  );
}

export function registrationPassAPIErrorMsg(error) {
  return error?.data?.message || error?.data?.title || [DEFAULT_API_ERROR];
}

export function resetPassAPIErrorMsg(error) {
  return error?.data?.message | error?.data?.title || [DEFAULT_API_ERROR];
}

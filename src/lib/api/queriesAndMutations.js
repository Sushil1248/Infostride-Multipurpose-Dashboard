
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

import APIUtils from './APIUtils';
import AuthService from './AuthServices';
import AuthenticatedService from './AuthenticatedService';

/* ================================================================= Authentication API Start ================================================================ */

export const useLoginMutation = () =>
  useMutation(
    (credentials) => APIUtils.handleRequest(AuthService.login(credentials)),
    {
      onError: (error) => {
        toast.error(error)
      }
    }
  );

export const useRegisterMutation = () =>
  useMutation(
    (credentials) => APIUtils.handleRequest(AuthService.register(credentials)),
    {
      onError: (error) => {
        console.error('Registration error:', error);
      }
    }
  );

/* ================================================================= Authentication API End ================================================================ */

/* ================================================================= Require Authentication API's ================================================================ */


export const useGetProfileMutation = () =>
  useMutation(
    () => APIUtils.handleRequest(AuthenticatedService.getProfile()),
    {
      onError: (error) => {
        console.error('Registration error:', error);
      }
    }
  );

/* ================================================================= Require Authentication API's ================================================================ */

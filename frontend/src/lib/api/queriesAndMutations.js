
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

  export const useCreateOrEditUser = () =>
  useMutation(
    (user) => APIUtils.handleRequest(AuthenticatedService.createUser({user})),
    {
      onError: (error) => {
        console.error('User Create Or Ediit Error:', error);
      }
    }
  );

  export const useGetUserListing = () =>
  useMutation(
    () => APIUtils.handleRequest(AuthenticatedService.getUserListing()),
    {
      onError: (error) => {
        console.error('Get User listing error:', error);
      }
    }
  );

  export const useCreateOrEditWebsite = () =>
  useMutation(
    (website) => APIUtils.handleRequest(AuthenticatedService.createWebsite({website})),
    {
      onError: (error) => {
        console.error('Website Create Or Ediit Error:', error);
      }
    }
  );

  export const useGetWebsiteListing = () =>
  useMutation(
    () => APIUtils.handleRequest(AuthenticatedService.getWebsiteListing()),
    {
      onError: (error) => {
        console.error('Get Website listing error:', error);
      }
    }
  );

  export const useGetWebsiteListingWithMenus = () =>
  useMutation(
    () => APIUtils.handleRequest(AuthenticatedService.getWebsiteListingWithMenus()),
    {
      onError: (error) => {
        console.error('Get Website listing error:', error);
      }
    }
  );
  
  
 

/* ================================================================= Require Authentication API's ================================================================ */

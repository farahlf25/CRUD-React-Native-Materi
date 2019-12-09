/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-dupe-keys */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* global fetch:false */
import { API_URL, Authorization } from 'react-native-dotenv';
import cacheService from './cache';
import storage from './storage';
import { STORAGE_KEY } from './index';

export const config = {
  baseUrl: 'http://ec2-3-81-168-96.compute-1.amazonaws.com/'
};

export const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  NO_CONTENT: 204
};

const fetchData = async (url, params, customHeaders, cachedControll) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization,
    ...customHeaders
  };
  const token = await storage.get(STORAGE_KEY.TOKEN_LOGIN);
  console.log(url);
  if (token) {
    console.log(url);
    if (
      url === 'http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi'
    ) {
      headers = {
        ...headers,
        Authorization
      };
    } else {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`
      };
    }
  }

  const response = await fetch(url, {
    ...params,
    headers
  });
  // for DELETE method case
  if (response.status === STATUS_CODE.NO_CONTENT) return {};
  const json = await response.json();

  // for caching response API
  if (cachedControll) {
    await cacheService.set(cachedControll, json);
  }
  return json;
};

const get = async (endpoint, params = {}, headers = {}) => {
  let queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  if (queryString.length > 0) {
    queryString = `?${queryString}`;
  }
  const url = `${config.baseUrl}${endpoint}${queryString}`;
  const fetchParams = {
    method: 'GET'
  };
  return fetchData(url, fetchParams, headers);
};

const post = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify(params)
  };
  return fetchData(url, fetchParams, headers);
};

const patch = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PATCH',
    body: JSON.stringify(params)
  };
  return fetchData(url, fetchParams, headers);
};

const put = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PUT',
    body: JSON.stringify(params)
  };
  return fetchData(url, fetchParams, headers);
};

const remove = async (endpoint, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'DELETE'
  };
  return fetchData(url, fetchParams, headers);
};

export { get, post, put, patch, remove };

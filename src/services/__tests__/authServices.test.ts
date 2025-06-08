import { Credentials } from 'google-auth-library';
import * as getAuthTokenFromStorage from '../../storage/tokenRepository';
import * as getGoogleTokenFromApi from '../googleAuth';
import { getGoogleToken } from '../authService';

const getAuthTokenFromStorageMock = jest.spyOn(getAuthTokenFromStorage, 'getAuthTokenFromStorage');
const persistToken = jest.spyOn(getAuthTokenFromStorage, 'persistToken');
const getGoogleTokenFromApiMock = jest.spyOn(getGoogleTokenFromApi, 'getGoogleTokenFromApi',);

describe('getGoogleToken', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return stored token', async () => {
    const tokenMock: Credentials = {
      access_token: "abc",
      refresh_token: "def",
      expiry_date: 123456,
    };

    getAuthTokenFromStorageMock.mockReturnValue(tokenMock);

    expect(await getGoogleToken()).toStrictEqual({
      access_token: 'abc',
      refresh_token: 'def',
      expiry_date: 123456,
    });

    expect(persistToken).toHaveBeenCalledTimes(0)
  });

  test('should return token from api', async () => {
    getAuthTokenFromStorageMock.mockReturnValue(null)

    persistToken.mockImplementation(() => {})

    getGoogleTokenFromApiMock.mockReturnValue(new Promise((resolve) => {
      const tokens = {
        access_token: 'abc',
        refresh_token: 'def',
        expiry_date: 123456,
      }

      resolve(tokens)
    }));

    expect(await getGoogleToken()).toStrictEqual({
      access_token: 'abc',
      refresh_token: 'def',
      expiry_date: 123456,
    });

    expect(persistToken).toHaveBeenCalledTimes(1);
  });

});

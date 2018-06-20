/* eslint-disable no-magic-numbers */
/* eslint-disable import/imports-first */
/* eslint-disable import/no-imports-first */

jest.mock('pg');
import pg from 'pg';

import { resetConfig, Config } from '../config';

resetConfig(new Config({ JWT_SECRET: 'hunter2' }));

import * as query from './user';

const queryMock = jest.fn();

pg.Pool.mockImplementation(() => {
  return {
    on: jest.fn(),
    query: queryMock,
  };
});

import * as db from './db';

interface Person {
  name: string;
  age: number;
}

describe('db', () => {
  describe('user', () => {
    // FIXME: need to suppress logger
    test('getByName', async () => {
      expect(pg.Query.mock).toBeTruthy();

      expect(queryMock).toBeTruthy();

      const user = {
        id: 'abc',
        name: 'bob',
        email: 'bob@loblaw.com',
        password: 'hunter2',
        refreshToken: 'refresh',
      };

      const queryResult = {
        rows: [user],
        rowCount: 1,
      };

      queryMock.mockResolvedValue(queryResult);

      const result = await query.getByName('bob');

      expect(result).toBe(user);
    });
  });
});

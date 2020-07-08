import { InMemoryDbService } from 'angular-in-memory-web-api';

import { UsersFakeDb } from 'app/fake-db/users';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            'users': UsersFakeDb.users,
        };
    }
}

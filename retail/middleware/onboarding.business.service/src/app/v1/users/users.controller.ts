import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from './users.service';
import { AuthGuard } from '@common/index';
import { User } from './user.entity';
import { CheckAvailabilityInput } from './user.dto';

@ApiTags('Agent Module')
@Controller('agents')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly userService: UserService) {
    }

    @Get('/available')
    @ApiOperation({
        description:
            'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of agents information.',
        summary: 'List of all available agents.',
    })
    @ApiOkResponse({ type: [User], description: 'List of available agents' })
    async availableAgents(@Query() input: CheckAvailabilityInput): Promise<User[]> {
        return this.userService.availableAgents(input);
    }
}

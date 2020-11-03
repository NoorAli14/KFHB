import { ApiProperty, } from '@nestjs/swagger';
import {IsISO8601, IsString} from 'class-validator';

export class CreatedOnDTO {
    @ApiProperty({
        description: 'starting range of created_on filter',
        required: true,
    })
    @IsISO8601({strict: true})
    @IsString()
    start: string;

    @ApiProperty({
        description: 'ending range of created_on filter',
        required: true,
    })
    @IsISO8601({strict: true})
    @IsString()
    end: string;
}

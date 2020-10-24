import { ApiProperty, } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class SortByDTO {
    @ApiProperty({
        example: 'first_name',
        description: 'Name of the sorting column',
        required: true,
        type: 'string'
    })
    @IsString()
    readonly field: string;

    @ApiProperty({
        enum: ['asc', 'desc'],
        title: 'Order of sorting',
        example: 'asc',
        required: true,
    })
    @IsString()
    @IsIn(['asc', 'desc'])
    readonly direction: string;
}

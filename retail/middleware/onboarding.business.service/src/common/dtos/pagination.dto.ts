import { ApiProperty } from '@nestjs/swagger';

export class PaginationDTO {
    @ApiProperty({
        example: 250,
        description: 'Total number of record',
        required: false
    })
    readonly total: number;

    @ApiProperty({
        example: 10,
        description: 'Total number of pages',
        required: false
    })
    readonly pages: number;

    @ApiProperty({
        example: 25,
        description: 'Total number of records per page',
        required: false
    })
    readonly perPage: number;

    @ApiProperty({
        example: 6,
        description: 'Next page number',
        required: false
    })
    readonly next: number;

    @ApiProperty({
        example: 5,
        description: 'Current page number',
        required: false
    })
    readonly page: number;

}

import { ApiProperty } from '@nestjs/swagger';

export class PaginationDTO {
    @ApiProperty({
        example: 250,
        description: 'Total number of record'
    })
    readonly total: number;

    @ApiProperty({
        example: 10,
        description: 'Total number of pages'
    })
    readonly pages: number;

    @ApiProperty({
        example: 25,
        description: 'Total number of records per page'
    })
    readonly perPage: number;

    @ApiProperty({
        example: 6,
        description: 'Next page number'
    })
    readonly next: number;

    @ApiProperty({
        example: 5,
        description: 'Current page number'
    })
    readonly current: number;

    @ApiProperty({
        example: 4,
        description: 'Previous page number'
    })
    readonly prev: number;
}

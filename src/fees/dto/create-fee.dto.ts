import { ApiProperty } from "@nestjs/swagger";

export class CreateFeeDto {

    @ApiProperty({ type: String })
    studentId: string

    @ApiProperty()
    amount: number

    @ApiProperty()
    year: string
}

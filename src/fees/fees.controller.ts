import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FeesService } from './fees.service';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard, AuthRequest } from 'src/auth/auth.guard';

@Controller('fees')
export class FeesController {
  constructor(private readonly feesService: FeesService) { }


  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createFeeDto: CreateFeeDto, @Request() req: AuthRequest) {
    return this.feesService.create(createFeeDto, req.auth);
  }

  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.feesService.findAll();
  }

  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feesService.findOne(id);
  }
  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @Get('student/:studentId')
  findByStudentId(@Param('studentId') studentId: string) {
    return this.feesService.findByStudentId(studentId);
  }

  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeeDto: UpdateFeeDto) {
    return this.feesService.update(id, updateFeeDto);
  }

  @ApiBearerAuth('authentication')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feesService.remove(+id);
  }
}

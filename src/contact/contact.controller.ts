import { Body, Controller, Post } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { ComplaintDto } from './dto/complaint.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('send')
  send(@Body() dto: ContactDto) {
    return this.contactService.send(dto);
  }

  @Post('complaint')
  sendComplaint(@Body() dto: ComplaintDto) {
    return this.contactService.sendComplaint(dto);
  }
}

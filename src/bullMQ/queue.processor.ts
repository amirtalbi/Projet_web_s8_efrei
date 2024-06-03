import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('my-queue')
export class MyQueueProcessor {
  @Process()
  handleJob(job: Job) {
    console.log('Processing job:', job.data);
  }
}

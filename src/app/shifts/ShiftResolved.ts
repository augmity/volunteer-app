import { Job } from '../jobs';
import { Location } from '../locations';
import { Person } from '../people';

export interface ShiftResolved {
  id: string;
  name: string;
  fromDateTime: Date;
  toDateTime: Date;
  minPeople?: number;
  maxPeople?: number;
  color?: string;
  job: Job;
  location: Location;
  people?: Array<Person | undefined>;
}

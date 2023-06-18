import { DatePicker } from './DatePicker';

export const World = () => (
  <DatePicker open={true}>
    <DatePicker.Calendar>{() => <div>Wsh</div>}</DatePicker.Calendar>
  </DatePicker>
);

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { Value } from 'react-date-picker/dist/cjs/shared/types';
import { formatDate } from '../../app/general/useful';
import ReactDatePicker from 'react-date-picker';

type tProps = {
  label: string;
  format: string;
  value: string;
  action: (value: string) => void;
};

function DatePicker(props: tProps) {
  const [value, setValue] = useState<Value>(null);

  useEffect(() => {
    // if value were set previously but change in range resets useState
    if (props.value.length && !value) setValue(new Date(props.value));
  }, [value, props.value]);

  const onChange = (value: Value) => {
    setValue(value);
    props.action(value instanceof Date ? formatDate('YYYY-MM-DD', value) : '');
  };

  return (
    <div className="date-picker">
      {!!props.label && <label>{props.label}</label>}
      <ReactDatePicker
        onChange={onChange}
        value={value}
        format={props.format}
      />
    </div>
  );
}

export default DatePicker;

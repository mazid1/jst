import { Input } from '@chakra-ui/react';
import { forwardRef } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './jst-date-picker.css';

export type JSTDatePickerProps = ReactDatePickerProps;

export const JSTDatePicker = forwardRef<ReactDatePicker, JSTDatePickerProps>(
  function JSTDatePicker({ ...props }, ref) {
    return (
      <ReactDatePicker
        ref={ref}
        customInput={<Input />}
        dateFormat={'dd/MM/yyyy'}
        {...props}
      />
    );
  }
);

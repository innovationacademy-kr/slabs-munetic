import { FormControl, InputLabel, Input } from '@mui/material';

interface InputProps {
  width: string;
  text: string;
  fontSize: string;
  name: string;
  value: string;
  onChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
}

export default function CustomInput({
  width,
  text,
  fontSize,
  name,
  value,
  error,
  onChangeEvent,
}: InputProps) {
  return (
    <>
      {error ? (
        <FormControl error sx={{ m: 1, width }} variant="standard">
          <InputLabel htmlFor={name} sx={{ fontSize }}>
            {text}
          </InputLabel>
          <Input
            sx={{ fontSize }}
            id={name}
            value={value}
            onChange={onChangeEvent}
          />
        </FormControl>
      ) : (
        <FormControl sx={{ m: 1, width }} variant="standard">
          <InputLabel htmlFor={name} sx={{ fontSize }}>
            {text}
          </InputLabel>
          <Input
            sx={{ fontSize }}
            id={name}
            value={value}
            onChange={onChangeEvent}
          />
        </FormControl>
      )}
    </>
  );
}

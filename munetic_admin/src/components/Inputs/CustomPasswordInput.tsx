import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordInput {
  width: string;
  fontSize: string;
  showPassword: boolean;
  clickEvent: () => void;
  value: string;
  onChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function CustomPasswordInput({
  width,
  fontSize,
  showPassword,
  clickEvent,
  value,
  onChangeEvent,
  placeholder,
}: PasswordInput) {
  return (
    <FormControl sx={{ m: 1, width }} variant="standard">
      <InputLabel htmlFor="password" sx={{ fontSize }}>
        Password
      </InputLabel>
      <Input
        placeholder={placeholder}
        sx={{ fontSize }}
        id="password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChangeEvent}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={clickEvent}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

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
}

export default function CustomPasswordInputs({
  width,
  fontSize,
  showPassword,
  clickEvent,
  value,
  onChangeEvent,
}: PasswordInput) {
  return (
    <FormControl sx={{ m: 1, width }} variant="standard">
      <InputLabel htmlFor="password" sx={{ fontSize }}>
        Password
      </InputLabel>
      <Input
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

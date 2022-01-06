import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface SelectProps {
  width: string;
  onChangeEvent: (event: SelectChangeEvent) => void;
  fontSize: string;
  value: string;
  items: string[];
}

export default function CustomSelect({
  width,
  onChangeEvent,
  fontSize,
  value,
  items,
}: SelectProps) {
  return (
    <FormControl variant="standard" sx={{ m: 1, width }}>
      <InputLabel sx={{ fontSize }}>Auth</InputLabel>
      <Select
        value={value}
        onChange={onChangeEvent}
        label="Auth"
        sx={{ fontSize }}
      >
        {items.map(item => (
          <MenuItem value={item} sx={{ fontSize }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

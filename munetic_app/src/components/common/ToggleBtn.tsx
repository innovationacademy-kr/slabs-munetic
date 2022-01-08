import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ToggleBtnProps {
  first: string;
  second: string;
  value: boolean | undefined;
  handleChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean,
  ) => void;
}

export default function ToggleBtn({
  first,
  second,
  value,
  handleChange,
}: ToggleBtnProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      size="small"
      sx={{ height: '30px', marginLeft: '15px' }}
      onChange={handleChange}
    >
      <ToggleButton disabled={value} value={true}>
        {first}
      </ToggleButton>
      <ToggleButton disabled={!value} value={false}>
        {second}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

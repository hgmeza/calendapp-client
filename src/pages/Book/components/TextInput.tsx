import { TextField } from "@mui/material";
import { UserInfo } from "../Book";

import styles from "./TextInput.module.scss";

type Props = {
  label: string;
  userKey: keyof UserInfo;
  value: string;
  onChange: (key: keyof UserInfo, value: string) => void;
  required: boolean;
};

const TextInput = ({ label, userKey, value, onChange, required }: Props) => {
  return (
    <TextField
      required={required}
      id={userKey}
      label={label}
      variant="standard"
      value={value}
      onChange={event => onChange(userKey, event.target.value)}
      className={styles.textfield}
    />
  );
};

export default TextInput;

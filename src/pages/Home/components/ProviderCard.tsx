import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Provider } from "../../../services/specialty";
import { Button } from "@mui/material";

type Props = {
  data: Provider[];
  onViewProvider: (idx: number) => void;
};
const ProvidersCard = ({ data, onViewProvider }: Props) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data.map((provider, idx) => {
        const name = provider.provider;
        return (
          <React.Fragment key={`provider-${idx}`}>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={name} src="" />
              </ListItemAvatar>
              <ListItemText
                primary={name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {provider.specialty}
                    </Typography>
                    {` - ${provider.address.city}`}
                  </React.Fragment>
                }
              />
              <Button variant="outlined" onClick={() => onViewProvider(idx)}>
                View
              </Button>
            </ListItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default ProvidersCard;

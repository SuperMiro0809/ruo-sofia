import { useContext, useState } from 'react';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import UserContext from '../../contexts/UserContext';
import userServices from '../../services/user';

let roles = {
  'Administrator': 'Администратор',
  'Qualifications': 'Квалификации',
  'Education': 'Образование',
  'Member': 'Потребител'
};

const Input = styled('input')({
  display: 'none',
});

const AccountProfile = (props) => {
  const userContext = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState();
  const [user] = userContext;

  const handleChange = (event) => {
    //setSelectedFile(event.target.files[0]);
    const body = new FormData();
    body.append('avatar', event.target.files[0]);
    console.log(selectedFile);
    event.target.value = "";
    userServices.avatar(body)
    .then(data => {
      console.log(data);
    })
  }

  const handleSubmit = () => {
    console.log(selectedFile);
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {roles[user.role]}
          </Typography>
          {/* <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <label htmlFor="contained-button-file" style={{ width: '100%' }}>
          <Input accept="image/*" id="contained-button-file" type="file" onChange={handleChange}/>
          <Button variant="text" fullWidth component="span">
            Качи снимка
          </Button>
        </label>
      </CardActions>
    </Card>
  );
}

export default AccountProfile;

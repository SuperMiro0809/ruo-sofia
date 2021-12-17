import './AccountProfile.scss';
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
  Typography,
  Badge
} from '@material-ui/core';
import {
  Close as CloseIcon
} from '@material-ui/icons'
import { styled } from '@material-ui/styles';
import UserContext from '../../contexts/UserContext';
import MessageContext from '../../contexts/MessageContext';
import userServices from '../../services/user';
import services from '../../services';

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
  const messageContext = useContext(MessageContext);
  const [selectedFile, setSelectedFile] = useState();
  const [user, setUser] = userContext;

  const handleChange = (event) => {
    //setSelectedFile(event.target.files[0]);
    const body = new FormData();
    body.append('avatar', event.target.files[0]);
    console.log(selectedFile);
    event.target.value = "";
    userServices.avatar(body)
      .then(data => {
        setUser(data.user);
        messageContext[1]({ status: 'success', text: 'Профилната снимка е променена успешно!' });
        const interval = setInterval(function () {
          messageContext[1]('');
          clearInterval(interval);
        }, 2000)
      })
  }

  const removeImage = () => {
    userServices.deleteAvatar()
      .then(data => {
        setUser(data.user);
        messageContext[1]({ status: 'success', text: 'Профилната снимка е премахната успешно!' });
        const interval = setInterval(function () {
          messageContext[1]('');
          clearInterval(interval);
        }, 2000)
      })
  }

  return (
    <Card {...props} className="AccountProfile">
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {user.avatar ?
            <Badge badgeContent={<CloseIcon sx={{ fontSize: '20px' }} onClick={removeImage} />} overlap="circular" color="error" className="avatar-badge">
              <Avatar
                src={`${services.assets}/avatars/${user.avatar}`}
                size={200}
                sx={{
                  height: 100,
                  width: 100
                }}
              />
            </Badge>
            :
            <Avatar
              size={200}
              sx={{
                height: 100,
                width: 100
              }}
            />
          }
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
          <Input accept="image/*" id="contained-button-file" type="file" onChange={handleChange} />
          <Button variant="text" fullWidth component="span">
            Качи снимка
          </Button>
        </label>
      </CardActions>
    </Card>
  );
}

export default AccountProfile;

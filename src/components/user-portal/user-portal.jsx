import {Stack} from'@mui/material'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { ProfileContainer } from './user-portal.style';
import { border } from '@mui/system';
import {FaGreaterThan} from'react-icons/fa'
import Button from '../Button/Button';
import { Signout } from '../../utils/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { ItemContainer,BackgroundChange } from './user-portal.style';
import { useSelector } from 'react-redux';
import { selectorCurrentUser } from '../store/user/user.selector';
import { useEffect, useState } from 'react';
import './user-portal.style.scss'
    export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign:"left",
    display: "flex",
    // alignItems:"flex-end",
    justifyContent:"space-between",
    color: theme.palette.text.secondary,
    fontSize:border
  }));


const UserPortal = ()=>{
    const [avatorImageUrl, setAvatorImageUrl] = useState("/")
    const {email} = useSelector(selectorCurrentUser)
    const navigate = useNavigate()
    const UserSignout = ()=>{
    Signout()
    navigate('/auth')

}
const EnterInfo = ()=>{
    navigate('user-info')
}
// const fileChangeHandler = (event)=>{
//     // setSelectedProfile(event.target.files[0])
//     setAvatorImageUrl(event.target.value)
//     // console.log(selectedProfile)
// }
    return(
        <ProfileContainer>
            <div>
            <Avatar alt={`${email}`} src={`${avatorImageUrl}`} />
            </div>
        <Box sx={{ width: '100%' }} marginBottom="20px">
        <Stack spacing={3}>
        <ItemContainer>
        <Item onClick={EnterInfo}>User Info
           <FaGreaterThan/> 
        </Item>
        </ItemContainer>
        <ItemContainer>
        <Item>Order History
        <FaGreaterThan/> 
        </Item>
        </ItemContainer>
        <ItemContainer>
        <Item>Shipping Address
        <FaGreaterThan/>
        </Item>
        </ItemContainer>
        </Stack>
        </Box>
        <Button buttonType="inverted" onClick={UserSignout}>Sign out</Button>
        </ProfileContainer>

    )
}


export default UserPortal;
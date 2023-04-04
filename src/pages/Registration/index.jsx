import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector  } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm({
      defaultValues: {
        fullName: 'vasya',
        email: 'vasya@mail.com',
        password: '1234',
      },
      mode: 'onChange',
  });


  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data);

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Не удалось зарегистрироваться');
    }
    console.log('ok')
  }


  if (isAuth) {
    return <Navigate to="/"/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full Name"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          { ...register('fullName', {required: 'Укажите ваше имя'})}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          { ...register('email', {required: 'Укажите почту'})}
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="Пароль" 
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          { ...register('password', {required: 'Укажите пароль'})}
          fullWidth 
        />
      </form>
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};

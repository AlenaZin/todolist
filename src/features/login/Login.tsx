import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormikHelpers, useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { loginTC } from './auth-reducer'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from '@mui/icons-material'

type FormValuesForm = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ isLoggedIn });
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return {
          email: 'Email is required'
        }          
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return { email: "Invalid email address" };
      }
      if (!values.password) {
        return {
          password: 'Password is required'
        } 
      }
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    onSubmit: async (values: FormValuesForm, formikHelpers: FormikHelpers<FormValuesForm>) => {
      const action = await dispatch(loginTC(values))
      if(loginTC.rejected.match(action)) {
        if(action.payload?.fieldsErrors?.length) {
          const error = action.payload?.fieldsErrors[0]
          formikHelpers.setFieldError(error.field, error.error)
        }
      }
    },
  });

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password ? <div>{formik.errors.password}</div> : null}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps("rememberMe")}
                  />
                }
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  );
}
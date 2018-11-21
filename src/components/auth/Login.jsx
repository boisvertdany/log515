import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";

class InnerLoginForm extends Component {
  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      classes
    } = this.props;

    return (
      <div className={classes.container}>
        <h3 style={{ textAlign: "center" }}>
          Connectez-vous avec votre adresse email ou votre nom d'utilisateur
        </h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            placeholder="Entrez votre email / nom d'utilisateur"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
            label="Email / nom d'utilisateur"
            className={classes.textField}
          />

          <TextField
            name="password"
            placeholder="Tapez votre mot de passe"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
            label="Mot de passe"
            className={classes.textField}
          />
          <br />
          <Button
            variant="raised"
            className={classes.button}
            type="button"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Réinitialiser
          </Button>
          <Button
            variant="raised"
            className={classes.button}
            type="submit"
            disabled={isSubmitting}
          >
            Connexion
          </Button>
        </form>
        <span>Vous n'avez pas de compte?</span>{" "}
        <Link to="/register" className={classes.links}>
          S'enregistrer
        </Link>
        <br />
      </div>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    username: "",
    password: ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Ce champ est obligatoire"),
    password: Yup.string()
      .min(6, "Le mot de passe doit comporter au moins 6 caractères")
      .required("Mot de passe obligatoire")
  }),
  handleSubmit: (
    { username, password },
    { props, setSubmitting, setErrors }
  ) => {
    props.loginAction({ username, password }).then(response => {
      if (response.non_field_errors) {
        setErrors({ password: response.non_field_errors[0] });
      } else {
        props.authenticateAction(
          response,
          props.dispatch,
          props.location.pathname,
          props.history.push
        );
      }
    });
    setSubmitting(false);
  },
  displayName: "LoginForm" //hlps with react devtools
})(InnerLoginForm);

export const Login = withStyles(styles)(EnhancedForm);

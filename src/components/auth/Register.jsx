import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";

class InnerRegistrationForm extends Component {
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
      <span className={classes.container}>
        <h3 style={{ textAlign: "center" }}>
          Inscription avec votre adresse email ci-dessous
        </h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            placeholder="Entrez votre nom d'utilisateur"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
            label="Nom d'utilisateur"
            className={classes.textField}
            required
          />
          <TextField
            name="email"
            placeholder="Entrer votre Email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
            label="Adresse Email"
            className={classes.textField}
            required
          />
          <TextField
            name="password1"
            placeholder="Entrer votre mot de passe"
            type="password"
            value={values.password1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password1 && touched.password1}
            helperText={
              errors.password1 && touched.password1 && errors.password1
            }
            className={classes.textField}
            label="Mot de passe"
            required
          />
          <TextField
            name="password2"
            placeholder="Confirmer votre mot de passe"
            type="password"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password2 && touched.password2}
            helperText={
              errors.password2 && touched.password2 && errors.password2
            }
            className={classes.textField}
            label="Confirmer votre mot de passe"
            required
          />

          <br />
          <Button
            className={classes.button}
            type="button"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
            variant="raised"
          >
            Réinitialiser
          </Button>
          <Button
            className={classes.button}
            type="submit"
            disabled={isSubmitting}
            variant="raised"
          >
            S'enregistrer
          </Button>
        </form>
        <span>Vous avez déjà un compte?</span>
        <Link to="/login" className={classes.links}>
          {" "}
          Connexion
        </Link>
      </span>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    username: "",
    email: "",
    password1: "",
    password2: ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Nom d'utilisateur obligatoire"),
    password1: Yup.string()
      .min(8, "Le mot de passe doit comporter au moins 8 caractères.")
      .required("Mot de passe obligatoire"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "Les mots de passe ne se correspondent pas.")
      .required("Confirmation mot de passe obligatoire"),
    email: Yup.string()
      .email("Adresse Email invalide")
      .required("Email obligatoire")
  }),
  handleSubmit: (
    { username, email, password1 },
    { props, setSubmitting, setErrors }
  ) => {
    props
      .registerAction({ username, email, password: password1 })
      .then(resp => {
        if (
          resp.non_field_errors ||
          Array.isArray(resp.username) ||
          Array.isArray(resp.email) ||
          Array.isArray(resp.password)
        ) {
          setErrors(resp);
        } else {
          props.dispatch(props.registrationSuccessMessage());
          return props.history.push("/");
        }
      });
    setSubmitting(false);
  },
  displayName: "RegistrationForm" //hlps with react devtools
})(InnerRegistrationForm);

export const Register = withStyles(styles)(EnhancedForm);

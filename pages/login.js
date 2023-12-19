import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import Layout from "../components/Layout";

import { AUTENTICAR_USUARIO } from "../config/gql";

// Context de Auth
import AuthContext from "../context/auth/AuthContext";

const Login = () => {
  // Routing
  const router = useRouter();

  // Utilizar Context Auth
  const authContext = useContext(AuthContext);
  const { isAuthenticated, login } = authContext;

  // States para mensajes del formulario
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Debe ingresar un email válido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("El password es obligatorio"),
    }),
    onSubmit: async (valores) => {
      const { email, password } = valores;

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        if (data.autenticarUsuario.token) {
          setMensaje("Ingresando...");

          setTimeout(() => {
            const { token } = data.autenticarUsuario;
            localStorage.setItem("token", token);
            setMensaje(null);
            login();
            router.push("/");
            // window.location.href = "/crm-next-apollo";
          }, 600);
        } else {
          console.error("Ha ocurrido un error");
        }
      } catch (error) {
        setMensaje(error.message.replace("GraphQL error:", ""));
        setError(true);
        setTimeout(() => {
          setMensaje(null);
          setError(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div
        className={
          "py-3 max-w-md mt-3 -mb-2 text-white rounded my-3 text-center mx-auto " +
          (error ? "bg-red-700" : "bg-green-700")
        }
      >
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl text-white font-light">Login</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-md px-4">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>

              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

              <div className="mt-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 cursor-pointer text-white uppercase hover:bg-gray-900"
                value="Iniciar Sesión"
              />

              {mensaje && mostrarMensaje()}
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;

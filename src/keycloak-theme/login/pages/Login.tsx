import styled from "@emotion/styled/macro";
import { ThemeProvider, createTheme } from "@mui/material";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { useState, type FormEventHandler } from "react";
import bgImage from "../assets/background_1.jpg";
import { LoginPanel } from "../components/LoginPanel";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
`;

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#36FFC0",
      dark: "#36FFC0",
      light: "#005243",
    },
    secondary: {
      main: "#005243",
      dark: "#005243",
      light: "#DCFFCC",
    },
    background: {
      // default: 'transparent',
    },
  },
});

const my_custom_param = new URL(window.location.href).searchParams.get(
  "my_custom_param"
);

if (my_custom_param !== null) {
  console.log("my_custom_param:", my_custom_param);
}

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, doUseDefaultCss, classes } = props;
  const { url, login } = kcContext;
  const { getClassName } = useGetClassName({ doUseDefaultCss, classes });
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    setIsLoginButtonDisabled(true);
    const formElement = e.target as HTMLFormElement;
    formElement.submit();
  });
  console.log("props", props);
  console.log("message", kcContext.message);
  console.log("kcInputClass", getClassName("kcInputClass"));

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LoginPanel
          url={url.loginAction}
          username={login.username ?? ""}
          onSubmit={onSubmit}
          disabled={isLoginButtonDisabled}
        ></LoginPanel>
      </Container>
    </ThemeProvider>
  );
  // return (
  //   <Template
  //     {...{ kcContext, i18n, doUseDefaultCss, classes }}
  //     displayInfo={
  //       realm.password && realm.registrationAllowed && !registrationDisabled
  //     }
  //     headerNode={<p>Entre</p>}
  //   >
  //     <h1>Teste</h1>
  //     <div
  //       id="kc-form"
  //       className={clsx(
  //         realm.password &&
  //           social.providers !== undefined &&
  //           getClassName("kcContentWrapperClass")
  //       )}
  //     >
  //       <div
  //         id="kc-form-wrapper"
  //         className={clsx(
  //           realm.password &&
  //             social.providers && [
  //               getClassName("kcFormSocialAccountContentClass"),
  //               getClassName("kcFormSocialAccountClass"),
  //             ]
  //         )}
  //       >
  //         {realm.password && (
  //           <form
  //             id="kc-form-login"
  //             onSubmit={onSubmit}
  //             action={url.loginAction}
  //             method="post"
  //           >
  //             <div className={getClassName("kcFormGroupClass")}>
  //               {!usernameHidden &&
  //                 (() => {
  //                   const label = !realm.loginWithEmailAllowed
  //                     ? "username"
  //                     : realm.registrationEmailAsUsername
  //                       ? "email"
  //                       : "usernameOrEmail";

  //                   const autoCompleteHelper: typeof label =
  //                     label === "usernameOrEmail" ? "username" : label;

  //                   return (
  //                     <>
  //                       <label
  //                         htmlFor={autoCompleteHelper}
  //                         className={getClassName("kcLabelClass")}
  //                       >
  //                         {msg(label)}
  //                       </label>
  //                       <input
  //                         tabIndex={1}
  //                         id={autoCompleteHelper}
  //                         className={getClassName("kcInputClass")}
  //                         //NOTE: This is used by Google Chrome auto fill so we use it to tell
  //                         //the browser how to pre fill the form but before submit we put it back
  //                         //to username because it is what keycloak expects.
  //                         name={autoCompleteHelper}
  //                         defaultValue={login.username ?? ""}
  //                         type="text"
  //                         autoFocus={true}
  //                         autoComplete="off"
  //                       />
  //                     </>
  //                   );
  //                 })()}
  //             </div>
  //             <div className={getClassName("kcFormGroupClass")}>
  //               <label
  //                 htmlFor="password"
  //                 className={getClassName("kcLabelClass")}
  //               >
  //                 {msg("password")}
  //               </label>
  //               <input
  //                 tabIndex={2}
  //                 id="password"
  //                 className={getClassName("kcInputClass")}
  //                 name="password"
  //                 type="password"
  //                 autoComplete="off"
  //               />
  //             </div>
  //             <div
  //               className={clsx(
  //                 getClassName("kcFormGroupClass"),
  //                 getClassName("kcFormSettingClass")
  //               )}
  //             >
  //               <div id="kc-form-options">
  //                 {realm.rememberMe && !usernameHidden && (
  //                   <div className="checkbox">
  //                     <label>
  //                       <input
  //                         tabIndex={3}
  //                         id="rememberMe"
  //                         name="rememberMe"
  //                         type="checkbox"
  //                         {...(login.rememberMe === "on"
  //                           ? {
  //                               checked: true,
  //                             }
  //                           : {})}
  //                       />
  //                       {msg("rememberMe")}
  //                     </label>
  //                   </div>
  //                 )}
  //               </div>
  //               <div className={getClassName("kcFormOptionsWrapperClass")}>
  //                 {realm.resetPasswordAllowed && (
  //                   <span>
  //                     <a tabIndex={5} href={url.loginResetCredentialsUrl}>
  //                       {msg("doForgotPassword")}
  //                     </a>
  //                   </span>
  //                 )}
  //               </div>
  //             </div>
  //             <div
  //               id="kc-form-buttons"
  //               className={getClassName("kcFormGroupClass")}
  //             >
  //               <input
  //                 type="hidden"
  //                 id="id-hidden-input"
  //                 name="credentialId"
  //                 {...(auth?.selectedCredential !== undefined
  //                   ? {
  //                       value: auth.selectedCredential,
  //                     }
  //                   : {})}
  //               />
  //               <input
  //                 tabIndex={4}
  //                 className={clsx(
  //                   getClassName("kcButtonClass"),
  //                   getClassName("kcButtonPrimaryClass"),
  //                   getClassName("kcButtonBlockClass"),
  //                   getClassName("kcButtonLargeClass")
  //                 )}
  //                 name="login"
  //                 id="kc-login"
  //                 type="submit"
  //                 value={msgStr("doLogIn")}
  //                 disabled={isLoginButtonDisabled}
  //               />
  //             </div>
  //           </form>
  //         )}
  //       </div>
  //       {realm.password && social.providers !== undefined && (
  //         <div
  //           id="kc-social-providers"
  //           className={clsx(
  //             getClassName("kcFormSocialAccountContentClass"),
  //             getClassName("kcFormSocialAccountClass")
  //           )}
  //         >
  //           <ul
  //             className={clsx(
  //               getClassName("kcFormSocialAccountListClass"),
  //               social.providers.length > 4 &&
  //                 getClassName("kcFormSocialAccountDoubleListClass")
  //             )}
  //           >
  //             {social.providers.map((p) => (
  //               <li
  //                 key={p.providerId}
  //                 className={getClassName("kcFormSocialAccountListLinkClass")}
  //               >
  //                 <a
  //                   href={p.loginUrl}
  //                   id={`zocial-${p.alias}`}
  //                   className={clsx("zocial", p.providerId)}
  //                 >
  //                   <span>{p.displayName}</span>
  //                 </a>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}
  //     </div>
  //   </Template>
  // );
}

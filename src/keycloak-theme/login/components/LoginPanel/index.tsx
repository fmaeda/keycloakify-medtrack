import {
  FilledInput,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { FormEventHandler, useState } from "react";
import logoSVG from "../../assets/white_horizontal.svg";
import InputMask from "../InputMask";
import { Container, FormContainer, Logo } from "./style";

type Props = {
  url: string;
  username: string;
  disabled: boolean;
  onSubmit: FormEventHandler;
};

export const LoginPanel: React.FC<Props> = ({
  url,
  username,
  disabled,
  onSubmit,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleClickShowPassword = () => setPasswordVisible((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container>
      <FormContainer action={url} method="post" onSubmit={onSubmit}>
        <Logo src={logoSVG} />
        <Grid container spacing={2} maxWidth={320}>
          <Grid item xs={12}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="username">CPF</InputLabel>
              <FilledInput
                inputComponent={InputMask as any}
                defaultValue={username}
                id="username"
                name="username"
                autoFocus
                autoComplete="off"
                fullWidth
              ></FilledInput>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <FilledInput
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <Icon>
                        {passwordVisible ? "visibility_off" : "visibility"}
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                }
              ></FilledInput>
            </FormControl>
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={disabled}
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
        <Typography
          marginTop={6}
          variant="overline"
          sx={{ color: "rgba(255, 255, 255, 0.75)" }}
        >
          © 2024 LibertyTI
        </Typography>
      </FormContainer>
      {/* <ImgContainer>
        <Carousel height="100%">
          <div>1</div>
          <Paper>2</Paper>
        </Carousel>
      </ImgContainer> */}
    </Container>
  );
};

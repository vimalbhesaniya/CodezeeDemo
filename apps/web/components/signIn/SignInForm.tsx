"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import {
  Alert,
  InputAdornment,
  InputLabel,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Button,
  LogoIcon,
  PasswordField,
  TextField,
} from "@repo/shared-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { LOGIN_ROUTES } from "../../constants/routes/authRoutes";
import { AuthUiCard } from "../auth/Layouts/AuthUiCard";
import { useLoginApi } from "./hooks/useLoginApi";
import { FormValuesSchema, FormValuesTypes } from "./type";

export const SignInForm = () => {
  const searchParams = useSearchParams();

  const callBackUrl = searchParams.get("callbackUrl");

  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const router = useRouter();

  const {
    palette: {
      app: { color },
    },
  } = useTheme();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValuesTypes>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(FormValuesSchema),
    mode: "all",
  });

  const { mutate } = useLoginApi({
    route: LOGIN_ROUTES.post,
    options: {
      onSuccess: () => {
        router.push("/");
        toast.success("Login Successfully");
      },
      onError: (err: any) => {
        toast.error(err?.message);
      },
    },
  });

  const onSubmit = (loginValue: FormValuesTypes) => {
    mutate(loginValue);
  };

  return (
    <AuthUiCard>
      <LogoIcon />

      <Stack gap="70px" width="100%">
        <Stack gap="25px" alignItems="center">
          <Typography variant="h4" fontWeight={600}>
            Login
          </Typography>

          <Stack direction="row" gap="5px">
            <Typography variant="body1" sx={{ color: color.iron[900] }}>
              Welcome Back! Please Sign In to access
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: color.butterflyBlue[900] }}
            >
              HRMS.
            </Typography>
          </Stack>
        </Stack>

        <Stack gap="18px">
          {error && <Alert severity="error">Incorrect credentials</Alert>}

          <Stack gap="24px">
            <TextField
              control={control}
              label="Email address"
              placeholder="Email address"
              name="email"
              required
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <PasswordField
              control={control}
              label="Password"
              name="password"
              placeholder="Password"
              required
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" gap="10px">
              <InputLabel sx={{ color: color.iron[800] }}>
                Remember me
              </InputLabel>
            </Stack>

            <Link href="/auth/forgot-password" underline="none">
              Forgot Password?
            </Link>
          </Stack>
        </Stack>
      </Stack>

      <Button
        onClick={() => {
          handleSubmit(onSubmit)();
        }}
        fullWidth
        loading={loading}
      >
        Sign In
      </Button>
    </AuthUiCard>
  );
};

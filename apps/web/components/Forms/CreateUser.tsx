import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Stack } from "@mui/material";
import { Button } from "@repo/shared-components";
import { FormEvent, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { SIGNUP_ROUTES } from '../../constants/routes/authRoutes';
import { FormType, Schema } from "../../types/form";
import { CurrentStepType, TriggerComponent } from '../../types/Step';
import { useCreateApi } from '../signIn/hooks/useCreateApi';
import Step1 from "./Steps/Step1";
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';

export default function CreateUser({ handleStepChange }: { handleStepChange: (data: string) => void }) {
  const {
    control,
    trigger,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(Schema),
    mode: "all",
    defaultValues: {
      firstname: "",
      lastname: "",
      confirmPassword: "",
      country: "",
      email: "",
      gender: "famale",
      password: "",
      pincode: '',
      state: "",
      street: "",
      username: "",
      hobbies: []
    },
  });

  const [currentStep, setCurrentStep] = useState<CurrentStepType>(1)

  const triggerSchema: TriggerComponent = {
    1: {
      title: "Step 1",
      field: ['firstname', 'lastname', 'gender'],
      component: <Step1 control={control} errors={errors} />
    },
    2: {
      title: "Step 2",
      field: ['email', 'password', 'username', 'confirmPassword'],
      component: <Step2 control={control} errors={errors} />
    },
    3: {
      title: "Step 3",
      field: ['street', 'country', 'state', 'pincode'],
      component: <Step3 control={control} errors={errors} />
    },
    4: {
      title: "Step 4",
      field: ['hobbies'],
      component: <Step4 control={control} errors={errors} />
    }
  }

  useEffect(() => {
    handleStepChange(triggerSchema[currentStep].title)
  }, [currentStep])

  const handlePrev = async () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1 as CurrentStepType)
    }
  }

  const { mutate } = useCreateApi({
    route: SIGNUP_ROUTES.post, options: {
      onSuccess: () => {
        toast.success("Registration successfully")
      },
      onError: (err) => {
        toast.error(err?.message)
      }
    }
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = await trigger(triggerSchema[currentStep].field)
    if (!isValid) {
      return false
    }

    if (currentStep < 4 && isValid) {
      setCurrentStep(prev => prev + 1 as CurrentStepType)
    } else {
      handleSubmit((data) => {
        mutate(data)
      })()
    }
  }

  return (
    <Stack>
      <form action="" onSubmit={onSubmit}>
        {triggerSchema[currentStep].component}
        <Stack direction={'row'} pt={3} justifyContent={'space-between'}>
          <Button startIcon={<ArrowBackIosIcon />} onClick={() => handlePrev()}>Prev</Button>
          <Button type='submit' endIcon={<ArrowForwardIosIcon />}>Next</Button>
        </Stack>
      </form>
    </Stack>
  );
} 

import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Stack } from "@mui/material";
import { Button } from "@repo/shared-components";
import { FormEvent, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FormType, Schema } from "../../types/form";
import { CurrentStepType, TriggerComponent } from '../../types/Step';
import Step1 from "./Steps/Step1";
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

export default function CreateUser({ handleStepChange }: { handleStepChange: (data: string) => void }) {
  const {
    control,
    watch,
    trigger,
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
      gender: "Female",
      password: "",
      pincode: '',
      state: "",
      street: "",
      username: ""
    },
  });

  const [currentStep, setCurrentStep] = useState<CurrentStepType>(1)

  const triggerSchema: TriggerComponent = {
    1: {
      title: "Step 1",
      field: ['firstname', 'lastname'],
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = await trigger(triggerSchema[currentStep].field)
    if (!isValid) {
      return false
    }

    if (currentStep < 3 && isValid) {
      setCurrentStep(prev => prev + 1 as CurrentStepType)
    }
    handleSubmit((data) => {
      console.log('call--data', data);
    })

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

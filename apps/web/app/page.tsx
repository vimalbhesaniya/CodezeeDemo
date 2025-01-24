'use client'
import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { ReactNode, useRef, useState } from "react";
import CreateUser from "../components/Forms/CreateUser";

export default function Page() {
  const stepRef = useRef<{ getTitle: () => ReactNode }>()
  const [title, setTitle] = useState('')

  const handleStepChange = (stepTitle: string) => {
    setTitle(stepTitle)
  }

  console.log('call--title', stepRef.current?.getTitle());

  return <>
    <Stack justifyContent={'left'} width={"100%"} >
      <Typography variant="h5">
        {title}
      </Typography>
      <Grid2 container mt={2} p={3}>
        <Grid2 xl={6}>
          <CreateUser handleStepChange={handleStepChange} />
        </Grid2>
      </Grid2>
    </Stack>
  </>;
}

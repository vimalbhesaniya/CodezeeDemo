import EditIcon from "@mui/icons-material/Edit";
import { Button, Dialog, Table } from "@repo/shared-components";
import { useState } from "react";
import { USER_LIST_ROUTE } from "../../constants/routes/userRoutes";
import type { DialogRenderer, DialogTypes } from "../../types/dialogs";
import CreateUser from "../Forms/CreateUser";
import { useGetUserData } from "../signIn/hooks/useGetUserData";

const UserList = () => {

    const { data } = useGetUserData({
        route: USER_LIST_ROUTE.get
    })

    const [dialogScreen, setDialogScreen] = useState<DialogTypes | null>(null)

    const [dialogTitle, setDialogTitle] = useState<string>("")

    const [userId, setUserId] = useState<string>("")

    const handleStepChange = (title: string) => {
        setDialogTitle(title)
    }

    const renderDialog: DialogRenderer = {
        edit: <CreateUser handleStepChange={handleStepChange} userId={userId} />
    }

    const cells = data?.length ? data.map((data: unknown) => Object.keys(data))[0] : []

    const handleEditButton = (userId: string) => {
        setUserId(userId)
        setDialogScreen("edit")
    }

    const renderActions: any = (row: unknown) => {
        return (
            <Button startIcon={<EditIcon />} onClick={() => handleEditButton(row.id)} >Edit</Button>
        );
    };

    return (
        <div>
            <Table
                cells={cells}
                rows={data}
                Actions={renderActions}
            />

            <Dialog
                open={!!dialogScreen}
                title={dialogTitle}
                onClose={() => setDialogScreen(null)}
            >{renderDialog[dialogScreen as DialogTypes]}</Dialog>
        </div>
    )
}

export default UserList

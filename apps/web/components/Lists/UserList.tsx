import EditIcon from '@mui/icons-material/Edit';
import { Button, Table } from "@repo/shared-components";
import { USER_LIST_ROUTE } from "../../constants/routes/userRoutes";
import { useGetUserData } from "../signIn/hooks/useGetUserData";

const UserList = () => {

    const { data, isPending } = useGetUserData({
        route: USER_LIST_ROUTE.get
    })

    const cells = data?.length ? data.map((data: any) => Object.keys(data))[0] : []
    const renderActions: any = (row: any) => {
        return (
            <>
                <Button startIcon={<EditIcon />} onClick={()=>console.log('call--row',row)}>Edit</Button>
            </>
        );
    };
    return (
        <div>
            <Table
                cells={cells}
                rows={data}
                Actions={renderActions}

            />
        </div>
    )
}

export default UserList

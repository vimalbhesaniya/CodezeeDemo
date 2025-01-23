import {
  SvgsHome,
  SvgsOrganization,
  type DrawerProps,
} from "@repo/shared-components";
import { useRouter } from "next/navigation";

export const useDrawerMenuItems = () => {
  const router = useRouter();

  const menuItems: DrawerProps["menuItems"] = [
    {
      key: "home",
      title: "Home",
      icon: <SvgsHome />,
      onClick: (href) => router.push(href),
    },
    {
      key: "employee-management",
      title: "Employee Management",
      icon: <SvgsOrganization />,
      menuItems: [
        {
          key: "employee",
          title: "Employee",
          onClick: (href) => router.push(href),
        },
      ],
    },
  ];

  return { menuItems };
};

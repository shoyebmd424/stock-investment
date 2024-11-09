import { lazy } from "react";

/* eslint-disable react-refresh/only-export-components */
const  Terms = lazy(()=>import( "../components/auth/agreement/terms"));
const  Deals = lazy(()=>import( "../pages/admin/deals"));
const  AdminLayout = lazy(()=>import( "../pages/admin/adminLayout"));
const  Dashboard = lazy(()=>import( "../pages/admin/dashboard"));
const  CreateMamber = lazy(()=>import( "../pages/admin/members/createMamber"));
const  Companies = lazy(()=>import( "../pages/admin/companies"));
const  NewCompany = lazy(()=>import( "../pages/admin/companies/newCompany"));
const  CustomerLayout = lazy(()=>import( "../pages/customer/customerLayout"));
const  Portfolio = lazy(()=>import( "../pages/customer/portfolio"));
const  AboutDeal = lazy(()=>import( "../pages/customer/portfolio/aboutDeal"));
const  Login = lazy(()=>import( "../common/login"));
const  Register = lazy(()=>import( "../common/register"));
const  Profile = lazy(()=>import( "../common/profile"));

export const routes = [
  { path: "/login",
    element: <Login role="admin" />,
    needsAuth: false,
  },
  { path: "/terms",
    element: <Terms  />,
    needsAuth: false,
  },
  { path: "/",
    element: <Register role="admin" />,
    needsAuth: false,
  },
  {
    path: "/admin",
    element: <AdminLayout role="admin" />,
    needsAuth: true,
    children:[
      {
        path: "",
        element: <Dashboard role="admin" />,
        needsAuth: true,
      },
      {
        path: "member",
        element: <Dashboard role="admin" />,
        needsAuth: true,
      },
      {
        path: "deals",
        element: <Deals role="admin" />,
        needsAuth: true,
      },
      {
        path: "member/personal-add",
        element: <CreateMamber role="admin" />,
        needsAuth: true,
      },
      {
        path: "member/personal-details",
        element: <CreateMamber role="admin" />,
        needsAuth: true,
      },
      {
        path: "companies",
        element: <Companies role="admin" />,
        needsAuth: true,
      },
      {
        path: "companies/new-company",
        element: <NewCompany role="admin" />,
        needsAuth: true,
      },
      {
        path:"member/personal-details/about",
        element:<AboutDeal/>,
        needsAuth:true,
       },
      {
        path:"profile",
        element:<Profile/>,
        needsAuth:true,
       }
    ]
  },
  {
    path:"/customer",
    element:<CustomerLayout/>,
    needsAuth:true,
    children:[
     {
      path:"",
      element:<Portfolio/>,
      needsAuth:true,
     },
     {
      path:"overview",
      element:<Portfolio/>,
      needsAuth:true,
     },
     {
      path:"overview/about",
      element:<AboutDeal/>,
      needsAuth:true,
     },
     {
      path:"profile",
      element:<Profile/>,
      needsAuth:true,
     }
    ]
  }
];

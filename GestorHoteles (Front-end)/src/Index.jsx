import React, { createContext } from 'react'
import { useContext, useState, useEffect } from 'react'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { UserProfilePage } from './pages/UserProfilePage'
import { RecordPage } from './pages/RecordPage'
import { ViewUsersPage } from './pages/ViewUsersPage'
import { MainPage } from './pages/MainPage'
import { AddHotelPage } from './pages/AddHotelPage'
import { ViewReservation } from "./pages/ViewReservation";
import { ViewTypeRoom } from './pages/ViewTypeRoom'
import { ViewTypeEvents } from './pages/ViewTypeEvents'
import { ViewEvent } from './pages/ViewEvent'
import { UpdateTypeRoom } from './components/Update/UpdateTypeRoom'
import { UpdateTypeEvent } from './components/Update/UpdateTypeEvent'
import { UpdateEvent } from './components/Update/UpdateEvent'
import { UpdateReservation } from './components/Update/UpdateReservation'
import { ViewHotels } from './pages/ViewHotels'
import { ViewRooms } from './pages/ViewRooms'
import { UpdateHotel } from './components/Update/UpdateHotel'
import { UpdateRoom } from './components/Update/UpdateRoom'
import { AddBill } from './components/Bill/AddBill'
import { ViewAdminHotel } from './pages/ViewAdminHotel'
import { UpdateAdminHotel } from './components/Update/UpdateAdminHotel'
import { ViewServices } from './pages/ViewServices'
import { ViewConsumption } from './pages/ViewConsumption'
import { UpdateServices } from './components/Update/UpdateServices'
import { UpdateConsumption } from './components/Update/UpdateConsumption'
import { Redirigir } from './pages/Redirigir copy'
import { StatisticsPage } from './pages/StatisticsPage'
import { UpdateUserInfo } from './components/Update/UpdateUserInfo'
import { ViewReservationCompleted } from './pages/ViewReservationCompleted'
import { ViewBill } from './pages/ViewBillPage'

export const AuthContext = createContext();

export const Index = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    const [dataUser, setDataUser] = useState({
        id: '',
        name: '',
        surname: '',
        role: ''
    })

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) setLoggedIn(true)
    }, [])

    const handleLogout = () => {
        setLoggedIn(false);
        setDataUser({
            id: '',
            name: '',
            surname: '',
            role: ''
        });
    };

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App></App>,
            errorElement: <NotFoundPage></NotFoundPage>,
            children: [
                {
                    path: '/',
                    element: <MainPage />
                },
                {
                    path: '/login',
                    element: <LoginPage></LoginPage>
                },
                {
                    path: '/register',
                    element: <RegisterPage></RegisterPage>
                },
                {
                    path: '/home',
                    element: <HomePage></HomePage>
                },
                {
                    path: '/profile',
                    element: loggedIn ? <Redirigir /> : <LoginPage></LoginPage>,
                    children: [
                        {
                            path: '',
                            element: <UserProfilePage></UserProfilePage>
                        },
                        {
                            path: 'optionAdmin',
                            element: <AddHotelPage></AddHotelPage>
                        },
                        {
                            path: 'record',
                            element: <RecordPage />
                        },
                        {
                            path: 'users',
                            element: <ViewUsersPage />
                        },
                        {
                            path: 'reservation',
                            element: <ViewReservation />
                        },
                        {
                            path: 'reservationCompleted',
                            element: <ViewReservationCompleted></ViewReservationCompleted>
                        },
                        {
                            path: 'viewTypeRoom',
                            element: <ViewTypeRoom></ViewTypeRoom>
                        },
                        {
                            path: 'viewEventType',
                            element: <ViewTypeEvents></ViewTypeEvents>
                        },
                        {
                            path: 'viewEvent',
                            element: <ViewEvent></ViewEvent>
                        },
                        {
                            path: 'updateTypeRoom/:id',
                            element: <UpdateTypeRoom></UpdateTypeRoom>
                        },
                        {
                            path: 'updateTypeEvent/:id',
                            element: <UpdateTypeEvent></UpdateTypeEvent>
                        },
                        {
                            path: 'updateEvent/:id',
                            element: <UpdateEvent></UpdateEvent>
                        },
                        {
                            path: 'addBill/:id',
                            element: <AddBill></AddBill>
                        },
                        {
                            path: 'updateReservation/:id',
                            element: <UpdateReservation />
                        },
                        {
                            path: 'viewHotels',
                            element: <ViewHotels />
                        },
                        {
                            path: 'viewRooms',
                            element: <ViewRooms />
                        },
                        {
                            path: 'updateHotel/:id',
                            element: <UpdateHotel />
                        },
                        {
                            path: 'updateRoom/:id',
                            element: <UpdateRoom />
                        },
                        {
                            path: 'viewAdminHotel',
                            element: <ViewAdminHotel></ViewAdminHotel>
                        },
                        {
                            path: 'updateAD/:id',
                            element: <UpdateAdminHotel></UpdateAdminHotel>
                        },
                        {
                            path: 'viewServices',
                            element: <ViewServices />
                        },
                        {
                            path: 'updateService/:id',
                            element: <UpdateServices />
                        },
                        {
                            path: 'viewConsumption',
                            element: <ViewConsumption />
                        },
                        {
                            path: 'updateConsumption/:id',
                            element: <UpdateConsumption />
                        },
                        {
                            path: 'graph',
                            element: <StatisticsPage></StatisticsPage>
                        },
                        {
                            path: 'updateUserAccount/:id',
                            element: <UpdateUserInfo></UpdateUserInfo>
                        },
                        {
                            path: 'viewBill',
                            element: <ViewBill></ViewBill>
                        }
                    ]
                },
            ]
        },
    ])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser, handleLogout }} >
            <RouterProvider router={routes} />
        </AuthContext.Provider >
    )
}
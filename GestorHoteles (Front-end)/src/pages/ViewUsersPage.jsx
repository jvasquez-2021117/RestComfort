import React, { useEffect, useState } from 'react'
import { TableUsers } from '../components/Tables/TableUsers'
import axios from 'axios'

export const ViewUsersPage = () => {
    const [tableUsers, setTableUsers] = useState([{}])
    const [user, setUser] = useState([{}])
    const [search, setSearch] = useState("")

    const getTableUsers = async () => {
        try {
            const { data } = await axios('http://localhost:3200/user/get')
            setTableUsers(data.users)
            setUser(data.users)
        } catch (e) {
            console.log(e);
        }
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar = (searchTerm) => {
        var resultSearch = tableUsers.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(searchTerm.toLowerCase())) return elemento
        })
        setUser(resultSearch)
    }

    useEffect(() => getTableUsers, [])

    return (
        <>
            <br />
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#9dc19d" }}>
                <div className="container-fluid ">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Table User</h1>
                    </div>
                </div>
            </nav>
            <div className="container t">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-2 col-lg-8">
                        <input type="search" id="form1" className="form-control" value={search} onChange={handleChangeSearch} />
                        <label className="form-label" htmlFor="form1" />
                    </div>
                    <div className="col-md-6 col-lg-2">
                        <button type="button" className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div >
            <section className="intro">
                <div className="bg-image h-100" style={{ backgroundColor: '#f5f7fa' }}> {/* background: #f5f7fa; */}
                    <div className="mask d-flex align-items-center h-100">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '700px' }}>
                                                <table className="table table-striped ">
                                                    <thead style={{ backgroundColor: '#8c7c62' }}>
                                                        <tr>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Surname</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Role</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            user.map(({ _id, name, surname, email, role }, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <TableUsers
                                                                            name={name}
                                                                            surname={surname}
                                                                            email={email}
                                                                            role={role}
                                                                        ></TableUsers>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
        </>
    )
}

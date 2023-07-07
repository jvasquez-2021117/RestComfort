import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Hotels } from '../Hotels/Hotels'

export const OptionHotels = ({ nameFilter, addressFilter, qualificationFilter }) => {

    const [hotels, setHotels] = useState([{}])

    const getHotels = async () => {
        try {
            const { data } = await axios('http://localhost:3200/hotel/getHotel')
            setHotels(data.hotel)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => getHotels, []);

    const filteredHotels = hotels.filter((hotel) => {
        if (nameFilter && !hotel.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
            addressFilter && !hotel.address.toLowerCase().includes(addressFilter.toLowerCase()) ||
            qualificationFilter && !hotel.qualification.toLowerCase().includes(qualificationFilter.toLowerCase())) {
            return false;
        }
        return true;
    });

    return (
        <>
            {
                filteredHotels.map(({ _id, name, description, address, qualification}, index) => {
                    return (
                        <div key={index}>
                            <Hotels
                                _id={_id}
                                name={name}
                                description={description}
                                address={address}
                                qualification={qualification}
                            ></Hotels>                            
                        </div>
                    )
                })
            }
        </>
    )
}

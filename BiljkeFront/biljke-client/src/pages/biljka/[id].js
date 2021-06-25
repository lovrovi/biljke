import React from 'react'
import { useRouter } from "next/router";
import BiljkaDetails from '../../components/Biljke/BiljkaDetails';

export default function biljka(props) {
    const router = useRouter();

    return (
        <div>
           <BiljkaDetails  router={router} />
        </div>
    )
}

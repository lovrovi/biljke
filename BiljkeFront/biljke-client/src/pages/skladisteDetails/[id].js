import React from 'react'
import { useRouter } from "next/router";
import SkladisteDetails from '../../components/Skladište/SkladisteDetails';

export default function biljka(props) {
    const router = useRouter();

    return (
        <div>
           <SkladisteDetails  props={router} />
        </div>
    )
}

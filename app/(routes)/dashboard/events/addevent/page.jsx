"use client"
import React, { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import GoBack from '@/components/GoBack';
import AddEvent from '@/components/AddEvent';
export default function Page({ params }) {


    
    return (
        <div>
            <GoBack title="Add Event" />
            <AddEvent/>
        </div>
    );
}

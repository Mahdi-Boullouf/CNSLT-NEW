"use client"
import React, { useEffect, useState } from 'react';
import { useGetAllArea } from '@/hooks/useFetchArea';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import GoBack from '@/components/GoBack';
import EditArea from '@/components/EditArea';
export default function Page({ params }) {
    const areaId = params.id;
    const { data: allAreas, error, isLoading, getAllArea } = useGetAllArea();
    const [Erea, setErea] = useState(null);

    useEffect(() => {
        getAllArea();
    }, []);

    useEffect(() => {
        if (allAreas) {
            const area = allAreas.find(area => area._id === areaId);
            if (area) {
                setErea(area);
            }
        }
    }, [allAreas, areaId]);

    if (isLoading) return <Loading />;
    if (error) return <Error />;

    return (
        <div>
            <GoBack title="Edit Area" />
           < EditArea area={Erea} />
        </div>
    );
}

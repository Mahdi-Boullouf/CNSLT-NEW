import React, { useCallback, useEffect } from 'react';
import { CheckboxGroup } from '@/components/CheckboxGroup';
import { useGetAllActivities } from "@/hooks/useFetchRoom";
import Loading from './ui/Loading';

const ActivitiesCheckboxList = ({ className, setActivities, activities }) => {
  const { data: allActivities, isLoading, getAllActivities } = useGetAllActivities();

  useEffect(() => {
    getAllActivities();
  }, []);

  useEffect(() => {
    if (allActivities && activities.length === 0) {
      setActivities([]);
    }
  }, [activities]);

  const handleCheckedChange = useCallback((id) => {
    setActivities(prev => {
      const isAlreadySelected = prev.some(activity => activity._id === id);
      if (isAlreadySelected) {
        return prev.filter(activity => activity._id !== id);
      } else {
        const activityToAdd = allActivities.find(activity => activity._id === id);
        return [...prev, activityToAdd];
      }
    });
  }, [setActivities, allActivities]);

  if (isLoading) return <Loading />;

  const items = allActivities?.map(activity => ({
    id: activity._id,
    label: activity.name,
    checked: activities.some(a => a._id === activity._id)
  })) || [];

  return (
    <div className={`px-12 my-8 ${className}`}>
      <CheckboxGroup
        className="space-y-2 grid grid-cols-4 grid-rows-2 sm:grid-rows-4 sm:grid-cols-4"
        items={items}
        onCheckedChange={handleCheckedChange}
      />
    </div>
  );
}

export default ActivitiesCheckboxList;
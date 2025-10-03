import React from 'react'
import { SavingDetail } from './SavingDetail';
import { useSgahAhorroStore } from '../../hooks';

export const SavingList = () => {

	const { savings } = useSgahAhorroStore();

  return (
	<div className='mt-10 detail-list-wrapper max-w-9/12 m-auto'>
		{
			savings.map( saving => (
				<SavingDetail key={saving.id} saving={saving} />
			))
		}
	</div>
  )
}

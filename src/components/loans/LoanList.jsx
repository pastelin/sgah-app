import React from 'react'
import { useSgahPrestamoStore } from '../../hooks';
import { LoanDetail } from './LoanDetail';

export const LoanList = () => {

	const {loans} = useSgahPrestamoStore();
  return (
	<div className='mt-10 detail-list-wrapper max-w-9/12 m-auto'>
			{
				loans.map( loan => (
					<LoanDetail key={loan.id} loan={loan} />
				))
			}
		</div>
  )
}

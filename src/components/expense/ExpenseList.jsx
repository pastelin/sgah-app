import { useSgahGastoStore } from "../../hooks";
import { ExpenseDetail } from "./ExpenseDetail";

export const ExpenseList = () => {

	const { expenses } = useSgahGastoStore();

  return (
	<div className="mt-10 detail-list-wrapper">
		{
			expenses.map( expense => (
				<ExpenseDetail key={expense.id} expense={expense} />
			) )
		}

	</div>
  )
}

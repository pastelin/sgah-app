import { useCallback, useEffect, useState } from 'react';
import {
    getCurrentYearByString,
    useGastoUi,
    useSgahGastoStore,
    useSgahUi,
} from '../hooks';
import {
    ProgressGastoContainer,
    WithoutInfoAlert,
    LoaderComponent,
} from '../components';

export const SgahGastoHistoricoPage = () => {
    const {
        startLoadingAnnualBalanceHistory,
        startLoadingRecurringExpenses,
        annualBalanceHistory,
        recurringExpenses,
    } = useSgahGastoStore();
    const [year, setYear] = useState(getCurrentYearByString());
    const { handleShowFlipCard } = useGastoUi();
    const {isShowLoader} = useSgahUi();

    useEffect(() => {
        startLoadingAnnualBalanceHistory(year);
    }, [year]);

    useEffect(() => {
        if (recurringExpenses.length === 0) {
            startLoadingRecurringExpenses();
        }
    }, []);

    // Utilicé useCallback para memoizar onChangeYear y evitar recreaciones innecesarias de esta función en cada renderizado.
    const onChangeYear = useCallback(
        ({ target }) => {
            console.log('onChangeYear');
            setYear(target.value);
            handleShowFlipCard(false);
        },
        [handleShowFlipCard]
    );

    return (
        <aside className="contenedor-aside">
            <h3 className="text-center">Histórico del año {year}</h3>
            <div className="text-center mb-1">
                <select className="select" onChange={onChangeYear}>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
            </div>
            {annualBalanceHistory.length > 0 ? (
                <ProgressGastoContainer
                annualBalanceHistory={annualBalanceHistory}
                    year={year}
                />
            ) : (
                <WithoutInfoAlert />
            )}

            {isShowLoader && <LoaderComponent />}
        </aside>
    );
};
 
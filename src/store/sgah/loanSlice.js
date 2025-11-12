import { createSlice } from '@reduxjs/toolkit';

export const loanSlice = createSlice({
    name: 'loans',
    initialState: {
        loan: {},
        loans: [],
        totalLoanDebt: 0,
    },
    reducers: {
        setActiveLoans: (state, action) => {
            state.loans = action.payload;
        },
        setTotalLoanDebt: (state, action) => {
            state.totalLoanDebt = action.payload;
        },
        setLoan: (state, action) => {
            state.loan = action.payload;
        },
        addNewLoan: (state, { payload }) => {
            state.loans.push(payload);
        },
        increaseTotalLoanDebt: (state, { payload }) => {
            state.totalLoanDebt += Number(payload);
        },
        decreaseTotalLoanDebt: (state, { payload }) => {
            state.totalLoanDebt -= Number(payload);
        },
        updateLoan: (state, { payload }) => {
            state.loans = state.loans.map((data) => {
                if (data.folio === payload.folio) {
                    return payload;
                }

                return data;
            });
        },
        deleteLoan: (state, { payload }) => {
            state.loans = state.loans.filter(
                (loan) => loan.folio !== payload
            );
        },
    },
});

export const {
    setActiveLoans,
    setTotalLoanDebt,
    setLoan,
    increaseTotalLoanDebt,
    addNewLoan,
    decreaseTotalLoanDebt,
    updateLoan,
    deleteLoan,
} = loanSlice.actions;

import {
    useSgahInversionStore,
    useForm,
    useToastMessage,
    useInversionUi,
} from '../../hooks';
import { BalanceDetail } from '../BalanceDetail';

const formDada = {
    monto: 0,
};

export const FormUpdateInversion = () => {
    const { handleShowUpdateFormInversion, styleForUpdateForm } =
        useInversionUi();
    const { inversion, startUpdatingInversion } = useSgahInversionStore();

    const { monto, onInputChange, onResetForm } = useForm(formDada);

    const onSubmit = async (event) => {
        event.preventDefault();

        const { code, message } = await startUpdatingInversion({
            ...inversion,
            monto,
        });

        useToastMessage(code, message);

        if (code === 200 || code === 201) {
            handleShowUpdateFormInversion(false);
            onResetForm();
        }
    };

    return (
        <section
            className={`overlay flex-responsive-row center-x-y ${styleForUpdateForm}`}
        >
            <div className="contenedor-form">
                <div className="text-end p-1" id="closeMenu">
                    <button
                        className="icon-close fz-2"
                        onClick={() => handleShowUpdateFormInversion(false)}
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </div>
                <h3>Retirar Inversión!</h3>
                <div className="contenedor-saldo text-center">
                    <BalanceDetail
                        label="Saldo máximo a retirar"
                        balance={inversion.monto}
                    />
                </div>

                <form className="mt-2" onSubmit={onSubmit}>
                    <div className="form__group">
                        <label htmlFor="monto">Monto:</label>
                        <input
                            type="number"
                            name="monto"
                            id="monto"
                            value={monto}
                            onChange={onInputChange}
                            required
                        />
                    </div>

                    <div className="text-center my-2">
                        <button className="btn btn-submit" type="submit">
                            Actualizar Inversión
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

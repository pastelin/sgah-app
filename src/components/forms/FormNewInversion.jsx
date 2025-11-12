import { useEffect } from 'react';
import Swal from 'sweetalert2';
import {
    useToastMessage,
    useForm,
    useInversionUi,
    useSgahInversionStore,
} from '../../hooks';
import { BalanceDetail } from '../BalanceDetail';

const formData = {
    monto: '',
    descripcion: '',
    cdAppInversion: '',
};

export const FormNewInversion = () => {
    const { handleShowNewFormInversion, styleForNewForm } =
        useInversionUi();

    const {
        availableBalance,
        startLoadingAvailableBalance,
        startLoadingProductosFinancieros,
        productosFinancieros,
        startSavingInversion,
        getProductoFinancieroById,
    } = useSgahInversionStore();

    useEffect(() => {
        if (availableBalance) return;
        startLoadingAvailableBalance();
    }, []);

    useEffect(() => {
        startLoadingProductosFinancieros();
    }, []);

    const { monto, descripcion, cdAppInversion, onInputChange, onResetForm } =
        useForm(formData);

    const onSubmit = async (event) => {
        event.preventDefault();

        if (monto > availableBalance) {
            Swal.fire('Validar monto ingresado', '', 'error');
            return;
        }

        let {nbApp} = getProductoFinancieroById(cdAppInversion);
        const { code, message } = await startSavingInversion({
            monto,
            descripcion,
            productoFinanciero: {
                cdApp: cdAppInversion,
                nbApp,
            },
        });

        useToastMessage(code, message);

        if (code === 200 || code === 201) {
            handleShowNewFormInversion(false);
            onResetForm();
        }
    };

    return (
        <section
            className={`overlay flex-responsive-row center-x-y ${styleForNewForm}`}
        >
            <div className="contenedor-form">
                <div className="text-end p-1" id="closeMenu">
                    <button
                        className="icon-close fz-2"
                        onClick={() => handleShowNewFormInversion(false)}
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </div>
                <h3>¡Registrar Inversión!</h3>

                <div className="contenedor-saldo flex-responsive-row justify-center">
                    <BalanceDetail
                        label="Saldo máximo a invertir"
                        balance={availableBalance}
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

                    <div className="form__group">
                        <select
                            name="cdAppInversion"
                            value={cdAppInversion}
                            onChange={onInputChange}
                        >
                            <option value="">
                                Seleccionar grupo financiero
                            </option>
                            {productosFinancieros.map((productoFinanciero) => (
                                <option
                                    key={
                                        window.crypto.getRandomValues(
                                            new Uint32Array(1)
                                        )[0]
                                    }
                                    value={productoFinanciero.cdApp}
                                >
                                    {productoFinanciero.nbApp}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form__group">
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea
                            name="descripcion"
                            id="descripcion"
                            value={descripcion}
                            onChange={onInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="text-center my-2">
                        <button className="btn btn-submit" type="submit">
                            Guardar Inversión
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

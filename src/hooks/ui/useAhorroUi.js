import { useDispatch, useSelector } from 'react-redux';
import { onToggleHasPermissionEditA } from '../../store/ui/ahorroUiSlice';

export const useAhorroUi = () => {
    const { hasPermissionEdit } = useSelector((state) => state.ahorroUi);

    const dispatch = useDispatch();

    const handleHasPermissionEdit = (flag) => {
        dispatch(onToggleHasPermissionEditA(flag));
    };

    return {
        // * Propiedades
        hasPermissionEdit,
        // * Metodos
        handleHasPermissionEdit,
    };
};

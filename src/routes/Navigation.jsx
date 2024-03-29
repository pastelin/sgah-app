import {
    BrowserRouter,
    NavLink,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { useSgahUi } from '../hooks';
import {
    SgahGastosPage,
    SgahIngresosPage,
    SgahInversionPage,
    SgahPrestamosPage,
    SgahResumenPage,
} from '../sgah/pages';
import { SgahAhorrosPage } from '../sgah/pages/SgahAhorrosPage';

export const Navigation = () => {
    const {
        styleHightNavbar,
        styleHideMobileNavbar,
        styleShowMenuNavbar,
        classNameActiveIconCloseMenuNavbar,
        handleShowNavbar,
    } = useSgahUi();

    return (
        <BrowserRouter>
            <nav className={`navbar ${styleHightNavbar}`}>
                <div
                    className={`menu-mobile ${styleHideMobileNavbar}`}
                    onClick={() => handleShowNavbar(true)}
                >
                    <h1 className="logo">SGAH</h1>
                    <label className="icon-burguer"></label>
                </div>

                <div className={`menu ${styleShowMenuNavbar}`}>
                    <h1 className="logo">SGAH</h1>
                    <h2 className="usuario">
                        <i className="fa-regular fa-user"></i>
                        &nbsp; Juan Pastelin
                    </h2>

                    <ul>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link anim-link ${
                                        isActive ? 'link--active' : ''
                                    }`
                                }
                                to="/detalle"
                                onClick={() => handleShowNavbar(false)}
                            >
                                Detalle
                                <i className="fa-solid fa-angles-right"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link anim-link ${
                                        isActive ? 'link--active' : ''
                                    }`
                                }
                                to="/ingresos"
                                onClick={() => handleShowNavbar(false)}
                            >
                                Ingresos
                                <i className="fa-solid fa-angles-right"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link anim-link ${
                                        isActive ? 'link--active' : ''
                                    }`
                                }
                                to="/ahorro"
                                onClick={() => handleShowNavbar(false)}
                            >
                                Ahorro
                                <i className="fa-solid fa-angles-right"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link anim-link ${
                                        isActive ? 'link--active' : ''
                                    }`
                                }
                                to="/gastos"
                                onClick={() => handleShowNavbar(false)}
                            >
                                Gastos
                                <i className="fa-solid fa-angles-right"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link anim-link ${
                                        isActive ? 'link--active' : ''
                                    }`
                                }
                                to="/prestamos"
                                onClick={() => handleShowNavbar(false)}
                            >
                                Prestamos
                                <i className="fa-solid fa-angles-right"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link anim-link ${
                                        isActive ? 'link--active' : ''
                                    }`
                                }
                                to="/inversion"
                                onClick={() => handleShowNavbar(false)}
                            >
                                Inversión
                                <i className="fa-solid fa-angles-right"></i>
                            </NavLink>
                        </li>
                    </ul>

                    <button className="btn btn-logout anim-bg-gradient">
                        <i className="fa-solid fa-right-from-bracket"></i>
                        &nbsp;
                        <span>Salir</span>
                    </button>
                </div>

                <div
                    className={`contenedor-icon-close ${classNameActiveIconCloseMenuNavbar}`}
                >
                    <button
                        className="icon-close fz-3"
                        onClick={() => handleShowNavbar(false)}
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </div>
            </nav>
            <Routes>
                <Route path="/detalle" element={<SgahResumenPage />} />
                <Route path="/ingresos" element={<SgahIngresosPage />} />
                <Route path="/ahorro" element={<SgahAhorrosPage />} />
                <Route path="/gastos" element={<SgahGastosPage />} />
                <Route path="/prestamos" element={<SgahPrestamosPage />} />
                <Route path="/inversion" element={<SgahInversionPage />} />

                <Route path="/*" element={<Navigate to="/detalle" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

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
import { useState } from 'react';

export const Navigation = () => {
    const [isOpenIcon, setIsOpenIcon] = useState(false);

    const { styleHightNavbar, styleShowMenuNavbar, handleShowNavbar } =
        useSgahUi();

    const handleOpenIcon = () => {
        setIsOpenIcon(!isOpenIcon);
        handleShowNavbar();
    };

    return (
        <BrowserRouter>
            <nav className={`navbar ${styleHightNavbar}`}>
                <div className={`menu-mobile`}>
                    <h1 className="logo">SGAH</h1>
                    <div
                        className={`icon nav-icon-1 ${
                            isOpenIcon ? 'open' : ''
                        }`}
                        onClick={handleOpenIcon}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className={`menu ${styleShowMenuNavbar}`}>
                    {/* <h1 className="logo">SGAH</h1> */}
                    <h3 className="usuario">
                        <i className="fa-regular fa-user"></i>
                        &nbsp; Juan Pastelin
                    </h3>

                    <ul>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link anim-link ${
                                        isActive ? 'link--active' : ''
                                    }`
                                }
                                to="/detalle"
                                onClick={handleOpenIcon}
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
                                onClick={handleOpenIcon}
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
                                onClick={handleOpenIcon}
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
                                onClick={handleOpenIcon}
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
                                onClick={handleOpenIcon}
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
                                onClick={handleOpenIcon}
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

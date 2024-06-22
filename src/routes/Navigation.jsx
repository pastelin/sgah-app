import {
    BrowserRouter,
    NavLink,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { useSgahUi } from '../hooks';
import {
    SgahGastoHistoricoPage,
    SgahGastosPage,
    SgahIngresosPage,
    SgahInversionPage,
    SgahPrestamosPage,
    SgahResumenPage,
} from '../sgah/pages';
import { SgahAhorrosPage } from '../sgah/pages/SgahAhorrosPage';
import { useState } from 'react';
import { ArrowDownSvg, ArrowRightSvg } from '../sgah/components';

export const Navigation = () => {
    const [isOpenIcon, setIsOpenIcon] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);

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
                                <ArrowRightSvg />
                                Detalle
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
                                <ArrowRightSvg />
                                Ingresos
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
                                <ArrowRightSvg />
                                Ahorro
                            </NavLink>
                        </li>
                        <li>
                            <div
                                className={`dropdown ${
                                    isDropdownActive ? 'dropdown--active' : ''
                                }`}
                                onMouseEnter={() => setIsDropdownActive(true)}
                                onMouseLeave={() => setIsDropdownActive(false)}
                            >
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link anim-link ${
                                            isActive ? 'link--active' : ''
                                        }`
                                    }
                                    to="/gastos"
                                >
                                    <ArrowDownSvg />
                                    Gastos
                                </NavLink>

                                <div
                                    className={`dropdown-menu ${
                                        isDropdownActive
                                            ? 'dropdown-menu--active'
                                            : ''
                                    }`}
                                >
                                    <ul>
                                        <li>
                                            <NavLink
                                                className="nav-link"
                                                to="/gastos"
                                                onClick={handleOpenIcon}
                                            >
                                                Detalle Mensual
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="nav-link"
                                                to="gastoHistorico"
                                    
                                                onClick={handleOpenIcon}
                                            >
                                                Detalle Histórico
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
                                <ArrowRightSvg />
                                Prestamos
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
                                <ArrowRightSvg />
                                Inversión
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
                <Route path="/gastoHistorico" element={<SgahGastoHistoricoPage />} />
                <Route path="/prestamos" element={<SgahPrestamosPage />} />
                <Route path="/inversion" element={<SgahInversionPage />} />

                <Route path="/*" element={<Navigate to="/detalle" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

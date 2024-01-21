import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
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
		classNameHightNavbar,
		classNameHideMobileNavbar,
		classNameActiveMenuNavbar,
		classNameActiveIconCloseMenuNavbar,
		handleOpenNavbar,
		handleCloseNavbar,
	} = useSgahUi();

	return (
		<BrowserRouter>
			<nav className={`navbar ${classNameHightNavbar}`}>
				<div
					onClick={handleOpenNavbar}
					className={`nav--mobile ${classNameHideMobileNavbar}`}
				>
					<h1 className="logo">SGAH</h1>
                    {/* <i className="fa-solid fa-bars"></i> */}
                    <label className="nav-burguer--mobile"></label>
				</div>

				<div className={`nav__display--tablet ${classNameActiveMenuNavbar}`}>
					<h1 className="logo">SGAH</h1>
					<h2 className="usuario">
						<i className="fa-regular fa-user"></i>
						&nbsp; Juan Pastelin
					</h2>

					<ul>
						<li>
							<NavLink
								className={({ isActive }) =>
									`nav-link anim-link ${isActive ? 'link--active' : ''}`
								}
								to="/detalle"
								onClick={handleCloseNavbar}
							>
								Detalle
								<i className="fa-solid fa-angles-right"></i>
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									`nav-link anim-link ${isActive ? 'link--active' : ''}`
								}
								to="/ingresos"
								onClick={handleCloseNavbar}
							>
								Ingresos
								<i className="fa-solid fa-angles-right"></i>
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									`nav-link anim-link ${isActive ? 'link--active' : ''}`
								}
								to="/ahorro"
								onClick={handleCloseNavbar}
							>
								Ahorro
								<i className="fa-solid fa-angles-right"></i>
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									`nav-link anim-link ${isActive ? 'link--active' : ''}`
								}
								to="/gastos"
								onClick={handleCloseNavbar}
							>
								Gastos
								<i className="fa-solid fa-angles-right"></i>
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									`nav-link anim-link ${isActive ? 'link--active' : ''}`
								}
								to="/prestamos"
								onClick={handleCloseNavbar}
							>
								Prestamos
								<i className="fa-solid fa-angles-right"></i>
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									`nav-link anim-link ${isActive ? 'link--active' : ''}`
								}
								to="/inversion"
								onClick={handleCloseNavbar}
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
				<div className={`nav__close--mobile ${classNameActiveIconCloseMenuNavbar}`}>
					<button onClick={handleCloseNavbar}>
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

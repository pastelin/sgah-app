import { useSgahStore, useSgahUi } from '../../hooks';

export const NavBar = () => {
	const {
		classNameHightNavbar,
		classNameHideIconNavbar,
		classNameActiveMenuNavbar,
		classNameActiveIconCloseMenuNavbar,
		handleOpenNavbar,
		handleCloseNavbar,
		handleUpdatingMenuSelected,
	} = useSgahUi();

    const { menuList } = useSgahStore();

	return (
		<nav className={`sgah__nav ${classNameHightNavbar}`}>
			<div onClick={handleOpenNavbar} className={`sgah__nav-icon ${classNameHideIconNavbar}`}>
				<h1 className="logo-icon">SGAH</h1>
				<i className="fa-solid fa-bars"></i>
			</div>
			<div className={`sgah__nav--tablet ${classNameActiveMenuNavbar}`}>
				<h1 className="logo">SGAH</h1>
				<h3 className="usuario">
					<i className="fa-regular fa-user"></i>
					&nbsp; Juan Pastelin
				</h3>

				<div onClick={handleUpdatingMenuSelected}>
					{menuList.map((item) => (
						<div key={item} className="nav__item">
							<a href="#">{item}</a>
						</div>
					))}
				</div>

				<button className="button btn-logout">
					<i className="fa-solid fa-right-from-bracket"></i>
					&nbsp;
					<span>Salir</span>
				</button>
			</div>
			<div className={`icon__close ${classNameActiveIconCloseMenuNavbar}`}>
				<button onClick={handleCloseNavbar}>
					<i className="fa-regular fa-circle-xmark"></i>
				</button>
			</div>
		</nav>
	);
};

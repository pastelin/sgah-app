import { useNavBar } from '../../hooks/useNavBar';

export const NavBar = () => {
	const {
		menuList,
		hightClass,
		hideIconClass,
		activeMenuClass,
		activeIconCloseMenuClass,
		handleOpenNavbar,
		handleCloseNavbar,
		handleUpdateMenuSelected,
	} = useNavBar();

	return (
		<nav className={`sgah__nav ${hightClass}`}>
			<div onClick={handleOpenNavbar} className={`sgah__nav-icon ${hideIconClass}`}>
				<h1 className="logo-icon">SGAH</h1>
				<i className="fa-solid fa-bars"></i>
			</div>
			<div className={`sgah__nav--tablet ${activeMenuClass}`}>
				<h1 className="logo">SGAH</h1>
				<h3 className="usuario">
					<i className="fa-regular fa-user"></i>
					&nbsp; Juan Pastelin
				</h3>

				<div onClick={handleUpdateMenuSelected}>
					{menuList.map((item) => (
						<div key={item} className="nav__item">
							<a href="#">{item}</a>
						</div>
					))}
				</div>

				<button className="btn-logout">
					<i className="fa-solid fa-right-from-bracket"></i>
					&nbsp;
					<span>Salir</span>
				</button>
			</div>
			<div className={`icon__close ${activeIconCloseMenuClass}`}>
				<button onClick={handleCloseNavbar}>
					<i className="fa-regular fa-circle-xmark"></i>
				</button>
			</div>
		</nav>
	);
};

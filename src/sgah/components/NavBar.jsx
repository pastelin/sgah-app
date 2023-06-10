import { NavBarItem } from './NavBarItem';
import { useNavBar } from '../../hooks/useNavBar';

export const NavBar = () => {
	const { menuList } = useNavBar();

	return (
		<nav id="navSgah" className="sgah__nav">
			<div id="navIcon" className="sgah__nav-icon">
				<h1 className="logo-icon">SGAH</h1>
				<i className="fa-solid fa-bars"></i>
			</div>
			<div id="navMenu" className="sgah__nav--tablet">
				<h1 className="logo">SGAH</h1>
				<h3 className="usuario">
					<i className="fa-regular fa-user"></i>
					&nbsp; Juan Pastelin
				</h3>

				<div id="menu">
					{menuList.map((item) => (
						<NavBarItem key={item} menuItem={item} />
					))}
				</div>

				<button className="btn-logout">
					<i className="fa-solid fa-right-from-bracket"></i>
					&nbsp;
					<span>Salir</span>
				</button>
			</div>
			<div id="closeMenu" className="icon__close">
				<button>
					<i className="fa-regular fa-circle-xmark"></i>
				</button>
			</div>
		</nav>
	);
};

// Componente visual mejorado para cada balance
import React from 'react';
import PropTypes from 'prop-types';

export const BalanceDetail = React.memo(({ etiqueta, monto, icon, color }) => (
	<div
		className="balance-detail improved-balance"
		style={{
			borderLeft: `6px solid ${color}`,
			background: '#fff',
			boxShadow: '0 2px 8px rgba(42,100,242,0.06)',
			borderRadius: '12px',
			margin: '0.5rem 0',
			padding: '1rem 1.5rem',
			display: 'flex',
			alignItems: 'center',
			gap: '3rem',
		}}
	>
		<div>
			<img
				src={icon}
				alt={etiqueta}
				style={{
					width: 32,
					height: 32,
					filter: 'drop-shadow(0 2px 4px #E4E9EC)',
				}}
			/>
		</div>
		<div style={{ flex: 1 }}>
			<p
				className="balance-label"
				style={{
					color: color,
					fontWeight: 600,
					marginBottom: 4,
				}}
			>
				{etiqueta}
			</p>
			<p
				className="balance-amount"
				style={{
					fontSize: '1.2rem',
					color: '#1E2A32',
					fontWeight: 700,
				}}
			>
				{monto}
			</p>
		</div>
	</div>
));

BalanceDetail.propTypes = {
    etiqueta: PropTypes.string.isRequired,
    monto: PropTypes.string,
};
export const MoviesGenreModal = ({
	children,
	onClose,
}: {
	children: React.ReactNode;
	onClose: () => void;
}) => {
	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				backgroundColor: 'rgba(0, 0, 0, 0.2)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 9999,
				backdropFilter: 'blur(4px)',
				padding: '20px',
			}}
			onClick={onClose}
		>
			<div
				style={{
					backgroundColor: '#000',
					borderRadius: '16px',
					padding: '24px',
					width: '90vw',
					maxWidth: '1200px',
					height: '100vh',
					boxShadow: '0 0 30px rgba(0, 0, 0, 0.6)',
					overflow: 'hidden',
					position: 'relative',
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<div
					style={{
						height: '100%',
						overflowY: 'auto',
						scrollBehavior: 'smooth',
						scrollbarWidth: 'none',
						position: 'relative'
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

import { useEffect, useMemo, useRef, useState } from "react";
import type { FC, ReactNode } from "react";

interface ResponsiveProps {
	children: (width: number, height: number) => ReactNode;
	debounceDelay?: number; // in ms
}

const Responsive: FC<ResponsiveProps> = ({ children, debounceDelay = 0 }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });
	const resizeTimeout = useRef<number | null>(null);

	useEffect(() => {
		const observer = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;

			if (width === size.width && height === size.height) return;

			if (resizeTimeout.current) {
				clearTimeout(resizeTimeout.current);
			}

			resizeTimeout.current = window.setTimeout(() => {
				setSize((prev) =>
					width !== prev.width || height !== prev.height
						? { width, height }
						: prev,
				);
			}, debounceDelay);
		});

		const container = containerRef.current;
		if (container) {
			observer.observe(container);
		}

		return () => {
			observer.disconnect();
			if (resizeTimeout.current) {
				clearTimeout(resizeTimeout.current);
			}
		};
	}, [debounceDelay, size.width, size.height]);

	const { width, height } = size;

	const content = useMemo(() => {
		return width > 0 && height > 0 ? children(width, height) : null;
	}, [width, height, children]);

	return (
		<div
			ref={containerRef}
			style={{ width: "100%", height: "100%" }}
			id="responsiveContainer"
		>
			{content}
		</div>
	);
};

export default Responsive;

import { useCallback, useRef, useState } from "react";

export default function useDivScroll() {
	const ref = useRef<HTMLDivElement>(null);
	const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

	const onScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			const target = event.currentTarget;
			const st = target.scrollTop;
			const sh = target.scrollHeight;
			const ch = target.clientHeight;

			setIsAtBottom(st + ch >= sh - 1);
		},
		[],
	);

	const maintainScrollPosition = useCallback(() => {
		if (!isAtBottom) return;
		if (!ref.current) return;

		ref.current.scrollTo({
			top: ref.current.scrollHeight,
			behavior: "smooth",
		});
	}, [ref?.current, isAtBottom]);

	return {
		ref,
		onScroll,
		maintainScrollPosition,
	};
}

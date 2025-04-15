import { Icon } from "@chakra-ui/react";
import type { ComponentProps } from "react";

export const PdfIcon = (props: ComponentProps<typeof Icon>) => (
	<Icon viewBox="0 0 792 792" {...props}>
		<path
			fill="#e5252a"
			fillRule="evenodd"
			clipRule="evenodd"
			d="M203 0h264l225 234v454c0 57-46 103-103 103H203c-57 0-103-46-103-103V103C100 46 146 0 203 0z"
		/>
		<g fill="#fff">
			<path
				fill="#ffffff302"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M467 0v232h225z"
			/>
			<path d="M214 591V446h62c15 0 27 4 36 13 9 8 14 19 14 33s-5 26-14 34-21 13-36 13h-25v52zm37-84h21c5 0 10-1 12-4 3-2 5-6 5-11s-2-8-5-11c-2-2-7-4-12-4h-21zm90 84V446h51c10 0 20 1 29 4s17 7 24 13 13 13 17 23c4 9 6 20 6 32s-2 23-6 33c-4 9-10 17-17 22-7 6-15 10-24 13s-19 5-29 5zm36-32h11l16-2c5-1 9-3 14-6 4-3 7-8 9-13a55 55 0 0 0 0-39c-2-6-5-10-9-13a48 48 0 0 0-30-9h-11zm110 32V446h102v31h-65v24h52v31h-52v59z" />
		</g>
	</Icon>
);

export const RupeeIcon = (props: ComponentProps<typeof Icon>) => (
	<Icon viewBox="40 -1 170 250" {...props}>
		<path
			fill="currentColor"
			d="M153 23h41l15-23H55L40 23h26c27 0 52 2 62 25H55L40 71h91v1c0 17-14 43-60 43H48v22l90 113h41L85 133c39-2 75-24 80-62h29l15-23h-45c-1-9-5-18-11-25z"
		/>
	</Icon>
);

export const LiveIcon = (props: ComponentProps<typeof Icon>) => (
	<Icon viewBox="0 0 32 32" {...props}>
		<path
			fill="#ff4545"
			d="M11.6 23a1 1 0 0 1-.7-.3 9.3 9.3 0 0 1 0-13.4 1 1 0 0 1 1.4 1.4 7.3 7.3 0 0 0 0 10.6 1 1 0 0 1-.7 1.7zm-4 2.7a1 1 0 0 0 0-1.4 11.4 11.4 0 0 1 0-16.6 1 1 0 1 0-1.4-1.4 13.4 13.4 0 0 0 0 19.4 1 1 0 0 0 1.4 0zm13.5-3a9.3 9.3 0 0 0 0-13.4 1 1 0 1 0-1.4 1.4 7.3 7.3 0 0 1 0 10.6 1 1 0 0 0 0 1.4 1 1 0 0 0 .7.3 1 1 0 0 0 .7-.3zm4.7 3a13.4 13.4 0 0 0 0-19.4 1 1 0 0 0-1.3 1.4 11.4 11.4 0 0 1 0 16.6 1 1 0 0 0 0 1.4 1 1 0 0 0 .6.3 1 1 0 0 0 .7-.3zM18 16a2 2 0 1 0-2 2 2 2 0 0 0 2-2zz"
		/>
	</Icon>
);

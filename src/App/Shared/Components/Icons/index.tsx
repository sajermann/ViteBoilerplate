import { SVGProps } from 'react';

const ICONS = {
	loadingCircle: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			version="1.1"
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			fill={color || 'currentColor'}
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 32 32"
			xmlSpace="preserve"
		>
			<animateTransform
				attributeType="xml"
				attributeName="transform"
				type="rotate"
				from="360 0 0"
				to="0 0 0"
				dur="1s"
				additive="sum"
				repeatCount="indefinite"
			/>
			<path
				fill={color || 'currentColor'}
				d="M18,4.181v2.021c4.559,0.929,8,4.97,8,9.798c0,5.514-4.486,10-10,10S6,21.514,6,16c0-4.829,3.441-8.869,8-9.798V4.181
				C8.334,5.137,4,10.066,4,16c0,6.617,5.383,12,12,12s12-5.383,12-12C28,10.066,23.666,5.137,18,4.181z"
			/>
		</svg>
	),
	info: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
				stroke={color || 'currentColor'}
				strokeWidth="2"
			/>
			<path
				d="M9 5V9.8M9 12.6V13"
				stroke={color || 'currentColor'}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	),
	checked: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			width={width || '100%'}
			height={height || '100%'}
			viewBox="0 0 12 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<path
				d="M10.1347 0.286938C10.3421 0.10086 10.618 -0.00201204 10.9043 2.98247e-05C11.1906 0.00207169 11.4649 0.108868 11.6692 0.297882C11.8736 0.486897 11.992 0.743346 11.9996 1.01312C12.0072 1.28289 11.9033 1.54488 11.7098 1.74381L5.83628 8.66741C5.73529 8.76994 5.61339 8.85223 5.47788 8.90934C5.34238 8.96646 5.19604 8.99723 5.04763 8.99982C4.89922 9.00241 4.75177 8.97677 4.61412 8.92442C4.47646 8.87207 4.35141 8.7941 4.24646 8.69516L0.351393 5.02385C0.242921 4.92858 0.15592 4.81369 0.095577 4.68605C0.0352345 4.5584 0.00278735 4.4206 0.000171818 4.28087C-0.00244371 4.14115 0.024826 4.00236 0.0803535 3.87278C0.135881 3.74321 0.218529 3.6255 0.323367 3.52669C0.428205 3.42787 0.553086 3.34997 0.690558 3.29763C0.828031 3.2453 0.97528 3.21959 1.12352 3.22206C1.27176 3.22452 1.41796 3.25511 1.55338 3.31198C1.68881 3.36886 1.8107 3.45086 1.91177 3.5531L4.99426 6.45713L10.1067 0.317463C10.1159 0.306781 10.1258 0.29659 10.1362 0.286938H10.1347Z"
				fill={color || 'currentColor'}
			/>
		</svg>
	),
	error: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			width={width || '100%'}
			height={height || '100%'}
			viewBox="0 0 23 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<path
				d="M13.5765 9.05096L11.3137 11.3137M11.3137 11.3137L9.05098 13.5764M11.3137 11.3137L13.5765 13.5764M11.3137 11.3137L9.05098 9.05096"
				stroke={color || 'currentColor'}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M5.65687 16.9706C8.78106 20.0948 13.8464 20.0948 16.9706 16.9706C20.0948 13.8464 20.0948 8.78105 16.9706 5.65685C13.8464 2.53266 8.78106 2.53266 5.65687 5.65685C2.53267 8.78105 2.53267 13.8464 5.65687 16.9706Z"
				stroke={color || 'currentColor'}
				strokeWidth="2"
			/>
		</svg>
	),
	close: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9.87818 7.99886L15.606 2.28357C15.8568 2.03271 15.9977 1.69246 15.9977 1.33769C15.9977 0.98291 15.8568 0.642664 15.606 0.391799C15.3552 0.140934 15.015 0 14.6602 0C14.3055 0 13.9653 0.140934 13.7145 0.391799L8 6.12041L2.28552 0.391799C2.03469 0.140934 1.6945 -2.64329e-09 1.33977 0C0.985044 2.64329e-09 0.644846 0.140934 0.394017 0.391799C0.143188 0.642664 0.00227327 0.98291 0.00227327 1.33769C0.00227327 1.69246 0.143188 2.03271 0.394017 2.28357L6.12182 7.99886L0.394017 13.7142C0.269166 13.838 0.17007 13.9853 0.102444 14.1477C0.0348177 14.31 0 14.4842 0 14.66C0 14.8359 0.0348177 15.01 0.102444 15.1724C0.17007 15.3347 0.269166 15.4821 0.394017 15.6059C0.517848 15.7308 0.665174 15.8299 0.827496 15.8975C0.989818 15.9652 1.16392 16 1.33977 16C1.51562 16 1.68972 15.9652 1.85204 15.8975C2.01437 15.8299 2.16169 15.7308 2.28552 15.6059L8 9.87731L13.7145 15.6059C13.8383 15.7308 13.9856 15.8299 14.148 15.8975C14.3103 15.9652 14.4844 16 14.6602 16C14.8361 16 15.0102 15.9652 15.1725 15.8975C15.3348 15.8299 15.4822 15.7308 15.606 15.6059C15.7308 15.4821 15.8299 15.3347 15.8976 15.1724C15.9652 15.01 16 14.8359 16 14.66C16 14.4842 15.9652 14.31 15.8976 14.1477C15.8299 13.9853 15.7308 13.838 15.606 13.7142L9.87818 7.99886Z"
				fill={color || 'currentColor'}
			/>
		</svg>
	),
	arrowSingleLeft: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			fill={color || 'currentColor'}
			viewBox="0 0 256 256"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="256" height="256" fill="none" />
			<polyline
				points="160 208 80 128 160 48"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
		</svg>
	),
	arrowSingleRight: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			fill={color || 'currentColor'}
			viewBox="0 0 256 256"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="256" height="256" fill="none" />
			<polyline
				points="96 48 176 128 96 208"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
		</svg>
	),
	arrowPairLeft: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			fill={color || 'currentColor'}
			viewBox="0 0 256 256"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="256" height="256" fill="none" />
			<polyline
				points="200 208 120 128 200 48"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
			<polyline
				points="120 208 40 128 120 48"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
		</svg>
	),
	arrowPairRight: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			fill={color || 'currentColor'}
			viewBox="0 0 256 256"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="256" height="256" fill="none" />
			<polyline
				points="56 48 136 128 56 208"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
			<polyline
				points="136 48 216 128 136 208"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
		</svg>
	),
	indeterminate: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			width={width || '100%'}
			height={height || '50%'}
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<g id="Layer_1">
				<title>Layer 1</title>
				<rect
					stroke="#000"
					rx="3"
					id="svg_1"
					width={width || '100%'}
					height={height || '100%'}
					y="-0.07418"
					x="-0.01483"
					strokeWidth="0"
					fill={color || 'currentColor'}
				/>
			</g>
		</svg>
	),
	arrowsOutSimple: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			fill={color || 'currentColor'}
			viewBox="0 0 256 256"
		>
			<rect width="256" height="256" fill="none" />
			<polyline
				points="160 48 208 48 208 96"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
			<line
				x1="152"
				y1="104"
				x2="208"
				y2="48"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
			<polyline
				points="96 208 48 208 48 160"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
			<line
				x1="104"
				y1="152"
				x2="48"
				y2="208"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
		</svg>
	),
	arrowsInSimple: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			fill={color || 'currentColor'}
			viewBox="0 0 256 256"
		>
			<rect width="256" height="256" fill="none" />
			<polyline
				points="152 56 152 104 200 104"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
			<line
				x1="208"
				y1="48"
				x2="152"
				y2="104"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
			<polyline
				points="56 152 104 152 104 200"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
			<line
				x1="48"
				y1="208"
				x2="104"
				y2="152"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
		</svg>
	),
	loadingPoints: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			viewBox="-20 -25 100 100"
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			fill={color || 'currentColor'}
		>
			<circle fill="currentColor" stroke="none" cx="6" cy="25" r="6">
				<animateTransform
					attributeName="transform"
					dur="1s"
					type="translate"
					values="0 15 ; 0 -15; 0 15"
					repeatCount="indefinite"
					begin="0.1"
				/>
				<animate
					attributeName="opacity"
					dur="1s"
					values="0;1;0"
					repeatCount="indefinite"
					begin="0.1"
				/>
			</circle>
			<circle fill="currentColor" stroke="none" cx="30" cy="25" r="6">
				<animateTransform
					attributeName="transform"
					dur="1s"
					type="translate"
					values="0 10 ; 0 -10; 0 10"
					repeatCount="indefinite"
					begin="0.2"
				/>
				<animate
					attributeName="opacity"
					dur="1s"
					values="0;1;0"
					repeatCount="indefinite"
					begin="0.2"
				/>
			</circle>
			<circle fill="currentColor" stroke="none" cx="54" cy="25" r="6">
				<animateTransform
					attributeName="transform"
					dur="1s"
					type="translate"
					values="0 5 ; 0 -5; 0 5"
					repeatCount="indefinite"
					begin="0.3"
				/>
				<animate
					attributeName="opacity"
					dur="1s"
					values="0;1;0"
					repeatCount="indefinite"
					begin="0.3"
				/>
			</circle>
		</svg>
	),
	success: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			fill={color || 'currentColor'}
			viewBox="0 0 256 256"
		>
			<rect width="256" height="256" fill="none" />
			<polyline
				points="216 72 104 184 48 128"
				fill="none"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
		</svg>
	),
	failed: ({ width, height, color, ...rest }: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
			width={width || '100%'}
			height={height || '100%'}
			fill={color || 'currentColor'}
			viewBox="0 0 256 256"
		>
			<rect width="256" height="256" fill="none" />
			<line
				x1="200"
				y1="56"
				x2="56"
				y2="200"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
			<line
				x1="200"
				y1="200"
				x2="56"
				y2="56"
				stroke={color || 'currentColor'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			/>
		</svg>
	),
};

export const keysIcons = Object.keys(ICONS);

type AllowNames = keyof typeof ICONS;

type IconProps = SVGProps<SVGSVGElement> & {
	nameIcon?: AllowNames;
	fullFill?: boolean;
};

export function Icons({ nameIcon, ...rest }: IconProps) {
	if (!nameIcon) return null;
	const iconName = nameIcon.charAt(0).toLowerCase() + nameIcon.slice(1);
	return ICONS[iconName as AllowNames]({ ...rest }) || null;
}

import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
	link: {
		...theme.fn.focusStyles(),
		display: "flex",
		alignItems: "center",
		textDecoration: "none",
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[1]
				: theme.colors.gray[7],
		margin: '2px 0px',
		padding: `3px ${theme.spacing.xs}px`,
		borderRadius: theme.radius.sm,
		fontWeight: 400,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
		},
	},
	linkActive: {
		"&, &:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
					: theme.colors[theme.primaryColor][0],
			color:
				theme.colorScheme === "dark"
					? theme.white
					: theme.colors[theme.primaryColor][7],
		},
	},
}));

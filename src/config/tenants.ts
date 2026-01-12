export const TENANTS: Record<string, { name: string; logo: string; primaryColor: string; lightColor: string; logoWidth: string }> = {
	"agrovid-xccui.crearcolombia.com": {
		name: "Agrovid",
		logo: "/images/agrovid_small.png",
		primaryColor: "#5FA27A",
		lightColor: "#E8F4EF",
		logoWidth: "64px",
	},
	"maradentro-xccui.crearcolombia.com": {
		name: "Mar Adentro",
		logo: "/images/maradentro_small.png",
		primaryColor: "#0E71B9",
		lightColor: "#E4F0FA",
		logoWidth: "128px",
	},
	"tecbaco-xccui.crearcolombia.com": {
		name: "Tecbaco",
		logo: "/images/tecbaco_small.png",
		primaryColor: "#C03321",
		lightColor: "#F7E7E5",
		logoWidth: "128px",
	}
};

export const DEFAULT_TENANT = {
	name: "Crear Colombia",
	logo: "/images/crearcolombia_small.png",
	primaryColor: "#219ebc",
	lightColor: "#E3F6FB",
	logoWidth: "96px",
};
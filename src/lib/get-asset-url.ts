export function getAssetURL(id: string) {
	return `${process.env.DIRECTUS_URL}/assets/${id}`
}

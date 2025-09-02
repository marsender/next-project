export interface Global {
	languages_code: string
	title: string
	description: string
}

export interface Translations {
	id: string
	translations: Global[]
}

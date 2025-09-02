// Types intended for use in components
export interface BlockHero {
	collection: string
	image: string
	languages_code: string
	buttons?: string
	content: string
	headline: string
}

export interface BlockRichText {
	collection: string
	languages_code: string
	content: string
	headline: string
}

export interface Page {
	languages_code: string
	slug: string
	title: string
	content: string
	blocks: (BlockHero | BlockRichText)[]
}

// Types mostly for internal processing within directusPage.ts
export interface PageTranslation {
	languages_code: string
	slug: string
	title: string
	content: string
}

export interface ItemBlockHero {
	image: string
	translations: BlockHero[]
}

export interface ItemBlockRichText {
	translations: BlockRichText[]
}

export interface Blocks {
	collection: string
	item: ItemBlockHero | ItemBlockRichText
}

export interface ItemPage {
	slug: string
	blocks: Blocks[]
	translations: PageTranslation[]
}

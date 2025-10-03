'use server'

import { JSONValue, stateService } from '@/lib/directusState'

export async function getAppStateAction(key: string) {
	console.log('get AppStateAction %s: %o', key)
	return await stateService.getUserState(key)
}

export async function setAppStateAction(key: string, value: JSONValue) {
	console.log('set AppStateAction %s: %o', key, value)
	return await stateService.setUserState(key, value)
}

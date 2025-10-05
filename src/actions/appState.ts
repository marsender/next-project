'use server'

import { JSONValue, stateService } from '@/lib/directusState'

export async function getAppStateAction(key: string) {
	//console.log('Get AppStateAction for key: %s', key)
	return await stateService.getUserState(key)
}

export async function setAppStateAction(key: string, value: JSONValue) {
	//console.log('Set AppStateAction for key %s and value: %o', key, value)
	return await stateService.setUserState(key, value)
}

export class TokenExpiredError extends Error {
	constructor(message = 'The session has expired. Please log in again.') {
		super(message)
		this.name = 'TokenExpiredError'
	}
}
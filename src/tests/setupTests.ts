import '@testing-library/jest-dom/vitest'
import { config } from 'dotenv'

// Load .env.test.local first so it can override .env.test
config({ path: '.env.test.local', quiet: true })
config({ path: '.env.test', quiet: true })
